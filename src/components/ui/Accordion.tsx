"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface AccordionProps {
  question: string;
  answer: string;
  className?: string;
}

export function Accordion({ question, answer, className }: AccordionProps) {
  return (
    <details
      className={cn(
        "group border-b border-[var(--border)]",
        className
      )}
    >
      <summary className="flex cursor-pointer items-center justify-between py-5 text-left font-semibold text-[var(--text-primary)] [&::-webkit-details-marker]:hidden list-none">
        <span>{question}</span>
        <ChevronDown className="h-5 w-5 shrink-0 text-[var(--text-secondary)] transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="pb-5 text-[var(--text-secondary)] leading-relaxed">
        {answer}
      </div>
    </details>
  );
}
