import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticleSlugs } from "@/lib/content";
import { mdxComponents } from "@/components/mdx/MdxComponents";
import { StructuredData } from "@/components/seo/StructuredData";
import { siteConfig } from "@/config/site.config";
import { Button } from "@/components/ui/Button";
import { ChevronRight, Calendar } from "lucide-react";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: `${article.frontmatter.title} | ${siteConfig.doctor.displayName}`,
    description: article.frontmatter.excerpt,
    openGraph: {
      title: `${article.frontmatter.title} | ${siteConfig.doctor.displayName}`,
      description: article.frontmatter.excerpt,
      type: "article",
    },
  };
}

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const formattedDate = new Date(article.frontmatter.date).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <article className="pt-32 pb-20">
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", href: "/" },
          { name: "Articles", href: "/#articles" },
          { name: article.frontmatter.title },
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
              <a href="/#articles" className="transition-colors hover:text-[var(--text-primary)] no-underline">
                Articles
              </a>
            </li>
            <li>
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
            </li>
            <li className="text-[var(--text-primary)] font-medium" aria-current="page">
              {article.frontmatter.title}
            </li>
          </ol>
        </nav>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <Calendar className="h-4 w-4" aria-hidden="true" />
          <time dateTime={article.frontmatter.date}>{formattedDate}</time>
        </div>

        {/* Title */}
        <h1 className="mt-4 font-serif text-4xl font-bold text-[var(--text-primary)]">
          {article.frontmatter.title}
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          {article.frontmatter.excerpt}
        </p>

        {/* Author */}
        <p className="mt-4 text-sm text-[var(--text-secondary)]">
          By {siteConfig.doctor.displayName}, {siteConfig.doctor.credentials}
        </p>

        {/* Divider */}
        <hr className="mt-8 border-[var(--border)]" />

        {/* MDX Content */}
        <div className="mt-10">
          <MDXRemote source={article.content} components={mdxComponents} />
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-6 text-center">
          <p className="text-lg font-semibold text-[var(--text-primary)]">
            Have questions about your heart health?
          </p>
          <p className="mt-2 text-[var(--text-secondary)]">
            {siteConfig.doctor.displayName} is happy to help with a thorough assessment and clear explanation.
          </p>
          <div className="mt-4">
            <Button href="/#contact">Book a consultation</Button>
          </div>
        </div>

        {/* Back to articles */}
        <div className="mt-8 text-center">
          <a
            href="/#articles"
            className="text-sm font-medium text-[var(--accent)] no-underline hover:underline"
          >
            &larr; Back to all articles
          </a>
        </div>
      </div>
    </article>
  );
}
