import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "conditions");
const ARTICLES_DIR = path.join(process.cwd(), "src", "content", "articles");

export interface ConditionFrontmatter {
  title: string;
  shortDescription: string;
  icon: string;
}

export interface ConditionPage {
  slug: string;
  frontmatter: ConditionFrontmatter;
  content: string;
}

export function getConditionSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getConditionBySlug(slug: string): ConditionPage | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return {
    slug,
    frontmatter: data as ConditionFrontmatter,
    content,
  };
}

export function getAllConditions(): ConditionPage[] {
  return getConditionSlugs()
    .map(getConditionBySlug)
    .filter((c): c is ConditionPage => c !== null);
}

// ── Articles ──────────────────────────────────────────────────────────────

export interface ArticleFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  image?: string;
}

export interface ArticlePage {
  slug: string;
  frontmatter: ArticleFrontmatter;
  content: string;
}

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getArticleBySlug(slug: string): ArticlePage | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return {
    slug,
    frontmatter: data as ArticleFrontmatter,
    content,
  };
}

export function getAllArticles(): ArticlePage[] {
  return getArticleSlugs()
    .map(getArticleBySlug)
    .filter((a): a is ArticlePage => a !== null)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}
