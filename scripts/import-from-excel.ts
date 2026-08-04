/**
 * Import doctor data from a filled-in Excel template into site-content.json.
 * Run: npm run import
 * Input: doctor-website-template.xlsx (or pass a path as argument)
 * Output: src/data/site-content.json (overwrites existing)
 */
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";

type Row = (string | number | undefined)[];

function readSheet(wb: XLSX.WorkBook, name: string): Row[] {
  const ws = wb.Sheets[name];
  if (!ws) return [];
  return XLSX.utils.sheet_to_json<Row>(ws, { header: 1, defval: "" });
}

function cell(rows: Row[], rowIdx: number, colIdx: number): string {
  const val = rows?.[rowIdx]?.[colIdx];
  if (val === undefined || val === null) return "";
  return String(val).trim();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function importExcel(filePath: string) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const wb = XLSX.readFile(filePath);

  // ── Doctor Info ──────────────────────────────────────────────────────────
  const doctorRows = readSheet(wb, "Doctor Info");
  const firstName = cell(doctorRows, 1, 1);
  const lastName = cell(doctorRows, 2, 1);
  const bio = [cell(doctorRows, 9, 1), cell(doctorRows, 10, 1), cell(doctorRows, 11, 1)].filter(Boolean);
  const roles = [cell(doctorRows, 12, 1), cell(doctorRows, 13, 1), cell(doctorRows, 14, 1), cell(doctorRows, 15, 1)].filter(Boolean);

  const doctor = {
    firstName: firstName || "Doctor",
    lastName: lastName || "Name",
    fullName: cell(doctorRows, 3, 1) || `Dr ${firstName} ${lastName}`,
    displayName: cell(doctorRows, 4, 1) || `Dr ${firstName} ${lastName}`,
    credentials: cell(doctorRows, 5, 1),
    specialty: cell(doctorRows, 6, 1) || "Consultant Cardiologist",
    gmcNumber: cell(doctorRows, 7, 1),
    gmcRegisterUrl: cell(doctorRows, 8, 1) || `https://www.gmc-uk.org/doctors/${cell(doctorRows, 7, 1)}`,
    photoPath: "/images/doctor-placeholder.jpg",
    bio,
    roles,
  };

  // ── SEO ──────────────────────────────────────────────────────────────────
  const seoRows = readSheet(wb, "SEO");
  const seo = {
    siteUrl: cell(seoRows, 1, 1) || "https://www.example.com",
    title: cell(seoRows, 2, 1) || `${doctor.displayName} — ${doctor.specialty}`,
    description: cell(seoRows, 3, 1) || `${doctor.specialty} offering expert cardiology care.`,
    locale: cell(seoRows, 4, 1) || "en_GB",
  };

  // ── Hero ─────────────────────────────────────────────────────────────────
  const heroRows = readSheet(wb, "Hero");
  const hero = {
    headline: cell(heroRows, 1, 1) || "Expert cardiology care",
    subheadline: cell(heroRows, 2, 1) || `${doctor.specialty} offering thorough assessment and evidence-based treatment.`,
    primaryCTA: cell(heroRows, 3, 1) || "Book consultation",
    secondaryCTA: cell(heroRows, 4, 1) || "Call now",
  };

  // ── Trust Badges ─────────────────────────────────────────────────────────
  const trustRows = readSheet(wb, "Trust Badges");
  const trustBadges = trustRows
    .slice(1)
    .map((r) => String(r[0] || "").trim())
    .filter(Boolean);

  // ── Conditions ───────────────────────────────────────────────────────────
  const condRows = readSheet(wb, "Conditions");
  const conditions = condRows
    .slice(1)
    .filter((r) => cell([r], 0, 0))
    .map((r) => ({
      slug: slugify(String(r[0])),
      title: String(r[0]).trim(),
      shortDescription: String(r[1] || "").trim(),
      icon: String(r[2] || "Heart").trim(),
    }));

  // ── Services ─────────────────────────────────────────────────────────────
  const svcRows = readSheet(wb, "Services");
  const investigations: { name: string; description: string }[] = [];
  const procedures: { name: string; description: string }[] = [];
  for (const r of svcRows.slice(1)) {
    const type = String(r[0] || "").trim().toLowerCase();
    const name = String(r[1] || "").trim();
    const desc = String(r[2] || "").trim();
    if (!name) continue;
    if (type === "procedure") {
      procedures.push({ name, description: desc });
    } else {
      investigations.push({ name, description: desc });
    }
  }

  // ── Locations ────────────────────────────────────────────────────────────
  const locRows = readSheet(wb, "Locations");
  const locations = locRows
    .slice(1)
    .filter((r) => cell([r], 0, 0))
    .map((r) => ({
      name: String(r[0]).trim(),
      area: String(r[1] || "").trim(),
      type: String(r[2] || "Private").trim(),
      days: String(r[3] || "Please enquire").trim(),
      mapUrl: String(r[4] || "").trim() || `https://maps.google.com/?q=${encodeURIComponent(String(r[0]).trim())}`,
      note: String(r[5] || "").trim(),
    }));

  // ── Fees ─────────────────────────────────────────────────────────────────
  const feeRows = readSheet(wb, "Fees");
  const fees = {
    initialConsultation: cell(feeRows, 1, 1),
    followUp: cell(feeRows, 2, 1),
    note: cell(feeRows, 3, 1),
  };

  // ── Testimonials ─────────────────────────────────────────────────────────
  const testRows = readSheet(wb, "Testimonials");
  const testimonials = testRows
    .slice(1)
    .filter((r) => cell([r], 0, 0))
    .map((r) => ({
      quote: String(r[0]).trim(),
      name: String(r[1] || "").trim(),
      label: String(r[2] || "Verified patient").trim(),
    }));

  // ── Publications ─────────────────────────────────────────────────────────
  const pubRows = readSheet(wb, "Publications");
  const publications = pubRows
    .slice(1)
    .filter((r) => cell([r], 0, 0))
    .map((r) => ({
      title: String(r[0]).trim(),
      authors: String(r[1] || "").trim(),
      journal: String(r[2] || "").trim(),
      year: Number(r[3]) || new Date().getFullYear(),
      doi: String(r[4] || "").trim(),
      url: String(r[5] || "").trim(),
    }));

  // ── Articles ─────────────────────────────────────────────────────────────
  const artRows = readSheet(wb, "Articles");
  const articles = artRows
    .slice(1)
    .filter((r) => cell([r], 0, 0))
    .map((r) => ({
      title: String(r[0]).trim(),
      excerpt: String(r[1] || "").trim(),
      url: String(r[2] || "#").trim(),
      date: String(r[3] || "").trim(),
      image: "",
    }));

  // ── FAQs ─────────────────────────────────────────────────────────────────
  const faqRows = readSheet(wb, "FAQs");
  const faqs = faqRows
    .slice(1)
    .filter((r) => cell([r], 0, 0))
    .map((r) => ({
      question: String(r[0]).trim(),
      answer: String(r[1] || "").trim(),
    }));

  // ── Contact ──────────────────────────────────────────────────────────────
  const conRows = readSheet(wb, "Contact");
  const contact = {
    email: cell(conRows, 1, 1) || "secretary@example.com",
    phone: cell(conRows, 2, 1) || "+44 000 000 0000",
    bookingType: cell(conRows, 3, 1) || "email",
    bookingUrl: cell(conRows, 4, 1),
    calLink: cell(conRows, 5, 1),
    formspreeId: cell(conRows, 6, 1),
    formDisclaimer: cell(conRows, 7, 1) || "This form is not monitored 24/7. Do not use it in an emergency. If you have chest pain or feel seriously unwell, call 999.",
    urgentBanner: cell(conRows, 8, 1) || "If you are experiencing chest pain, severe breathlessness, or feel very unwell right now, call 999 immediately.",
  };

  // ── Social Links ─────────────────────────────────────────────────────────
  const socRows = readSheet(wb, "Social Links");
  const socialLinks = socRows
    .slice(1)
    .filter((r) => cell([r], 0, 0))
    .map((r) => ({
      platform: String(r[0]).trim(),
      url: String(r[1] || "").trim(),
    }));

  // ── Design ───────────────────────────────────────────────────────────────
  const desRows = readSheet(wb, "Design");
  const design = {
    primaryColour: cell(desRows, 1, 1) || "#1e4e8c",
    accentColour: cell(desRows, 2, 1) || "#c53030",
    backgroundColour: cell(desRows, 3, 1) || "#ffffff",
    textColour: cell(desRows, 4, 1) || "#1a202c",
    mutedTextColour: cell(desRows, 5, 1) || "#4a5568",
    borderColour: cell(desRows, 6, 1) || "#e2e8f0",
  };

  // ── Build the final JSON ─────────────────────────────────────────────────
  const siteContent = {
    doctor,
    trustBadges: trustBadges.length > 0 ? trustBadges : ["GMC-registered", doctor.specialty],
    hero,
    conditions,
    services: { investigations, procedures },
    locations,
    fees,
    testimonials,
    faqs,
    contact,
    seo,
    design,
    publications,
    articles,
    socialLinks,
    analytics: { plausibleDomain: "" },
    nav: [
      { label: "About", href: "#about" },
      ...(articles.length > 0 ? [{ label: "Articles", href: "#articles" }] : []),
      ...(conditions.length > 0 ? [{ label: "Conditions", href: "#conditions" }] : []),
      { label: "Services", href: "#services" },
      ...(testimonials.length > 0 ? [{ label: "Testimonials", href: "#testimonials" }] : []),
      { label: "Locations", href: "#locations" },
      { label: "Contact", href: "#contact" },
      { label: "FAQ", href: "#faq" },
    ],
  };

  // Write the output
  const outputPath = path.join(process.cwd(), "src", "data", "site-content.json");
  fs.writeFileSync(outputPath, JSON.stringify(siteContent, null, 2));

  console.log(`\nImport complete!`);
  console.log(`  Source: ${filePath}`);
  console.log(`  Output: ${outputPath}`);
  console.log(`\n  Doctor: ${doctor.displayName}`);
  console.log(`  Conditions: ${conditions.length}`);
  console.log(`  Services: ${investigations.length} investigations, ${procedures.length} procedures`);
  console.log(`  Locations: ${locations.length}`);
  console.log(`  Testimonials: ${testimonials.length}`);
  console.log(`  Publications: ${publications.length}`);
  console.log(`  Articles: ${articles.length}`);
  console.log(`  FAQs: ${faqs.length}`);
  console.log(`\nRun "npm run dev" to preview, then "npm run build" to deploy.`);
}

// Accept file path as argument, or default to template file
const inputFile = process.argv[2] || path.join(process.cwd(), "doctor-website-template.xlsx");
importExcel(inputFile);
