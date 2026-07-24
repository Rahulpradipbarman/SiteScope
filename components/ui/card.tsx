import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-xl border border-border-neutral bg-background-card-glass shadow-glass backdrop-blur-md",
        "before:absolute before:inset-0 before:z-[-1] before:rounded-xl before:border-x before:border-t before:border-border-highlight-side before:border-t-border-highlight-top",
        className
      )}
      {...props}
    />
  )
);

Card.displayName = "Card";
