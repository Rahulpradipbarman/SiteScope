"use client";

import { useEffect } from "react";
import { APP_CONSTANTS } from "@/constants/app";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background-primary p-4">
      <div className="flex max-w-md flex-col items-center space-y-6 rounded-xl border border-border-neutral bg-background-card-glass p-8 text-center shadow-glass backdrop-blur-md">
        <div className="rounded-full bg-accent-error/10 p-3 text-accent-error">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-text-primary">
            {APP_CONSTANTS.errorMessages.serverError}
          </h2>
          <p className="text-sm text-text-secondary">
            {error.message || "An unexpected error occurred."}
          </p>
        </div>

        <button
          onClick={reset}
          className="rounded-lg bg-border-neutral px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-border-focus"
        >
          {APP_CONSTANTS.labels.retryButton}
        </button>
      </div>
    </div>
  );
}
