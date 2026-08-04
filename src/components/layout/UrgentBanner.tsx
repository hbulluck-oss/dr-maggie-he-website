"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site.config";
import { X, AlertTriangle } from "lucide-react";

export function UrgentBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (!siteConfig.contact.urgentBanner || dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem("urgent-banner-dismissed", "true");
    } catch {}
  };

  return (
    <div
      role="alert"
      style={{ backgroundColor: "#c53030", color: "#ffffff", padding: "12px 0" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", gap: "12px" }}>
        <AlertTriangle style={{ width: "20px", height: "20px", flexShrink: 0, color: "#ffffff" }} aria-hidden="true" />
        <p style={{ flex: 1, fontSize: "14px", fontWeight: 500, color: "#ffffff", margin: 0 }}>
          {siteConfig.contact.urgentBanner}
        </p>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss urgent alert"
          style={{ flexShrink: 0, padding: "4px", borderRadius: "8px", border: "none", background: "transparent", cursor: "pointer", color: "#ffffff" }}
        >
          <X style={{ width: "16px", height: "16px" }} />
        </button>
      </div>
    </div>
  );
}
