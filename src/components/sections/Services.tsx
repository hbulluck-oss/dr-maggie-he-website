import { siteConfig } from "@/config/site.config";
import { Search, Wrench } from "lucide-react";

export function Services() {
  const { investigations, procedures } = siteConfig.services;

  return (
    <section id="services" className="py-20">
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
            Services
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[var(--text-primary)]">
            Investigations &amp; Procedures
          </h2>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* Investigations */}
          <div>
            <div className="flex items-center gap-3">
              <Search className="h-6 w-6 text-[var(--accent)]" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                Investigations
              </h3>
            </div>
            <ul className="mt-6 space-y-4">
              {investigations.map((item) => (
                <li key={item.name} className="border-b border-[var(--border)] pb-4 last:border-0">
                  <p className="font-medium text-[var(--text-primary)]">{item.name}</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Procedures */}
          <div>
            <div className="flex items-center gap-3">
              <Wrench className="h-6 w-6 text-[var(--accent)]" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                Procedures
              </h3>
            </div>
            <ul className="mt-6 space-y-4">
              {procedures.map((item) => (
                <li key={item.name} className="border-b border-[var(--border)] pb-4 last:border-0">
                  <p className="font-medium text-[var(--text-primary)]">{item.name}</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
