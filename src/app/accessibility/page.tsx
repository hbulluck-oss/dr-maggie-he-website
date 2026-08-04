import { siteConfig } from "@/config/site.config";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: `Accessibility Statement | ${siteConfig.doctor.displayName}`,
  description: `Accessibility statement for ${siteConfig.doctor.displayName}'s website.`,
};

export default function AccessibilityPage() {
  const { doctor, contact } = siteConfig;

  return (
    <article className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
            <li><a href="/" className="hover:text-[var(--text-primary)] no-underline">Home</a></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="text-[var(--text-primary)] font-medium" aria-current="page">Accessibility Statement</li>
          </ol>
        </nav>

        <h1 className="font-serif text-4xl font-bold text-[var(--text-primary)]">Accessibility Statement</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">Last updated: March 2025</p>

        <div className="mt-10 space-y-8 text-[var(--text-secondary)] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Our commitment</h2>
            <p className="mt-3">
              {doctor.fullName} is committed to making this website accessible to everyone, including people with
              disabilities. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">What we have done</h2>
            <p className="mt-3">This website has been built with the following accessibility features:</p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li><strong>Semantic HTML</strong> &mdash; proper use of headings, landmarks, and page structure so screen readers can navigate easily</li>
              <li><strong>Keyboard navigation</strong> &mdash; all interactive elements (links, buttons, menus, forms) can be reached and operated using a keyboard alone</li>
              <li><strong>Skip-to-content link</strong> &mdash; a hidden link appears on Tab press to let keyboard users jump straight to the main content</li>
              <li><strong>Colour contrast</strong> &mdash; text and background colours have been chosen to meet WCAG AA minimum contrast ratios</li>
              <li><strong>Focus indicators</strong> &mdash; visible outlines appear on all interactive elements when focused</li>
              <li><strong>Alt text</strong> &mdash; all images include descriptive alternative text</li>
              <li><strong>Reduced motion</strong> &mdash; animations and transitions are disabled for users who prefer reduced motion</li>
              <li><strong>Dark mode</strong> &mdash; the site respects your system preference and provides a manual toggle</li>
              <li><strong>Responsive design</strong> &mdash; the site works on all screen sizes, from mobile phones to large monitors</li>
              <li><strong>Readable fonts</strong> &mdash; body text uses a clear, legible sans-serif typeface at a comfortable size</li>
              <li><strong>Form labels</strong> &mdash; all form fields have visible, associated labels</li>
              <li><strong>ARIA attributes</strong> &mdash; interactive components (mobile menu, accordion, alert banner) use appropriate ARIA roles and states</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Known limitations</h2>
            <p className="mt-3">
              We are not aware of any significant accessibility barriers on this website. However, if you encounter
              any difficulty, please let us know (see below).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Feedback and contact</h2>
            <p className="mt-3">
              If you experience any accessibility issues on this website, or if you have suggestions for improvement,
              please contact us:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>Email: <a href={`mailto:${contact.email}`} className="text-[var(--accent)] underline">{contact.email}</a></li>
              <li>Phone: <a href={`tel:${contact.phone}`} className="text-[var(--accent)] underline">{contact.phone}</a></li>
            </ul>
            <p className="mt-3">We aim to respond to accessibility feedback within 5 working days.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Enforcement procedure</h2>
            <p className="mt-3">
              If you are not satisfied with our response, you can contact the Equality Advisory Support Service (EASS)
              at{" "}
              <a href="https://www.equalityadvisoryservice.com" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] underline">
                equalityadvisoryservice.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
