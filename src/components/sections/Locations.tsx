import { siteConfig } from "@/config/site.config";
import { Card } from "@/components/ui/Card";
import { MapPin, Clock, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function Locations() {
  return (
    <section id="locations" className="bg-[var(--bg-secondary)] py-20">
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
            Locations
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[var(--text-primary)]">
            Where I see patients
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
          {siteConfig.locations.map((location) => (
            <Card key={location.name}>
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {location.name}
                </h3>
                <Badge variant={location.type === "NHS" ? "default" : "outline"}>
                  {location.type}
                </Badge>
              </div>

              <div className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{location.area}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{location.days}</span>
                </div>
              </div>

              <p className="mt-3 text-sm text-[var(--text-secondary)]">
                {location.note}
              </p>

              <a
                href={location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
              >
                View on map
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
