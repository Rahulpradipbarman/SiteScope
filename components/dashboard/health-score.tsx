import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HealthScoreProps {
  score: number;
  grade: string;
  summaryText: string;
  topIssues?: string[];
  className?: string;
}

export function HealthScoreCard({ score, grade, summaryText, topIssues = [], className }: HealthScoreProps) {
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 90) return "text-accent-primary";
    if (s >= 70) return "text-accent-warning";
    return "text-accent-error";
  };

  const getStrokeColor = (s: number) => {
    if (s >= 90) return "stroke-accent-primary";
    if (s >= 70) return "stroke-accent-warning";
    return "stroke-accent-error";
  };

  return (
    <Card className={cn("flex flex-col p-8 bg-background-card-glass border-border-neutral h-full", className)}>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-8">
        Overall Health Score
      </h2>
      
      <div className="flex flex-col md:flex-row items-center gap-10 lg:flex-col xl:flex-row">
        {/* SVG Ring */}
        <div className="relative flex shrink-0 items-center justify-center">
          <svg className="h-48 w-48 -rotate-90 transform" viewBox="0 0 288 288">
            <circle
              className="stroke-border-neutral"
              strokeWidth="24"
              fill="transparent"
              r="120"
              cx="144"
              cy="144"
            />
            <circle
              className={cn("transition-all duration-1000 ease-out", getStrokeColor(score))}
              strokeWidth="24"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              r="120"
              cx="144"
              cy="144"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className={cn("font-mono text-5xl font-bold tracking-tight", getColor(score))}>
              {score}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted mt-1">
              / 100
            </span>
          </div>
        </div>

        {/* Breakdown Text */}
        <div className="flex flex-col flex-1">
          <div className="mb-2 text-2xl font-bold text-text-primary">
            Grade {grade}
          </div>
          <p className="mb-6 text-sm text-text-secondary leading-relaxed">
            {summaryText}
          </p>
          
          {topIssues.length > 0 && (
            <div className="mt-auto">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
                Top Issues to Fix
              </h4>
              <ul className="flex flex-col gap-2">
                {topIssues.map((issue, idx) => (
                  <li key={idx} className="text-sm font-medium text-text-primary flex items-start gap-2">
                    <span className="text-accent-error mt-0.5">•</span>
                    <span className="leading-tight">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
