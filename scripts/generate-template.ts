/**
 * Generate a colour-coded, protected Excel template for doctors to fill in.
 * Run: npm run generate:template
 * Output: doctor-website-template.xlsx
 *
 * Colour key:
 *   Header row  = dark blue bg, white bold text
 *   REQUIRED    = pale yellow bg (editable)
 *   Optional    = white bg (editable)
 *   Notes/Help  = light grey bg (locked)
 *   Labels      = light grey bg (locked)
 */
import ExcelJS from "exceljs";
import path from "path";

// ── Shared styles ───────────────────────────────────────────────────────────
const HEADER_FILL: ExcelJS.FillPattern = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1E4E8C" } };
const HEADER_FONT: Partial<ExcelJS.Font> = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
const REQUIRED_FILL: ExcelJS.FillPattern = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFDE7" } };
const OPTIONAL_FILL: ExcelJS.FillPattern = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFFFF" } };
const LABEL_FILL: ExcelJS.FillPattern = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF0F0F0" } };
const NOTE_FILL: ExcelJS.FillPattern = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF0F0F0" } };
const NOTE_FONT: Partial<ExcelJS.Font> = { italic: true, color: { argb: "FF666666" }, size: 10 };
const TITLE_FILL: ExcelJS.FillPattern = { type: "pattern", pattern: "solid", fgColor: { argb: "FFE8F0FE" } };
const TITLE_FONT: Partial<ExcelJS.Font> = { bold: true, size: 14, color: { argb: "FF1E4E8C" } };
const BORDER: Partial<ExcelJS.Borders> = {
  top: { style: "thin", color: { argb: "FFD0D0D0" } },
  bottom: { style: "thin", color: { argb: "FFD0D0D0" } },
  left: { style: "thin", color: { argb: "FFD0D0D0" } },
  right: { style: "thin", color: { argb: "FFD0D0D0" } },
};

interface FieldRow {
  label: string;
  required: boolean;
  defaultValue?: string;
  note?: string;
}

interface TableRow {
  values: string[];
  required?: boolean[];  // per-cell required flags
  notes?: string[];      // per-cell notes (shown in Notes column)
}

/**
 * Build a key-value form sheet (Field | Your Value | Notes)
 */
function buildFormSheet(
  wb: ExcelJS.Workbook,
  name: string,
  fields: FieldRow[],
  opts?: { intro?: string }
) {
  const ws = wb.addWorksheet(name, {
    properties: { tabColor: { argb: "FF1E4E8C" } },
  });

  let startRow = 1;

  // Optional intro text
  if (opts?.intro) {
    ws.getCell(1, 1).value = opts.intro;
    ws.getCell(1, 1).font = { italic: true, color: { argb: "FF555555" }, size: 10 };
    ws.mergeCells(1, 1, 1, 3);
    startRow = 3;
  }

  // Header row
  const headerRow = ws.getRow(startRow);
  ["Field", "Your Value", "Notes"].forEach((h, i) => {
    const cell = headerRow.getCell(i + 1);
    cell.value = h;
    cell.fill = HEADER_FILL;
    cell.font = HEADER_FONT;
    cell.border = BORDER;
    cell.alignment = { vertical: "middle" };
  });
  headerRow.height = 28;

  // Data rows
  fields.forEach((f, idx) => {
    const row = ws.getRow(startRow + 1 + idx);

    // Label cell (locked, grey)
    const labelCell = row.getCell(1);
    labelCell.value = f.label + (f.required ? " *" : "");
    labelCell.fill = LABEL_FILL;
    labelCell.font = { bold: f.required, size: 11 };
    labelCell.border = BORDER;
    labelCell.protection = { locked: true };

    // Value cell (editable, yellow if required)
    const valueCell = row.getCell(2);
    valueCell.value = f.defaultValue || "";
    valueCell.fill = f.required ? REQUIRED_FILL : OPTIONAL_FILL;
    valueCell.border = BORDER;
    valueCell.protection = { locked: false };
    valueCell.alignment = { wrapText: true };

    // Note cell (locked, grey, italic)
    const noteCell = row.getCell(3);
    noteCell.value = f.note || "";
    noteCell.fill = NOTE_FILL;
    noteCell.font = NOTE_FONT;
    noteCell.border = BORDER;
    noteCell.protection = { locked: true };
    noteCell.alignment = { wrapText: true };

    row.height = 24;
  });

  // Column widths
  ws.getColumn(1).width = 30;
  ws.getColumn(2).width = 55;
  ws.getColumn(3).width = 55;

  // Protect sheet (only "Your Value" column is editable)
  ws.protect("", { selectLockedCells: true, selectUnlockedCells: true });
}

/**
 * Build a table/list sheet (multiple columns, rows can be added)
 */
function buildTableSheet(
  wb: ExcelJS.Workbook,
  name: string,
  headers: string[],
  rows: TableRow[],
  colWidths: number[],
  opts?: { intro?: string; noteColIdx?: number }
) {
  const ws = wb.addWorksheet(name, {
    properties: { tabColor: { argb: "FF1E4E8C" } },
  });

  let startRow = 1;
  if (opts?.intro) {
    ws.getCell(1, 1).value = opts.intro;
    ws.getCell(1, 1).font = { italic: true, color: { argb: "FF555555" }, size: 10 };
    ws.mergeCells(1, 1, 1, headers.length);
    startRow = 3;
  }

  // Header row
  const headerRow = ws.getRow(startRow);
  headers.forEach((h, i) => {
    const cell = headerRow.getCell(i + 1);
    cell.value = h;
    cell.fill = HEADER_FILL;
    cell.font = HEADER_FONT;
    cell.border = BORDER;
    cell.alignment = { vertical: "middle" };
  });
  headerRow.height = 28;

  // Data rows
  rows.forEach((r, idx) => {
    const row = ws.getRow(startRow + 1 + idx);
    r.values.forEach((v, ci) => {
      const cell = row.getCell(ci + 1);
      cell.value = v;
      cell.border = BORDER;
      cell.alignment = { wrapText: true };

      const isNoteCol = ci === (opts?.noteColIdx ?? -1);
      if (isNoteCol) {
        cell.fill = NOTE_FILL;
        cell.font = NOTE_FONT;
        cell.protection = { locked: true };
      } else {
        const isReq = r.required?.[ci] ?? false;
        cell.fill = isReq ? REQUIRED_FILL : OPTIONAL_FILL;
        cell.protection = { locked: false };
      }
    });
    row.height = 22;
  });

  // Column widths
  colWidths.forEach((w, i) => { ws.getColumn(i + 1).width = w; });

  ws.protect("", { selectLockedCells: true, selectUnlockedCells: true });
}

async function createTemplate() {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Doctor Website Template";

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 1: Instructions
  // ══════════════════════════════════════════════════════════════════════════
  const wsInst = wb.addWorksheet("Instructions", {
    properties: { tabColor: { argb: "FF2C7A7B" } },
  });

  wsInst.getColumn(1).width = 80;

  const instLines = [
    { text: "DOCTOR WEBSITE SETUP TEMPLATE", style: "title" },
    { text: "", style: "normal" },
    { text: "HOW TO USE THIS SPREADSHEET", style: "heading" },
    { text: "1.  Fill in each tab with your information", style: "normal" },
    { text: "2.  Yellow cells = REQUIRED — you must fill these in", style: "normal" },
    { text: "3.  White cells = optional — leave blank if not needed", style: "normal" },
    { text: "4.  Grey cells = notes and examples — do not edit", style: "normal" },
    { text: "5.  When done, save this file and send it back", style: "normal" },
    { text: "6.  Your website will be generated automatically", style: "normal" },
    { text: "", style: "normal" },
    { text: "COLOUR KEY", style: "heading" },
    { text: "Yellow background  =  REQUIRED (must fill in)", style: "yellow" },
    { text: "White background   =  Optional (fill in if you want)", style: "white" },
    { text: "Grey background    =  Notes / examples (do not edit)", style: "grey" },
    { text: "", style: "normal" },
    { text: "TAB GUIDE", style: "heading" },
    { text: "Doctor Info — Your name, credentials, bio, and roles", style: "normal" },
    { text: "SEO — Page title and description for Google search results", style: "normal" },
    { text: "Hero — The main banner at the top of your website", style: "normal" },
    { text: "Trust Badges — Credential badges shown below the banner", style: "normal" },
    { text: "Conditions — Heart conditions you treat", style: "normal" },
    { text: "Services — Investigations and procedures you offer", style: "normal" },
    { text: "Locations — Where you see patients", style: "normal" },
    { text: "Fees — Consultation prices and insurer information", style: "normal" },
    { text: "Testimonials — Patient quotes (no outcome claims)", style: "normal" },
    { text: "Publications — Selected research papers", style: "normal" },
    { text: "Articles — Patient-facing articles or blog posts", style: "normal" },
    { text: "FAQs — Common questions patients ask you", style: "normal" },
    { text: "Contact — How patients reach you and booking setup", style: "normal" },
    { text: "Social Links — Your professional social media profiles", style: "normal" },
    { text: "Design — Colour scheme for your website", style: "normal" },
    { text: "Setup Checklist — Domain, hosting, and technical setup", style: "normal" },
    { text: "", style: "normal" },
    { text: "IMPORTANT NOTES", style: "heading" },
    { text: "• All content should be in plain English, not medical jargon", style: "normal" },
    { text: "• Do not include any patient-identifiable information", style: "normal" },
    { text: "• Send your headshot photo separately (JPEG/PNG, min 800x800px)", style: "normal" },
    { text: "• Send article images separately (min 1200x800px)", style: "normal" },
  ];

  instLines.forEach((line, i) => {
    const cell = wsInst.getCell(i + 1, 1);
    cell.value = line.text;
    if (line.style === "title") {
      cell.font = TITLE_FONT;
      cell.fill = TITLE_FILL;
    } else if (line.style === "heading") {
      cell.font = { bold: true, size: 12, color: { argb: "FF1E4E8C" } };
    } else if (line.style === "yellow") {
      cell.fill = REQUIRED_FILL;
      cell.font = { size: 11 };
    } else if (line.style === "white") {
      cell.fill = OPTIONAL_FILL;
      cell.font = { size: 11 };
    } else if (line.style === "grey") {
      cell.fill = NOTE_FILL;
      cell.font = NOTE_FONT;
    }
  });

  wsInst.protect("", { selectLockedCells: true });

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 2: Doctor Info
  // ══════════════════════════════════════════════════════════════════════════
  buildFormSheet(wb, "Doctor Info", [
    { label: "First Name", required: true, note: "e.g. Heeraj" },
    { label: "Last Name", required: true, note: "e.g. Bulluck" },
    { label: "Full Name", required: true, note: "e.g. Dr Heerajnarain Bulluck (as on GMC register)" },
    { label: "Display Name", required: true, note: "e.g. Dr Heeraj Bulluck (shorter version for the website)" },
    { label: "Credentials", required: true, note: "e.g. MB BCh, MRCP, PhD, FESC" },
    { label: "Specialty", required: true, note: "e.g. Consultant Interventional Cardiologist" },
    { label: "GMC Number", required: true, note: "e.g. 7084048" },
    { label: "GMC Register URL", required: false, note: "e.g. https://www.gmc-uk.org/doctors/7084048" },
    { label: "Bio Paragraph 1", required: true, note: "Your main introduction (2-3 sentences)" },
    { label: "Bio Paragraph 2", required: false, note: "Training/research background (2-3 sentences)" },
    { label: "Bio Paragraph 3", required: false, note: "Your approach to patient care (2-3 sentences)" },
    { label: "Role 1", required: true, note: "e.g. Consultant Interventional Cardiologist, Leeds General Infirmary" },
    { label: "Role 2", required: false, note: "e.g. Honorary Associate Professor, University of Leeds" },
    { label: "Role 3", required: false, note: "e.g. Author of Heart Reset 40" },
    { label: "Role 4", required: false, note: "" },
  ]);

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 3: SEO
  // ══════════════════════════════════════════════════════════════════════════
  buildFormSheet(wb, "SEO", [
    { label: "Site URL", required: false, note: "e.g. https://www.drbulluck.co.uk" },
    { label: "Page Title", required: true, note: "e.g. Dr Heeraj Bulluck — Consultant Interventional Cardiologist in Leeds" },
    { label: "Meta Description", required: true, note: "150-160 chars for Google. e.g. Expert cardiology care in Leeds..." },
    { label: "Locale", required: false, defaultValue: "en_GB", note: "en_GB for UK, en_US for US" },
  ], { intro: "These settings control how your website appears in Google search results." });

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 4: Hero
  // ══════════════════════════════════════════════════════════════════════════
  buildFormSheet(wb, "Hero", [
    { label: "Headline", required: true, note: "Main heading visitors see first" },
    { label: "Subheadline", required: true, note: "Supporting text below the headline" },
    { label: "Primary Button Text", required: false, defaultValue: "Book consultation", note: "Text on the main button" },
    { label: "Secondary Button Text", required: false, defaultValue: "Call now", note: "Text on the secondary button" },
  ], { intro: "The hero section is the large banner at the top of your homepage." });

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 5: Trust Badges
  // ══════════════════════════════════════════════════════════════════════════
  const emptyRow = (n: number): string[] => Array(n).fill("");
  buildTableSheet(wb, "Trust Badges",
    ["Badge Text", "Notes"],
    [
      { values: ["", "e.g. GMC-registered"], required: [true] },
      { values: ["", "e.g. Consultant Interventional Cardiologist"], required: [true] },
      { values: ["", "e.g. NHS and Private practice"] },
      { values: ["", "e.g. Leeds Teaching Hospitals"] },
      { values: ["", "e.g. 120+ peer-reviewed publications"] },
      { values: ["", "Add up to 6 short badges"] },
    ],
    [50, 45],
    { noteColIdx: 1, intro: "Short credential badges displayed below the hero banner." }
  );

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 6: Conditions
  // ══════════════════════════════════════════════════════════════════════════
  buildTableSheet(wb, "Conditions",
    ["Title", "Short Description", "Icon", "Notes"],
    Array(10).fill(null).map((_, i) => ({
      values: ["", "", i === 0 ? "Heart" : "", i === 0 ? "Icons: Heart, Activity, Wind, Gauge, Shield, Stethoscope, HeartPulse, ClipboardCheck" : ""],
      required: [true, true, false, false],
    })),
    [40, 55, 15, 55],
    { noteColIdx: 3, intro: "One condition per row. These become cards on your homepage and individual pages." }
  );

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 7: Services
  // ══════════════════════════════════════════════════════════════════════════
  buildTableSheet(wb, "Services",
    ["Type (Investigation/Procedure)", "Name", "Description"],
    [
      ...Array(6).fill(null).map(() => ({ values: ["Investigation", "", ""], required: [false, true, true] })),
      ...Array(5).fill(null).map(() => ({ values: ["Procedure", "", ""], required: [false, true, true] })),
    ],
    [28, 40, 65],
    { intro: "Investigations = tests/scans. Procedures = interventions. One per row." }
  );

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 8: Locations
  // ══════════════════════════════════════════════════════════════════════════
  buildTableSheet(wb, "Locations",
    ["Hospital Name", "Area", "Type", "Days", "Google Maps URL", "Note"],
    [
      { values: ["", "", "NHS", "", "", ""], required: [true, false, false, false, false, false] },
      { values: ["", "", "Private", "", "", ""], required: [true, false, false, false, false, false] },
      { values: emptyRow(6) },
      { values: emptyRow(6) },
    ],
    [35, 18, 14, 20, 45, 35],
    { intro: "Where you see patients. One hospital/clinic per row." }
  );

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 9: Fees
  // ══════════════════════════════════════════════════════════════════════════
  buildFormSheet(wb, "Fees", [
    { label: "Initial Consultation", required: false, note: "e.g. £200–£250" },
    { label: "Follow-up", required: false, note: "e.g. £150–£180" },
    { label: "Additional Note", required: false, note: "e.g. We are recognised by Bupa, AXA, Aviva, and Vitality." },
  ]);

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 10: Testimonials
  // ══════════════════════════════════════════════════════════════════════════
  buildTableSheet(wb, "Testimonials",
    ["Patient Quote", "Patient Name", "Label", "Notes"],
    Array(5).fill(null).map((_, i) => ({
      values: ["", "", "Verified patient", i === 0 ? "No outcome claims (GMC/ASA rules). Describe the experience, not results." : ""],
      required: [true, true, false, false],
    })),
    [55, 18, 16, 55],
    { noteColIdx: 3, intro: "Patient testimonials. IMPORTANT: No clinical outcome claims (GMC/ASA rules)." }
  );

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 11: Publications
  // ══════════════════════════════════════════════════════════════════════════
  buildTableSheet(wb, "Publications",
    ["Title", "Authors", "Journal", "Year", "DOI", "PubMed URL"],
    Array(7).fill(null).map(() => ({
      values: emptyRow(6),
      required: [true, true, true, true, false, false],
    })),
    [55, 38, 30, 8, 28, 45],
    { intro: "Selected publications to showcase. Most recent first." }
  );

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 12: Articles
  // ══════════════════════════════════════════════════════════════════════════
  buildTableSheet(wb, "Articles",
    ["Title", "Short Excerpt", "URL", "Date (YYYY-MM-DD)", "Notes"],
    Array(6).fill(null).map((_, i) => ({
      values: ["", "", "", "", i === 0 ? "Send article images separately, named to match the title" : ""],
      required: [true, true, false, false, false],
    })),
    [38, 55, 38, 18, 45],
    { noteColIdx: 4, intro: "Patient-facing articles. URL can link to Medium or leave blank for now." }
  );

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 13: FAQs
  // ══════════════════════════════════════════════════════════════════════════
  buildTableSheet(wb, "FAQs",
    ["Question", "Answer"],
    Array(8).fill(null).map(() => ({
      values: ["", ""],
      required: [true, true],
    })),
    [45, 80],
    { intro: "Common questions patients ask. Write in plain English." }
  );

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 14: Contact
  // ══════════════════════════════════════════════════════════════════════════
  buildFormSheet(wb, "Contact", [
    { label: "Email", required: true, note: "e.g. secretary@drbulluck.co.uk" },
    { label: "Phone", required: true, note: "e.g. +44 113 000 0000" },
    { label: "Booking Type", required: false, defaultValue: "email", note: "Options: email, phone, url, cal" },
    { label: "Booking URL", required: false, note: "If type=url, enter hospital booking page URL" },
    { label: "Cal.com Link", required: false, note: "If type=cal, enter Cal.com username" },
    { label: "Formspree ID", required: false, note: "If type=email, get free ID at formspree.io" },
    { label: "Form Disclaimer", required: false, defaultValue: "This form is not monitored 24/7. Do not use it in an emergency.", note: "" },
    { label: "Urgent Banner Text", required: false, defaultValue: "If you are experiencing chest pain, severe breathlessness, or feel very unwell, call 999 immediately.", note: "" },
  ], { intro: "How patients contact you. Choose one booking method." });

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 15: Social Links
  // ══════════════════════════════════════════════════════════════════════════
  buildTableSheet(wb, "Social Links",
    ["Platform", "URL", "Notes"],
    [
      { values: ["LinkedIn", "", "e.g. https://linkedin.com/in/yourname"] },
      { values: ["Twitter", "", "e.g. https://twitter.com/yourname"] },
      { values: ["Hospital Profile", "", "e.g. https://hospital.nhs.uk/staff/dr-name"] },
    ],
    [20, 50, 45],
    { noteColIdx: 2, intro: "Optional. Leave URL blank to hide a link." }
  );

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 16: Design
  // ══════════════════════════════════════════════════════════════════════════
  buildFormSheet(wb, "Design", [
    { label: "Primary Colour", required: false, defaultValue: "#1e4e8c", note: "Buttons and headings. Default: Royal Blue" },
    { label: "Accent Colour", required: false, defaultValue: "#c53030", note: "Highlights and labels. Default: Coral Red" },
    { label: "Background Colour", required: false, defaultValue: "#ffffff", note: "Page background. Default: White" },
    { label: "Text Colour", required: false, defaultValue: "#1a202c", note: "Main text. Default: Near Black" },
    { label: "Muted Text Colour", required: false, defaultValue: "#4a5568", note: "Secondary text. Default: Grey" },
    { label: "Border Colour", required: false, defaultValue: "#e2e8f0", note: "Borders. Default: Light Grey" },
  ], { intro: "Customise your colour scheme. Leave defaults if unsure. See the colour-schemes.html file for visual previews. Options: 1) Royal Blue+Coral (default), 2) Navy+Teal, 3) Deep Blue+Gold, 4) Forest+Sage, 5) Burgundy+Grey, 6) Dark Blue+Orange (#1a2744/#dd6b20), 7) Black+Gold (#1a1a1a/#b8860b)" });

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 17: Setup Checklist
  // ══════════════════════════════════════════════════════════════════════════
  buildTableSheet(wb, "Setup Checklist",
    ["Task", "Done?", "Notes"],
    [
      { values: ["Buy domain name", "", "e.g. www.drbulluck.co.uk — Namecheap, GoDaddy, or Google Domains"] },
      { values: ["Send headshot photo", "", "Min 800x800px, JPEG or PNG, professional quality"] },
      { values: ["Send article images (if any)", "", "Min 1200x800px per image"] },
      { values: ["Create Formspree account (if using form)", "", "Free at formspree.io"] },
      { values: ["Create Plausible Analytics (optional)", "", "Privacy-friendly analytics at plausible.io"] },
      { values: ["Set up Cal.com (if using calendar)", "", "Free at cal.com"] },
      { values: ["Review website preview", "", "We send you a preview link before going live"] },
      { values: ["Point domain to Vercel", "", "We provide DNS settings for your domain registrar"] },
      { values: ["Go live!", "", "Once domain is pointed, your site is live"] },
    ],
    [42, 10, 55],
    { noteColIdx: 2 }
  );

  // Write file
  const outputPath = path.join(process.cwd(), "doctor-website-template.xlsx");
  await wb.xlsx.writeFile(outputPath);
  console.log(`Template generated: ${outputPath}`);
}

createTemplate();
