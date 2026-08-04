"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site.config";
import { Button } from "@/components/ui/Button";
import { Menu, X, Sun, Moon } from "lucide-react";

function getBookingProps(pathname: string) {
  const url = siteConfig.contact.bookingUrl;
  if (url) {
    return { href: url, target: "_blank" as const, rel: "noopener noreferrer" };
  }
  return { href: resolveHref("#contact", pathname) };
}

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(stored);
    }
  }, []);

  const toggle = () => {
    const isDark =
      theme === "dark" ||
      (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    const next = isDark ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);
    localStorage.setItem("theme", next);
  };

  const isDark =
    theme === "dark" ||
    (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return { isDark, toggle };
}

// Prefix hash links with "/" when not on the homepage
function resolveHref(href: string, pathname: string) {
  if (href.startsWith("#") && pathname !== "/") {
    return `/${href}`;
  }
  return href;
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isDark, toggle } = useTheme();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-200 backdrop-blur-md ${
          scrolled ? "shadow-md" : ""
        }`}
        style={{ backgroundColor: "color-mix(in srgb, var(--bg-primary) 95%, transparent)" }}
      >
        <div className="mx-auto flex max-w-site items-center justify-between px-4 py-4 sm:px-6">
          <a href="/" className="group no-underline">
            <span className="block text-lg font-bold text-[var(--text-primary)]">
              {siteConfig.doctor.displayName}
            </span>
            <span className="hidden sm:block text-xs text-[var(--text-secondary)] leading-tight">
              {siteConfig.doctor.credentials}
            </span>
            <span className="hidden sm:block text-xs text-[var(--text-secondary)] leading-tight">
              {siteConfig.doctor.specialty}
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={resolveHref(item.href, pathname)}
                className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] no-underline"
              >
                {item.label}
              </a>
            ))}
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={toggle}
                className="inline-flex items-center justify-center rounded-lg p-2 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}
            <Button {...getBookingProps(pathname)} className="py-2 px-6 text-sm">
              {siteConfig.hero.primaryCTA}
            </Button>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            {/* Theme toggle (mobile) */}
            {mounted && (
              <button
                onClick={toggle}
                className="inline-flex items-center justify-center rounded-lg p-2 text-[var(--text-primary)]"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}
            <button
              className="inline-flex items-center justify-center rounded-lg p-2 text-[var(--text-primary)]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <>
          {/* Backdrop to block all content behind */}
          <div className="fixed inset-0 z-[59] bg-black/50 md:hidden" onClick={() => setMobileOpen(false)} />
          {/* Menu panel — full-screen solid overlay */}
          <div
            className="fixed top-0 left-0 right-0 bottom-0 z-[60] overflow-y-auto md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh", minWidth: "100vw" }}
          >
            <div className="flex items-center justify-between px-4 py-4 sm:px-6">
              <a href="/" className="text-lg font-bold text-[var(--text-primary)] no-underline">
                {siteConfig.doctor.displayName}
              </a>
              <button
                className="inline-flex items-center justify-center rounded-lg p-2 text-[var(--text-primary)]"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-4 pt-4">
              {siteConfig.nav.map((item) => (
                <a
                  key={item.href}
                  href={resolveHref(item.href, pathname)}
                  className="rounded-lg px-4 py-3 text-lg font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)] no-underline"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-4 px-4">
                <Button
                  {...getBookingProps(pathname)}
                  className="w-full text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  {siteConfig.hero.primaryCTA}
                </Button>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
