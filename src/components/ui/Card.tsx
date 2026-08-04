import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export function Card({ children, className, href }: CardProps) {
  const classes = cn(
    "rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] p-6 transition-colors duration-200",
    href && "hover:border-[var(--accent)] cursor-pointer",
    className
  );

  if (href) {
    return (
      <a href={href} className={cn(classes, "block no-underline")}>
        {children}
      </a>
    );
  }

  return <div className={classes}>{children}</div>;
}
