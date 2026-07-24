import { Card } from "@/components/ui/card";
import type { AuditMetrics } from "@/types/audit";

interface ScoreBreakdownProps {
  data: AuditMetrics;
}

export function ScoreBreakdown({ data }: ScoreBreakdownProps) {
  const categories = [
    { name: "Response Time", score: data.categoryScores.responseTime, max: 20 },
    { name: "Metadata", score: data.categoryScores.metadata, max: 20 },
    { name: "Accessibility", score: data.categoryScores.accessibility, max: 20 },
    { name: "Heading Structure", score: data.categoryScores.headings, max: 20 },
    { name: "Content", score: data.categoryScores.content, max: 20 },
  ];

  return (
    <Card className="flex flex-col p-6 bg-background-card-glass border-border-neutral h-full">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-6">Score Breakdown</h3>
      
      <div className="flex flex-col gap-5">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-primary">{cat.name}</span>
              <span className="text-sm font-mono font-bold text-text-primary">
                {cat.score} <span className="text-text-muted">/ {cat.max}</span>
              </span>
            </div>
            <div className="h-2 w-full bg-border-neutral rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent-primary transition-all duration-1000"
                style={{ width: `${(cat.score / cat.max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
