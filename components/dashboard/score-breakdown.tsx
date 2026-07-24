import { Card } from "@/components/ui/card";
import type { AuditMetrics } from "@/types/audit";

interface ScoreBreakdownProps {
  data: AuditMetrics;
}

export function ScoreBreakdown({ data }: ScoreBreakdownProps) {
  // Simple heuristic derivation of breakdown from the overall healthScore.
  // Calculate relative scores out of their max points
  const responseScore = data.responseTime < 200 ? 20 : data.responseTime < 500 ? 15 : 10;
  
  const metaScore = (data.title ? 10 : 0) + (data.metaDescription ? 10 : 0);
  
  const accessibilityScore = data.missingAlt === 0 ? 20 : data.missingAlt < 5 ? 10 : 5;
  
  const headingScore = data.h1Count === 1 ? 20 : data.h1Count === 0 ? 0 : 10;
  
  const contentScore = data.wordCount > 300 ? 20 : 10;

  const categories = [
    { name: "Response Time", score: responseScore, max: 20 },
    { name: "Metadata", score: metaScore, max: 20 },
    { name: "Accessibility", score: accessibilityScore, max: 20 },
    { name: "Heading Structure", score: headingScore, max: 20 },
    { name: "Content", score: contentScore, max: 20 },
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
