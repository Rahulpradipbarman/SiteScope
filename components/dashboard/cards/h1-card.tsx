import { Card } from "@/components/ui/card";
import { Heading1, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

interface H1CardProps {
  count: number;
}

export function H1Card({ count }: H1CardProps) {
  const status = count === 1 ? "success" : count === 0 ? "error" : "warning";

  return (
    <Card className="flex flex-col p-6 h-full bg-background-card-glass border-border-neutral">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          H1 Tags
        </h3>
        <Heading1 className="h-4 w-4 text-text-muted" />
      </div>
      
      <div className="flex items-end space-x-3 mb-4">
        <span className="font-mono text-4xl font-bold tracking-tight text-text-primary leading-none">
          {count}
        </span>
        <span className="text-sm font-medium text-text-muted pb-1">
          detected
        </span>
      </div>
      
      <div className="mt-auto pt-4 border-t border-border-neutral">
        <div className="flex items-start space-x-2">
          <div className="mt-0.5">
            {status === "success" && <CheckCircle2 className="h-4 w-4 text-accent-primary" />}
            {status === "warning" && <AlertTriangle className="h-4 w-4 text-accent-warning" />}
            {status === "error" && <AlertCircle className="h-4 w-4 text-accent-error" />}
          </div>
          <p className="text-xs font-medium text-text-secondary">
            {status === "success" 
              ? "Optimal heading structure." 
              : status === "warning"
                ? "Multiple H1s dilute SEO focus."
                : "Missing primary heading."}
          </p>
        </div>
      </div>
    </Card>
  );
}
