import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1 className="font-serif text-3xl font-bold text-[var(--text-primary)] mt-8 mb-4" {...props} />
  ),
  h2: (props) => (
    <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] mt-8 mb-3" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-xl font-semibold text-[var(--text-primary)] mt-6 mb-2" {...props} />
  ),
  p: (props) => (
    <p className="mb-4 leading-relaxed text-[var(--text-secondary)]" {...props} />
  ),
  ul: (props) => (
    <ul className="mb-4 ml-6 list-disc space-y-1 text-[var(--text-secondary)]" {...props} />
  ),
  ol: (props) => (
    <ol className="mb-4 ml-6 list-decimal space-y-1 text-[var(--text-secondary)]" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  a: (props) => {
    const isExternal =
      props.href?.startsWith("http") || props.href?.startsWith("//");
    return (
      <a
        className="text-[var(--accent)] underline underline-offset-2 transition-colors hover:text-[var(--accent-hover)]"
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...props}
      />
    );
  },
  blockquote: (props) => (
    <blockquote
      className="my-4 border-l-4 border-[var(--accent)] bg-[var(--bg-secondary)] py-3 px-4 text-[var(--text-secondary)] italic"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="font-semibold text-[var(--text-primary)]" {...props} />
  ),
};
