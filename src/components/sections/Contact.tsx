"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site.config";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, AlertTriangle } from "lucide-react";

export function Contact() {
  const { contact, doctor } = siteConfig;
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.formspreeId) {
      // No Formspree ID configured — show the data in a mailto fallback
      const subject = encodeURIComponent(`Website enquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\n${formData.message}`
      );
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      return;
    }

    setFormState("submitting");
    try {
      const res = await fetch(`https://formspree.io/f/${contact.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormState("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
            Contact
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[var(--text-primary)]">
            Book a consultation
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          {/* Direct contact info — always shown */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center justify-center gap-2 text-[var(--text-primary)] transition-colors hover:text-[var(--accent)] no-underline"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">{contact.phone}</span>
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center justify-center gap-2 text-[var(--text-primary)] transition-colors hover:text-[var(--accent)] no-underline"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">{contact.email}</span>
            </a>
          </div>

          {/* Booking form (email mode) */}
          {contact.bookingType === "email" && (
            <div className="booking-form">
              {formState === "success" ? (
                <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center dark:border-green-800 dark:bg-green-900/20">
                  <p className="font-semibold text-green-800 dark:text-green-300">
                    Thank you for your enquiry.
                  </p>
                  <p className="mt-2 text-sm text-green-700 dark:text-green-400">
                    The secretary will be in touch within 1 working day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--text-primary)]">
                      Full name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 block w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--text-primary)]">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 block w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-medium text-[var(--text-primary)]">
                        Phone (optional)
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1 block w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                        placeholder="07xxx xxxxxx"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-[var(--text-primary)]">
                      How can {doctor.displayName} help?
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1 block w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                      placeholder="Briefly describe your concern or reason for booking..."
                    />
                  </div>

                  {formState === "error" && (
                    <p className="text-sm text-red-600">
                      Something went wrong. Please try again or contact us directly.
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={formState === "submitting"}
                  >
                    {formState === "submitting" ? "Sending..." : "Send enquiry"}
                  </Button>
                </form>
              )}

              {/* Disclaimer */}
              <div className="mt-6 flex items-start gap-2 rounded-lg bg-[var(--bg-secondary)] p-4">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" aria-hidden="true" />
                <p className="text-xs text-[var(--text-secondary)]">
                  {contact.formDisclaimer}
                </p>
              </div>
            </div>
          )}

          {/* Cal.com booking (cal mode) */}
          {contact.bookingType === "cal" && contact.calLink && (
            <div className="text-center">
              <Button
                href={`https://cal.com/${contact.calLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book via Cal.com
              </Button>
            </div>
          )}

          {/* Phone only mode */}
          {contact.bookingType === "phone" && (
            <div className="text-center">
              <p className="text-[var(--text-secondary)]">
                Please call or email to book an appointment.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
