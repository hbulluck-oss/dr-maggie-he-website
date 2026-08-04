import { siteConfig } from "@/config/site.config";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const { hero, doctor, contact } = siteConfig;
  const bookingHref = contact.bookingUrl || "#contact";
  const bookingExternal = !!contact.bookingUrl;

  return (
    <section className="relative bg-[var(--bg-secondary)] pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
              {doctor.specialty}
            </p>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-[var(--text-primary)] sm:text-5xl">
              {hero.headline}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)]">
              {hero.subheadline}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                href={bookingHref}
                {...(bookingExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {hero.primaryCTA}
              </Button>
              <Button href={`tel:${contact.phone}`} variant="outline">
                {hero.secondaryCTA}
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-64 overflow-hidden rounded-2xl bg-[var(--border)] sm:w-72" style={{ aspectRatio: "2/3" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={doctor.photoPath}
                alt={`${doctor.displayName}, ${doctor.specialty}`}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
