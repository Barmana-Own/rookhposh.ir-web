"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 535;
const FRAME_ROOT = "/frames";

// The first 18 frames establish a usable opening sequence. Four settled frames
// are enough to dismiss the loader; the remaining initial window continues in
// the same bounded queue while the user can already read and use the page.
const CRITICAL_FRAME_COUNT = 18;
const READY_FRAME_COUNT = 4;
const INITIAL_PREFETCH_COUNT = 18;
const PRELOAD_AHEAD = 24;
const PRELOAD_BEHIND = 8;
const MAX_CONCURRENT_DOWNLOADS = 4;
const MAX_DEVICE_PIXEL_RATIO = 2;

type GSAP = typeof import("gsap").gsap;
type ScrollTriggerPlugin = typeof import("gsap/ScrollTrigger").ScrollTrigger;
type FrameState = "idle" | "queued" | "loading" | "loaded" | "failed";

function framePath(index: number) {
  return `${FRAME_ROOT}/frame_${String(index + 1).padStart(5, "0")}.webp`;
}

function toPersianDigits(value: number | string) {
  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
}

function drawFrame(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  image: HTMLImageElement | undefined,
) {
  if (!image || !image.complete || !image.naturalWidth) {
    return;
  }

  const scale = Math.max(
    canvas.width / image.naturalWidth,
    canvas.height / image.naturalHeight,
  );
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;

  context.fillStyle = "#0a0a0b";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(
    image,
    (canvas.width - width) * 0.5,
    (canvas.height - height) * 0.5,
    width,
    height,
  );
}

export default function AnimationRuntime() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<Array<HTMLImageElement | undefined>>([]);

  useEffect(() => {
    let cancelled = false;
    let sceneBuilt = false;
    let usableFrameReady = false;
    let timeline: ReturnType<GSAP["timeline"]> | undefined;
    let scrollTrigger: ReturnType<ScrollTriggerPlugin["create"]> | undefined;
    let resizeFrame = 0;
    let gsap: GSAP | undefined;
    let ScrollTrigger: ScrollTriggerPlugin | undefined;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: false });
    const scene = document.getElementById("scene");

    if (!canvas || !context || !scene) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const readinessThreshold = prefersReducedMotion ? 1 : READY_FRAME_COUNT;
    const frameStates: FrameState[] = Array(FRAME_COUNT).fill("idle");
    const queue: number[] = [];
    let activeDownloads = 0;
    let settledFrames = 0;
    let settledCriticalFrames = 0;
    let lastRequestedFrame = 0;
    let loaderReady = false;

    const updateLoader = () => {
      const loader = document.getElementById("loader");
      const loaderFill = document.getElementById("loaderFill");
      const loaderPct = document.getElementById("loaderPct");
      const loaderStatus = document.getElementById("loaderStatus");

      if (!loader || !loaderFill || !loaderPct || !loaderStatus) {
        return;
      }

      loader.classList.add("is-loading");
      const criticalProgress = Math.min(
        100,
        Math.round((settledCriticalFrames / readinessThreshold) * 100),
      );
      const progress = loaderReady ? 100 : criticalProgress;
      loaderFill.style.width = `${progress}%`;
      loaderPct.textContent = toPersianDigits(progress);
      loaderStatus.textContent = loaderReady
        ? "اتاق پرو آماده است"
        : `در حال آماده‌سازی اتاق پرو: ${toPersianDigits(progress)}٪`;

      if (loaderReady) {
        loader.classList.add("is-done");
      }
    };

    const markLoaderReady = () => {
      if (loaderReady || cancelled) {
        return;
      }

      loaderReady = true;
      updateLoader();
    };

    const nearestLoadedFrame = (requestedFrame: number) => {
      const clampedFrame = Math.max(
        0,
        Math.min(FRAME_COUNT - 1, Math.round(requestedFrame)),
      );

      if (frameStates[clampedFrame] === "loaded") {
        return clampedFrame;
      }

      for (let distance = 1; distance < FRAME_COUNT; distance += 1) {
        const previous = clampedFrame - distance;
        if (previous >= 0 && frameStates[previous] === "loaded") {
          return previous;
        }

        const next = clampedFrame + distance;
        if (next < FRAME_COUNT && frameStates[next] === "loaded") {
          return next;
        }
      }

      return undefined;
    };

    const render = (frame: number) => {
      lastRequestedFrame = Math.max(
        0,
        Math.min(FRAME_COUNT - 1, Math.round(frame)),
      );
      const renderableFrame = nearestLoadedFrame(lastRequestedFrame);

      if (renderableFrame !== undefined) {
        drawFrame(context, canvas, framesRef.current[renderableFrame]);
      }
    };

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      render(lastRequestedFrame);
    };

    const enqueueFrame = (index: number, priority = false) => {
      if (
        index < 0 ||
        index >= FRAME_COUNT ||
        frameStates[index] !== "idle" ||
        cancelled
      ) {
        return;
      }

      frameStates[index] = "queued";
      if (priority) {
        queue.unshift(index);
      } else {
        queue.push(index);
      }
      pumpQueue();
    };

    const enqueueRange = (start: number, end: number) => {
      for (let index = Math.max(0, start); index < Math.min(FRAME_COUNT, end); index += 1) {
        enqueueFrame(index);
      }
    };

    const settleFrame = (index: number, loaded: boolean) => {
      if (cancelled) {
        return;
      }

      frameStates[index] = loaded ? "loaded" : "failed";
      activeDownloads -= 1;
      settledFrames += 1;

      if (index < CRITICAL_FRAME_COUNT) {
        settledCriticalFrames += 1;
      }

      if (loaded) {
        if (!usableFrameReady) {
          usableFrameReady = true;
          render(index);
          void buildScene();
          enqueueRange(
            CRITICAL_FRAME_COUNT,
            CRITICAL_FRAME_COUNT + INITIAL_PREFETCH_COUNT,
          );
        } else if (index === lastRequestedFrame) {
          render(lastRequestedFrame);
        }
      }

      const criticalFramesExhausted = prefersReducedMotion
        ? settledCriticalFrames >= 1
        : settledCriticalFrames === CRITICAL_FRAME_COUNT;

      if (
        !loaderReady &&
        usableFrameReady &&
        (settledCriticalFrames >= readinessThreshold || criticalFramesExhausted)
      ) {
        markLoaderReady();
      }

      if (!loaderReady && criticalFramesExhausted) {
        markLoaderReady();
      }

      updateLoader();
      pumpQueue();
    };

    function pumpQueue() {
      while (activeDownloads < MAX_CONCURRENT_DOWNLOADS && queue.length > 0 && !cancelled) {
        const index = queue.shift();
        if (index === undefined || frameStates[index] !== "queued") {
          continue;
        }

        frameStates[index] = "loading";
        activeDownloads += 1;

        const image = new Image();
        image.decoding = "async";
        image.fetchPriority = index === 0 ? "high" : "auto";
        image.onload = () => settleFrame(index, true);
        image.onerror = () => settleFrame(index, false);
        framesRef.current[index] = image;
        image.src = framePath(index);
      }
    }

    const buildScene = async () => {
      if (cancelled || sceneBuilt || prefersReducedMotion) {
        return;
      }

      try {
        const gsapModule = await import("gsap");
        const scrollTriggerModule = await import("gsap/ScrollTrigger");

        if (cancelled || sceneBuilt) {
          return;
        }

        const animation = gsapModule.gsap;
        const triggerPlugin = scrollTriggerModule.ScrollTrigger;
        gsap = animation;
        ScrollTrigger = triggerPlugin;
        animation.registerPlugin(triggerPlugin);
        sceneBuilt = true;
        scene.classList.remove("scene--fallback");
        scene.classList.add("scene--enhanced");
        sizeCanvas();

        const progressFill = document.getElementById("progressFill");
        const movementNo = document.getElementById("movementNo");
        const heroPanel = scene.querySelector<HTMLElement>('[data-panel="hero"]');
        const panels = animation.utils.toArray<HTMLElement>(
          ".panel:not(.panel--hero)",
          scene,
        );
        const cues = [
          [0.115, 0.205],
          [0.235, 0.355],
          [0.385, 0.535],
          [0.56, 0.635],
          [0.66, 0.765],
          [0.79, 0.905],
          [0.925, 0.995],
        ];
        const fade = 0.035;

        timeline = animation.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: scene,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            pin: "#sticky",
            pinSpacing: true,
            onUpdate: (self) => {
              const sceneProgress = self.progress;
              const requestedFrame = Math.round(
                sceneProgress * (FRAME_COUNT - 1),
              );
              enqueueFrame(requestedFrame, true);
              enqueueRange(
                requestedFrame - PRELOAD_BEHIND,
                requestedFrame + PRELOAD_AHEAD + 1,
              );
              render(requestedFrame);

              if (progressFill) {
                progressFill.style.width = `${(sceneProgress * 100).toFixed(2)}%`;
              }

              let movement = 0;
              for (let index = 0; index < cues.length; index += 1) {
                if (sceneProgress >= cues[index][0] - fade) {
                  movement = index + 1;
                }
              }

              if (movementNo) {
                movementNo.textContent = toPersianDigits(
                  String(movement).padStart(2, "0"),
                );
              }
            },
          },
        });

        const frameState = { frame: 0 };
        timeline.to(
          frameState,
          {
            frame: FRAME_COUNT - 1,
            duration: 1,
            ease: "none",
            onUpdate: () => render(frameState.frame),
          },
          0,
        );

        if (heroPanel) {
          animation.set(heroPanel, { autoAlpha: 1 });
          timeline.to(
            heroPanel,
            { autoAlpha: 0, y: -30, duration: 0.03, ease: "power2.in" },
            0.004,
          );
        }

        panels.forEach((panel, index) => {
          const [inAt, outAt] = cues[index];
          const fromX = panel.classList.contains("panel--right") ? 44 : -44;

          animation.set(panel, { autoAlpha: 0, x: fromX, y: "-50%" });
          timeline?.to(
            panel,
            { autoAlpha: 1, x: 0, duration: fade, ease: "power2.out" },
            inAt,
          );
          timeline?.to(
            panel,
            {
              autoAlpha: 0,
              x: -fromX * 0.5,
              duration: fade,
              ease: "power2.in",
            },
            outAt,
          );
        });

        scrollTrigger = timeline.scrollTrigger;
        ScrollTrigger.refresh();
      } catch {
        scene.classList.remove("scene--enhanced");
        scene.classList.add("scene--fallback");
      }
    };

    const updateHeader = () => {
      const header = document.getElementById("header");
      if (!header) {
        return;
      }

      const y = window.scrollY;
      const previousY = Number(header.dataset.lastScrollY ?? "0");
      header.style.transform =
        y > 120 && y > previousY ? "translateY(-140%)" : "translateY(0)";
      header.dataset.lastScrollY = String(y);
    };

    const resize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(sizeCanvas);
    };

    updateLoader();
    sizeCanvas();
    enqueueFrame(0, true);
    if (!prefersReducedMotion) {
      enqueueRange(1, CRITICAL_FRAME_COUNT);
    }

    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      cancelled = true;
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", resize);
      timeline?.kill();
      scrollTrigger?.kill();
      gsap?.set(scene.querySelectorAll(".panel"), { clearProps: "all" });

      framesRef.current.forEach((image, index) => {
        if (image && frameStates[index] === "loading") {
          image.onload = null;
          image.onerror = null;
          image.src = "";
        }
      });
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="frames"
        className="frames-canvas"
        aria-hidden="true"
      />
      <div className="grade grade--vignette" />
      <div className="grade grade--top" />
      <div className="grade grade--bottom" />
      <div className="grain" />
      <div className="progress">
        <span id="progressFill" />
      </div>
      <div className="scene-count">
        <span id="movementNo">۰۰</span>
        <i>/ ۰۷</i>
      </div>
    </>
  );
}
