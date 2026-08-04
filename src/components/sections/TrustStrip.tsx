import { siteConfig } from "@/config/site.config";
import { CheckCircle } from "lucide-react";

export function TrustStrip() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--bg-primary)] py-6">
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {siteConfig.trustBadges.map((badge) => (
            <li key={badge} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <CheckCircle className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
