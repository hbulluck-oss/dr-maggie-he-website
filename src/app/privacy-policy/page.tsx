import { siteConfig } from "@/config/site.config";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: `Privacy Policy | ${siteConfig.doctor.displayName}`,
  description: `Privacy policy for ${siteConfig.doctor.displayName}'s cardiology practice.`,
};

export default function PrivacyPolicyPage() {
  const { doctor, contact } = siteConfig;

  return (
    <article className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
            <li><a href="/" className="hover:text-[var(--text-primary)] no-underline">Home</a></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="text-[var(--text-primary)] font-medium" aria-current="page">Privacy Policy</li>
          </ol>
        </nav>

        <h1 className="font-serif text-4xl font-bold text-[var(--text-primary)]">Privacy Policy</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">Last updated: March 2025</p>

        <div className="mt-10 space-y-8 text-[var(--text-secondary)] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Who we are</h2>
            <p className="mt-3">
              This website is operated by {doctor.fullName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;),
              {doctor.specialty}. We are registered with the Australian Health Practitioner Regulation Agency
              (AHPRA registration: {doctor.gmcNumber}).
            </p>
            <p className="mt-2">
              We are committed to protecting your personal information and respecting your privacy in accordance
              with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">What data we collect</h2>
            <p className="mt-3">When you use this website or contact us, we may collect:</p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li><strong>Contact information</strong> &mdash; your name, email address, and phone number (if you provide it via the contact form)</li>
              <li><strong>Enquiry details</strong> &mdash; the reason for your enquiry and any message you send us</li>
              <li><strong>Technical data</strong> &mdash; if analytics are enabled, we may collect anonymised, aggregate usage data (pages visited, referral source) with no personal identification</li>
            </ul>
            <p className="mt-3">We do not collect any special category (sensitive) health data through this website.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">How we use your data</h2>
            <p className="mt-3">We use the data you provide to:</p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>Respond to your enquiry and arrange appointments</li>
              <li>Communicate with you about your care</li>
              <li>Improve our website and services</li>
            </ul>
            <p className="mt-3">
              The legal basis for processing your data is your <strong>consent</strong> (when you submit the contact form)
              and our <strong>legitimate interest</strong> in running an effective medical practice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">How we store and protect your data</h2>
            <p className="mt-3">
              Contact form submissions are transmitted securely and stored only for as long as necessary to respond
              to your enquiry. We do not sell, share, or transfer your personal data to third parties, except where
              required by law or with your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Cookies</h2>
            <p className="mt-3">
              This website does not use cookies for tracking or advertising. If analytics are enabled, we use
              Plausible Analytics, which is cookieless and does not collect personal data. See our{" "}
              <a href="/cookie-policy" className="text-[var(--accent)] underline">Cookie Policy</a> for more details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Your rights</h2>
            <p className="mt-3">Under the Australian Privacy Principles (APPs), you have the right to:</p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li><strong>Access</strong> &mdash; request a copy of the personal information we hold about you</li>
              <li><strong>Correction</strong> &mdash; ask us to correct inaccurate information</li>
              <li><strong>Erasure</strong> &mdash; ask us to delete your information where there is no compelling reason to keep it</li>
              <li><strong>Restrict use</strong> &mdash; ask us to limit how we use your information</li>
              <li><strong>Data portability</strong> &mdash; request your information in a portable format</li>
              <li><strong>Object</strong> &mdash; object to a particular use of your information</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at{" "}
              <a href={`mailto:${contact.email}`} className="text-[var(--accent)] underline">{contact.email}</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Complaints</h2>
            <p className="mt-3">
              If you are unhappy with how we have handled your data, you have the right to lodge a complaint with the
              Office of the Australian Information Commissioner (OAIC) at{" "}
              <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] underline">
                oaic.gov.au
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Contact us</h2>
            <p className="mt-3">
              If you have any questions about this privacy policy, please contact us at{" "}
              <a href={`mailto:${contact.email}`} className="text-[var(--accent)] underline">{contact.email}</a> or
              call <a href={`tel:${contact.phone}`} className="text-[var(--accent)] underline">{contact.phone}</a>.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
