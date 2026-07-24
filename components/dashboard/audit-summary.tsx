import { Card } from "@/components/ui/card";
import { Globe, Clock, AlertTriangle } from "lucide-react";
import type { AuditMetrics } from "@/types/audit";
import { APP_CONSTANTS } from "@/constants/app";

interface AuditSummaryProps {
  url: string;
  data: AuditMetrics;
}

export function AuditSummary({ url, data }: AuditSummaryProps) {
  const issuesCount = 
    (data.h1Count !== 1 ? 1 : 0) + 
    data.missingAlt + 
    (!data.title ? 1 : 0) + 
    (!data.metaDescription ? 1 : 0) + 
    (data.status !== 200 ? 1 : 0);

  const grade = data.healthScore >= APP_CONSTANTS.healthThresholds.excellent 
    ? "A+" 
    : data.healthScore >= APP_CONSTANTS.healthThresholds.good 
      ? "B" 
      : data.healthScore >= APP_CONSTANTS.healthThresholds.warning 
        ? "C" 
        : "F";

  const gradeColor = data.healthScore >= APP_CONSTANTS.healthThresholds.excellent 
    ? "text-accent-primary" 
    : data.healthScore >= APP_CONSTANTS.healthThresholds.good 
      ? "text-accent-primary opacity-80"
      : data.healthScore >= APP_CONSTANTS.healthThresholds.warning
        ? "text-accent-warning"
        : "text-accent-error";

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());

  return (
    <Card className="flex w-full flex-col overflow-hidden sm:flex-row bg-background-card-glass border-border-neutral">
      <div className="flex flex-1 flex-col justify-center border-b border-border-neutral p-6 sm:border-b-0 sm:border-r">
        <div className="flex items-center space-x-2 text-text-muted">
          <Globe className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">Target URL</span>
        </div>
        <div className="mt-2 truncate font-mono text-lg font-medium text-text-primary">
          {url}
        </div>
      </div>
      
      <div className="flex flex-col justify-center border-b border-border-neutral p-6 sm:border-b-0 sm:border-r">
        <div className="text-xs font-semibold uppercase tracking-wider text-text-muted">Grade</div>
        <div className={`mt-1 text-3xl font-bold tracking-tight ${gradeColor}`}>{grade}</div>
      </div>

      <div className="flex flex-col justify-center border-b border-border-neutral p-6 sm:border-b-0 sm:border-r">
        <div className="flex items-center space-x-2 text-text-muted">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">Issues</span>
        </div>
        <div className="mt-2 text-2xl font-bold text-text-primary">{issuesCount}</div>
      </div>

      <div className="flex flex-col justify-center p-6">
        <div className="flex items-center space-x-2 text-text-muted">
          <Clock className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">Time Analyzed</span>
        </div>
        <div className="mt-2 text-sm font-medium text-text-primary">
          {formattedDate}
        </div>
      </div>
    </Card>
  );
}
