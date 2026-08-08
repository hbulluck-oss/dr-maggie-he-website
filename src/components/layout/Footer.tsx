import { siteConfig } from "@/config/site.config";
import { ExternalLink } from "lucide-react";

export function Footer() {
  const { doctor, contact, nav, socialLinks, copyrightName } = siteConfig;
  const year = new Date().getFullYear();
  const activeSocials = socialLinks?.filter((s) => s.url) || [];

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-site px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Doctor info */}
          <div>
            <p className="text-lg font-bold text-[var(--text-primary)]">
              {doctor.displayName}
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              {doctor.credentials}
            </p>
            <p className="text-sm text-[var(--text-secondary)]">
              {doctor.specialty}
            </p>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              AHPRA Registration:{" "}
              <a
                href={doctor.gmcRegisterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[var(--text-primary)]"
              >
                {doctor.gmcNumber}
              </a>
            </p>
            {/* Social links */}
            {activeSocials.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {activeSocials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--border)] hover:text-[var(--text-primary)] no-underline"
                  >
                    {social.platform}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Quick links */}
          <div>
            <p className="font-semibold text-[var(--text-primary)]">Quick Links</p>
            <nav className="mt-3 flex flex-col gap-2" aria-label="Footer navigation">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] no-underline"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="contact-details">
            <p className="font-semibold text-[var(--text-primary)]">Contact</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-[var(--text-secondary)]">
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="transition-colors hover:text-[var(--text-primary)] no-underline"
              >
                {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="transition-colors hover:text-[var(--text-primary)] no-underline"
              >
                {contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* Compliance links */}
        <div className="mt-10 border-t border-[var(--border)] pt-6">
          <nav aria-label="Legal" className="flex flex-wrap justify-center gap-4 text-xs text-[var(--text-secondary)]">
            <a href="/privacy-policy" className="transition-colors hover:text-[var(--text-primary)] no-underline">Privacy Policy</a>
            <span aria-hidden="true">&middot;</span>
            <a href="/cookie-policy" className="transition-colors hover:text-[var(--text-primary)] no-underline">Cookie Policy</a>
            <span aria-hidden="true">&middot;</span>
            <a href="/accessibility" className="transition-colors hover:text-[var(--text-primary)] no-underline">Accessibility</a>
            <span aria-hidden="true">&middot;</span>
            <a href="/terms" className="transition-colors hover:text-[var(--text-primary)] no-underline">Terms &amp; Conditions</a>
          </nav>
          <div className="mt-4 text-center text-xs text-[var(--text-secondary)]">
            <p>
              &copy; {year} {copyrightName || doctor.displayName}. All rights reserved.
            </p>
            <p className="mt-2">
              This website is for informational purposes only and does not constitute medical advice.
              Always consult a qualified healthcare professional for medical concerns.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
