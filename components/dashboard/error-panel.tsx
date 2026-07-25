import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AppError } from "@/types/error";
import { APP_CONSTANTS } from "@/constants/app";
import { cn } from "@/lib/utils";

interface ErrorPanelProps {
  error: AppError;
  onRetry: () => void;
  className?: string;
}

export function ErrorPanel({ error, onRetry, className }: ErrorPanelProps) {
  const title = APP_CONSTANTS.errorTitles[error.type] || APP_CONSTANTS.errorTitles.UNKNOWN_ERROR;

  return (
    <div className={cn("flex w-full items-center justify-center py-6 px-4", className)}>
      <div className="relative w-full max-w-[500px] sm:w-[500px] rounded-[24px] border border-accent-error/30 bg-background-card-glass p-8 sm:p-10 shadow-[0_0_50px_rgba(239,68,68,0.12)] backdrop-blur-xl transition-all duration-300">
        
        {/* Subtle gradient highlight */}
        <div className="absolute inset-0 z-[-1] rounded-[24px] bg-gradient-to-b from-accent-error/10 via-transparent to-transparent pointer-events-none" />

        <div className="flex flex-col items-center text-center space-y-6">
          {/* Centered Circular Icon Accent */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-error/15 border border-accent-error/30 text-accent-error shadow-[0_0_24px_rgba(239,68,68,0.25)]">
            <AlertTriangle className="h-8 w-8" />
          </div>

          {/* Title and Description */}
          <div className="space-y-3 w-full">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed break-words whitespace-normal px-2">
              {error.message}
            </p>
          </div>

          {/* Action Button */}
          <div className="w-full pt-2">
            <Button
              onClick={onRetry}
              variant="secondary"
              className="w-full h-12 rounded-xl bg-accent-error/10 hover:bg-accent-error/20 border border-accent-error/30 text-text-primary font-semibold text-sm transition-all duration-200 shadow-sm active:scale-[0.98]"
            >
              {APP_CONSTANTS.labels.retryButton}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

