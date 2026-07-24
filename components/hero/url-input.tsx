"use client";

import { type KeyboardEvent } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_CONSTANTS } from "@/constants/app";
import { cn } from "@/lib/utils";
import type { UrlInputProps } from "@/types/components";

export function UrlInput({ value, onChange, onSubmit, disabled, errorState, className }: UrlInputProps) {
  const displayValue = value.replace(/^https?:\/\//i, "");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div
      className={cn(
        "group relative mx-auto flex w-full max-w-[768px] flex-row items-center rounded-2xl border bg-background-card-glass p-2 shadow-sm transition-all duration-300",
        "focus-within:border-accent-primary focus-within:ring-2 focus-within:ring-accent-primary/20 focus-within:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
        errorState 
          ? "border-accent-error focus-within:border-accent-error focus-within:ring-accent-error/20 focus-within:shadow-[0_0_30px_rgba(239,68,68,0.15)]" 
          : "border-border-neutral hover:border-white/20",
        className
      )}
    >
      <Search className="ml-4 mr-3 h-5 w-5 text-text-muted transition-colors group-focus-within:text-accent-primary" />
      
      <span className="pointer-events-none font-mono text-lg text-text-muted opacity-50">
        https://
      </span>
      
      <input
        value={displayValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="ml-1 h-12 flex-1 bg-transparent px-2 font-mono text-lg text-text-primary placeholder:text-text-muted focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="example.com"
        aria-label="Target Website URL"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
      
      <Button
        onClick={onSubmit}
        disabled={disabled || !displayValue.trim()}
        isLoading={disabled}
        className="ml-2 h-12 rounded-xl px-8 font-semibold shadow-sm"
      >
        {APP_CONSTANTS.labels.analyzeButton}
      </Button>
    </div>
  );
}
