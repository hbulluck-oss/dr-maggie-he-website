import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getConditionBySlug, getConditionSlugs } from "@/lib/content";
import { mdxComponents } from "@/components/mdx/MdxComponents";
import { StructuredData } from "@/components/seo/StructuredData";
import { siteConfig } from "@/config/site.config";
import { Button } from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";

export function generateStaticParams() {
  return getConditionSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const condition = getConditionBySlug(params.slug);
  if (!condition) return {};
  return {
    title: `${condition.frontmatter.title} | ${siteConfig.doctor.displayName}`,
    description: condition.frontmatter.shortDescription,
    openGraph: {
      title: `${condition.frontmatter.title} | ${siteConfig.doctor.displayName}`,
      description: condition.frontmatter.shortDescription,
    },
  };
}

export default function ConditionPage({
  params,
}: {
  params: { slug: string };
}) {
  const condition = getConditionBySlug(params.slug);
  if (!condition) notFound();

  return (
    <article className="pt-32 pb-20">
      <StructuredData
        type="medicalCondition"
        name={condition.frontmatter.title}
        description={condition.frontmatter.shortDescription}
      />
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", href: "/" },
          { name: "Conditions", href: "/#conditions" },
          { name: condition.frontmatter.title },
        ]}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
            <li>
              <a href="/" className="transition-colors hover:text-[var(--text-primary)] no-underline">
                Home
              </a>
            </li>
            <li>
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
            </li>
            <li>
              <a href="/#conditions" className="transition-colors hover:text-[var(--text-primary)] no-underline">
                Conditions
              </a>
            </li>
            <li>
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
            </li>
            <li className="text-[var(--text-primary)] font-medium" aria-current="page">
              {condition.frontmatter.title}
            </li>
          </ol>
        </nav>

        {/* Title */}
        <h1 className="font-serif text-4xl font-bold text-[var(--text-primary)]">
          {condition.frontmatter.title}
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          {condition.frontmatter.shortDescription}
        </p>

        {/* MDX Content */}
        <div className="mt-10">
          <MDXRemote source={condition.content} components={mdxComponents} />
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-6 text-center">
          <p className="text-lg font-semibold text-[var(--text-primary)]">
            Concerned about {condition.frontmatter.title.toLowerCase()}?
          </p>
          <p className="mt-2 text-[var(--text-secondary)]">
            {siteConfig.doctor.displayName} can help with thorough assessment and a clear plan.
          </p>
          <div className="mt-4">
            <Button href="/#contact">Book a consultation</Button>
          </div>
        </div>
      </div>
    </article>
  );
}
