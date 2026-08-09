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
          <a href="/" className="group flex items-center gap-3 no-underline sm:gap-4">
            {/* Two variants: her navy only reaches 1.5:1 on the dark background, so dark mode
                gets a lighter-navy version. The swap is CSS-only (see globals.css) because the
                theme can come from the OS as well as the toggle. */}
            <span className="hidden shrink-0 min-[360px]:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-mh.png"
                alt=""
                width={414}
                height={256}
                className="logo-light h-10 w-auto sm:h-14 lg:h-12 xl:h-16"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-mh-dark.png"
                alt=""
                width={414}
                height={256}
                className="logo-dark h-10 w-auto sm:h-14 lg:h-12 xl:h-16"
              />
            </span>
            <span className="block">
              {/* Same face as the hero headline, deliberately a size below it: 40px against the
                  headline's 48px, so the wordmark anchors the header without competing. The two
                  steps back to 30px are forced by width, not taste: below 390px the name hits the
                  hamburger once the logo is showing, and at lg the desktop nav sits beside it,
                  where 1024px clears only 32px. Re-measure before changing any of these. */}
              <span className="block whitespace-nowrap font-serif text-3xl font-bold text-[var(--text-primary)] min-[390px]:text-4xl sm:text-[2.5rem]/none lg:text-3xl xl:text-[2.5rem]/none">
                {siteConfig.doctor.displayName}
              </span>
              <span className="mt-1.5 hidden whitespace-nowrap sm:block text-sm text-[var(--text-secondary)] leading-tight">
                {siteConfig.doctor.credentials}
              </span>
              <span className="mt-1 hidden whitespace-nowrap sm:block text-sm font-medium text-[var(--accent)] leading-tight">
                {siteConfig.doctor.shortSpecialty ?? siteConfig.doctor.specialty}
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-4 lg:flex xl:gap-6" aria-label="Main navigation">
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

          <div className="flex items-center gap-2 lg:hidden">
            {/* Theme toggle. Below sm the logo and name need the width, so it moves into the menu. */}
            {mounted && (
              <button
                onClick={toggle}
                className="hidden items-center justify-center rounded-lg p-2 text-[var(--text-primary)] sm:inline-flex"
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
          <div className="fixed inset-0 z-[59] bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
          {/* Menu panel — full-screen solid overlay */}
          <div
            className="fixed top-0 left-0 right-0 bottom-0 z-[60] overflow-y-auto lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh", minWidth: "100vw" }}
          >
            <div className="flex items-center justify-between px-4 py-4 sm:px-6">
              {/* Serif to match the wordmark in the main header; size stays small, this is the
                  bar inside the open mobile menu, not the wordmark itself. */}
              <a href="/" className="flex items-center gap-3 font-serif text-lg font-bold text-[var(--text-primary)] no-underline">
                <span className="shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/logo-mh.png" alt="" width={414} height={256} className="logo-light h-9 w-auto" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/logo-mh-dark.png" alt="" width={414} height={256} className="logo-dark h-9 w-auto" />
                </span>
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
              {/* Below sm the header has no room for the toggle, so it lives here instead. */}
              {mounted && (
                <button
                  onClick={toggle}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-left text-lg font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)] sm:hidden"
                >
                  {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  {isDark ? "Light mode" : "Dark mode"}
                </button>
              )}
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
