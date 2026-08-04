import { siteConfig } from "@/config/site.config";
import { Accordion } from "@/components/ui/Accordion";

export function FAQ() {
  if (siteConfig.faqs.length === 0) return null;

  return (
    <section id="faq" className="bg-[var(--bg-secondary)] py-20">
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
            FAQ
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[var(--text-primary)]">
            Frequently asked questions
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          {siteConfig.faqs.map((faq, i) => (
            <Accordion
              key={i}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
