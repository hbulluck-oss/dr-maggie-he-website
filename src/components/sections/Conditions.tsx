import { siteConfig } from "@/config/site.config";
import { Card } from "@/components/ui/Card";
import {
  Heart,
  Activity,
  Wind,
  Gauge,
  Shield,
  Stethoscope,
  HeartPulse,
  ClipboardCheck,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";

export function Conditions() {
  return (
    <section id="conditions" className="bg-[var(--bg-secondary)] py-20">
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
            Conditions
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[var(--text-primary)]">
            Conditions I treat
          </h2>
        </div>

        {siteConfig.contact.urgentBanner && (
          <div
            role="note"
            style={{ backgroundColor: "#c53030", color: "#ffffff", borderRadius: "8px", padding: "16px 20px", marginTop: "24px" }}
            className="flex items-center gap-3"
          >
            <AlertTriangle style={{ width: "20px", height: "20px", flexShrink: 0, color: "#ffffff" }} aria-hidden="true" />
            <p style={{ fontSize: "14px", fontWeight: 500, color: "#ffffff", margin: 0 }}>
              {siteConfig.contact.urgentBanner}
            </p>
          </div>
        )}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.conditions.map((condition) => {
            const iconMap: Record<string, LucideIcon> = {
              Heart,
              Activity,
              Wind,
              Gauge,
              Shield,
              Stethoscope,
              HeartPulse,
              ClipboardCheck,
            };
            const Icon = iconMap[condition.icon] || Heart;

            return (
              <Card
                key={condition.slug}
                href={`/conditions/${condition.slug}/`}
              >
                <Icon
                  className="h-8 w-8 text-[var(--accent)]"
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-semibold text-[var(--text-primary)]">
                  {condition.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {condition.shortDescription}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
