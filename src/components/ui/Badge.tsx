import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        variant === "default" &&
          "bg-[var(--bg-secondary)] text-[var(--text-primary)]",
        variant === "outline" &&
          "border border-[var(--border)] text-[var(--text-secondary)]",
        className
      )}
    >
      {children}
    </span>
  );
}
