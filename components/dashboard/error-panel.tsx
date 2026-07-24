import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { AppError } from "@/types/error";
import { APP_CONSTANTS } from "@/constants/app";

interface ErrorPanelProps {
  error: AppError;
  onRetry: () => void;
}

export function ErrorPanel({ error, onRetry }: ErrorPanelProps) {
  return (
    <div className="col-span-12 flex justify-center py-12">
      <Card className="flex max-w-md flex-col items-center space-y-6 border-accent-error/20 bg-accent-error/5 p-8 text-center">
        <div className="rounded-full bg-accent-error/10 p-3 text-accent-error">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-text-primary capitalize">
            {error.type.replace(/_/g, " ").toLowerCase()}
          </h2>
          <p className="text-sm text-text-secondary">
            {error.message}
          </p>
        </div>
        <Button onClick={onRetry} variant="secondary">
          {APP_CONSTANTS.labels.retryButton}
        </Button>
      </Card>
    </div>
  );
}
