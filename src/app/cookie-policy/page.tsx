import { siteConfig } from "@/config/site.config";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: `Cookie Policy | ${siteConfig.doctor.displayName}`,
  description: `Cookie policy for ${siteConfig.doctor.displayName}'s website.`,
};

export default function CookiePolicyPage() {
  const { contact } = siteConfig;

  return (
    <article className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
            <li><a href="/" className="hover:text-[var(--text-primary)] no-underline">Home</a></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="text-[var(--text-primary)] font-medium" aria-current="page">Cookie Policy</li>
          </ol>
        </nav>

        <h1 className="font-serif text-4xl font-bold text-[var(--text-primary)]">Cookie Policy</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">Last updated: March 2025</p>

        <div className="mt-10 space-y-8 text-[var(--text-secondary)] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">What are cookies?</h2>
            <p className="mt-3">
              Cookies are small text files stored on your device when you visit a website. They are widely used to
              make websites work efficiently and to provide information to website owners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">How we use cookies</h2>
            <p className="mt-3">
              This website is designed to be privacy-first. By default, <strong>we do not use any cookies</strong> for
              tracking, advertising, or personalisation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Analytics</h2>
            <p className="mt-3">
              If analytics are enabled on this website, we use <strong>Plausible Analytics</strong>, a privacy-focused
              analytics service that does not use cookies, does not collect personal data, and is fully compliant with
              UK GDPR, PECR, and ePrivacy regulations. No cookie banner is required for Plausible.
            </p>
            <p className="mt-2">
              Plausible collects only aggregate, anonymised data such as page views, referral sources, and country of
              origin. No individual visitor can be identified.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Essential cookies</h2>
            <p className="mt-3">
              This website may use minimal essential cookies for basic functionality, such as:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li><strong>Theme preference</strong> &mdash; remembers whether you have chosen light or dark mode (stored in your browser&apos;s local storage, not as a cookie)</li>
              <li><strong>Banner dismissal</strong> &mdash; remembers if you have dismissed the urgent symptoms banner during your visit (stored in session storage)</li>
            </ul>
            <p className="mt-2">These do not track you and are not shared with any third party.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Third-party cookies</h2>
            <p className="mt-3">
              This website does not embed any third-party cookies, tracking pixels, social media widgets, or
              advertising scripts.
            </p>
            <p className="mt-2">
              If a booking system (such as Cal.com) is enabled, it may set its own cookies when you interact with
              the booking widget. Please refer to the booking provider&apos;s cookie policy for details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Managing cookies</h2>
            <p className="mt-3">
              You can control and delete cookies through your browser settings. Most browsers allow you to block or
              delete cookies. However, since this website does not rely on cookies, this should not affect your experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Contact us</h2>
            <p className="mt-3">
              If you have any questions about this cookie policy, please contact us at{" "}
              <a href={`mailto:${contact.email}`} className="text-[var(--accent)] underline">{contact.email}</a>.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
