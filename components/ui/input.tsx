"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorState?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, errorState, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-md border bg-background-primary px-3 py-2 text-sm text-text-primary ring-offset-background-primary file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          errorState ? "border-accent-error" : "border-border-neutral hover:border-white/15",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
