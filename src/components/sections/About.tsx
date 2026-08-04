import { siteConfig } from "@/config/site.config";
import { Badge } from "@/components/ui/Badge";

export function About() {
  const { doctor } = siteConfig;

  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
            About
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[var(--text-primary)]">
            {doctor.displayName}
          </h2>
          <p className="mt-1 text-[var(--text-secondary)]">
            {doctor.credentials}
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {doctor.bio.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-[var(--text-secondary)]">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {doctor.roles.map((role) => (
            <Badge key={role} variant="outline">
              {role}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
