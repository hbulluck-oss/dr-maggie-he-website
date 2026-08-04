import { siteConfig } from "@/config/site.config";
import { Badge } from "@/components/ui/Badge";

export function About() {
  const { doctor } = siteConfig;

  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr]">
          <div className="flex justify-center lg:justify-start">
            <div
              className="relative w-64 overflow-hidden rounded-2xl bg-[var(--border)] sm:w-72"
              style={{ aspectRatio: "2/3" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={doctor.aboutPhotoPath ?? doctor.photoPath}
                alt={`${doctor.displayName} in the cardiac catheterisation lab`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
              About
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-[var(--text-primary)]">
              {doctor.displayName}
            </h2>
            <p className="mt-1 text-[var(--text-secondary)]">
              {doctor.credentials}
            </p>

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
        </div>
      </div>
    </section>
  );
}
