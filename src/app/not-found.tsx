import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site.config";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-32 pb-20 text-center">
      <h1 className="font-serif text-5xl font-bold text-[var(--text-primary)]">
        404
      </h1>
      <p className="mt-4 text-lg text-[var(--text-secondary)]">
        Sorry, this page could not be found.
      </p>
      <p className="mt-2 text-[var(--text-secondary)]">
        If you were looking for information about a condition or to book an appointment,
        please return to the homepage.
      </p>
      <div className="mt-8">
        <Button href="/">Back to {siteConfig.doctor.displayName}&apos;s homepage</Button>
      </div>
    </div>
  );
}
