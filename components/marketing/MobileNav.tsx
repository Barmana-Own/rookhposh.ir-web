"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type NavigationLink = {
  href: string;
  label: string;
};

export default function MobileNav({
  links,
  dashboardHref,
}: {
  links: readonly NavigationLink[];
  dashboardHref: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="mobile-nav">
      <button
        ref={toggleRef}
        className="mobile-nav__toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={isOpen ? "بستن منوی اصلی" : "باز کردن منوی اصلی"}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="mobile-nav__icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <div
        id="mobile-navigation"
        className="mobile-nav__panel"
        hidden={!isOpen}
      >
        <nav aria-label="ناوبری اصلی موبایل">
          {links.map((item) => (
            <Link
              className="mobile-nav__link fa-copy"
              href={item.href}
              key={item.href}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
          <a
            className="mobile-nav__link mobile-nav__link--cta fa-copy"
            href={dashboardHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            ورود به اتاق پرو
          </a>
        </nav>
      </div>
    </div>
  );
}
