import { siteConfig } from "@/config/site.config";
import { Card } from "@/components/ui/Card";
import { BookOpen, ExternalLink } from "lucide-react";

export function Publications() {
  if (!siteConfig.publications || siteConfig.publications.length === 0) return null;

  return (
    <section id="publications" className="py-20">
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
            Publications
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[var(--text-primary)]">
            Selected publications
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
            A selection of peer-reviewed research papers published in leading cardiology journals.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {siteConfig.publications.map((pub, i) => (
            <Card key={i}>
              <div className="flex gap-4">
                <div className="hidden shrink-0 sm:block">
                  <BookOpen className="mt-1 h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start gap-1 no-underline"
                  >
                    <h3 className="text-base font-semibold leading-snug text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                      {pub.title}
                    </h3>
                    <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-secondary)] group-hover:text-[var(--accent)]" aria-hidden="true" />
                  </a>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {pub.authors}
                  </p>
                  <p className="mt-1 text-sm">
                    <span className="font-medium italic text-[var(--text-primary)]">{pub.journal}</span>
                    <span className="text-[var(--text-secondary)]"> ({pub.year})</span>
                    {pub.doi && (
                      <span className="text-[var(--text-secondary)]">
                        {" "}&middot;{" "}
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--accent)] hover:underline no-underline"
                        >
                          DOI
                        </a>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
