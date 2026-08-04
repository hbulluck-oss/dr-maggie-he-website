import { siteConfig } from "@/config/site.config";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: `Terms & Conditions | ${siteConfig.doctor.displayName}`,
  description: `Terms and conditions for ${siteConfig.doctor.displayName}'s website.`,
};

export default function TermsPage() {
  const { doctor, contact } = siteConfig;

  return (
    <article className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
            <li><a href="/" className="hover:text-[var(--text-primary)] no-underline">Home</a></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="text-[var(--text-primary)] font-medium" aria-current="page">Terms &amp; Conditions</li>
          </ol>
        </nav>

        <h1 className="font-serif text-4xl font-bold text-[var(--text-primary)]">Terms &amp; Conditions</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">Last updated: March 2025</p>

        <div className="mt-10 space-y-8 text-[var(--text-secondary)] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">About this website</h2>
            <p className="mt-3">
              This website is operated by {doctor.fullName}, {doctor.specialty}, registered with the Australian
              Health Practitioner Regulation Agency (AHPRA registration: {doctor.gmcNumber}). By using this website,
              you agree to the following terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Medical disclaimer</h2>
            <p className="mt-3">
              The information on this website is provided for <strong>general informational purposes only</strong> and
              does not constitute medical advice, diagnosis, or treatment. It is not a substitute for professional
              medical advice from a qualified healthcare provider.
            </p>
            <p className="mt-2">
              You should not rely on information on this website to make decisions about your health. Always seek the
              advice of your GP or a qualified medical professional with any questions about a medical condition.
            </p>
            <p className="mt-2">
              <strong>If you think you are having a medical emergency, call 000 immediately.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">No doctor-patient relationship</h2>
            <p className="mt-3">
              Using this website or submitting a contact form does not create a doctor-patient relationship.
              A doctor-patient relationship is only established when you are formally accepted as a patient
              following a consultation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Accuracy of information</h2>
            <p className="mt-3">
              We make every effort to ensure the information on this website is accurate and up to date. However,
              medical knowledge evolves, and we cannot guarantee that all content reflects the very latest evidence
              at all times. We accept no liability for any errors or omissions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">External links</h2>
            <p className="mt-3">
              This website may contain links to external websites (such as the AHPRA register, hospital websites, or
              medical resources). We are not responsible for the content or privacy practices of external sites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Intellectual property</h2>
            <p className="mt-3">
              All content on this website, including text, images, and design, is the property of {doctor.fullName}
              unless otherwise stated. You may not reproduce, distribute, or republish any content without prior
              written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Fees and appointments</h2>
            <p className="mt-3">
              Fee information displayed on this website is indicative and may change. Please confirm the fee for your
              consultation when booking. Payment terms and cancellation policies will be provided at the time of booking.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Changes to these terms</h2>
            <p className="mt-3">
              We may update these terms from time to time. The &ldquo;last updated&rdquo; date at the top of this page
              will reflect any changes. Continued use of the website after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Governing law</h2>
            <p className="mt-3">
              These terms are governed by and construed in accordance with the laws of England and Wales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Contact us</h2>
            <p className="mt-3">
              If you have any questions about these terms, please contact us at{" "}
              <a href={`mailto:${contact.email}`} className="text-[var(--accent)] underline">{contact.email}</a>.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
