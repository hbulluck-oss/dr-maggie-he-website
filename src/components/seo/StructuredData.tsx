import { siteConfig } from "@/config/site.config";

interface PhysicianSchemaProps {
  type: "physician";
}

interface MedicalConditionSchemaProps {
  type: "medicalCondition";
  name: string;
  description: string;
}

interface BreadcrumbSchemaProps {
  type: "breadcrumb";
  items: { name: string; href?: string }[];
}

type StructuredDataProps =
  | PhysicianSchemaProps
  | MedicalConditionSchemaProps
  | BreadcrumbSchemaProps;

export function StructuredData(props: StructuredDataProps) {
  const { doctor, contact, seo, locations } = siteConfig;

  let schema: Record<string, unknown>;

  switch (props.type) {
    case "physician":
      schema = {
        "@context": "https://schema.org",
        "@type": "Physician",
        name: doctor.fullName,
        description: `${doctor.specialty} in ${locations[0]?.area || ""}`,
        medicalSpecialty: doctor.specialty,
        url: seo.siteUrl,
        telephone: contact.phone,
        email: contact.email,
        address: locations.map((loc) => ({
          "@type": "PostalAddress",
          addressLocality: loc.area,
          addressCountry: "GB",
        })),
        memberOf: {
          "@type": "MedicalOrganization",
          name: locations[0]?.name || "",
        },
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "Medical Registration",
            recognizedBy: {
              "@type": "Organization",
              name: "General Medical Council",
              url: "https://www.gmc-uk.org",
            },
          },
        ],
      };
      break;

    case "medicalCondition":
      schema = {
        "@context": "https://schema.org",
        "@type": "MedicalCondition",
        name: props.name,
        description: props.description,
      };
      break;

    case "breadcrumb":
      schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: props.items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          ...(item.href ? { item: `${seo.siteUrl}${item.href}` } : {}),
        })),
      };
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
