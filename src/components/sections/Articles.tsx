import { siteConfig } from "@/config/site.config";
import { FileText } from "lucide-react";

interface ArticleData {
  title: string;
  excerpt: string;
  image: string;
  slug?: string;
  url: string;
  date: string;
}

function ArticleCard({ article }: { article: ArticleData }) {
  // Prefer on-site slug link, fall back to external URL
  const href = article.slug
    ? `/articles/${article.slug}`
    : article.url && article.url !== "#"
    ? article.url
    : null;

  const isExternal = href && !article.slug;

  const content = (
    <>
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-[var(--border)]">
        {article.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--accent)] to-[var(--bg-secondary)]">
            <FileText className="h-12 w-12 text-white/50" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {article.date && (
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
            {new Date(article.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
        <h3 className="mt-2 text-lg font-semibold leading-snug text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
          {article.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
          {article.excerpt}
        </p>
        {href && (
          <p className="mt-3 text-sm font-medium text-[var(--accent)]">
            Read more &rarr;
          </p>
        )}
      </div>
    </>
  );

  const className = "group block overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] no-underline transition-shadow hover:shadow-lg";

  if (href) {
    return (
      <a
        href={href}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={className}
      >
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}

export function Articles() {
  if (!siteConfig.articles || siteConfig.articles.length === 0) return null;

  return (
    <section id="articles" className="py-20 bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-site px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
            Patient Resources
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[var(--text-primary)]">
            Articles for patients
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
            Plain-language guides to help you understand your heart health.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.articles.map((article, i) => (
            <ArticleCard key={i} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
