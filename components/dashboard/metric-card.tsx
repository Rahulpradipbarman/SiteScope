import { Card } from "@/components/ui/card";
import type { MetricCardProps } from "@/types/components";
import { cn } from "@/lib/utils";

export function MetricCard({ label, value, description, status, icon, className }: MetricCardProps) {
  const statusColors = {
    success: "text-accent-primary bg-accent-primary/10",
    warning: "text-accent-warning bg-accent-warning/10",
    error: "text-accent-error bg-accent-error/10",
    neutral: "text-text-primary bg-border-neutral",
  };
  
  const statusLabels = {
    success: "Passed",
    warning: "Warning",
    error: "Failed",
    neutral: "Info",
  };

  return (
    <Card className={cn("flex flex-col p-6 h-full bg-background-card-glass border-border-neutral justify-between", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          {label}
        </h3>
        {icon ? <div className="text-text-muted">{icon}</div> : null}
      </div>
      
      <div className="flex flex-col flex-1">
        <div className="font-mono text-4xl font-bold tracking-tight text-text-primary leading-none mb-4">
          {value}
        </div>
        
        <div className="mt-auto pt-4 border-t border-border-neutral flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-secondary">{description}</span>
            <div className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full", statusColors[status])}>
              {statusLabels[status]}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
