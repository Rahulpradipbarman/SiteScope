import { Card } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import type { AuditMetrics } from "@/types/audit";

interface RecommendationsPanelProps {
  data: AuditMetrics;
}

export function RecommendationsPanel({ data }: RecommendationsPanelProps) {
  const recommendations = [];

  if (data.status !== 200) {
    recommendations.push({
      priority: "High",
      title: "Fix HTTP Status",
      explanation: `The server returned a ${data.status} status code. Search engines may not index this page.`,
      impact: "Critical",
    });
  }

  if (data.h1Count !== 1) {
    recommendations.push({
      priority: data.h1Count === 0 ? "High" : "Medium",
      title: data.h1Count === 0 ? "Add an H1 Tag" : "Remove extra H1 Tags",
      explanation: data.h1Count === 0 
        ? "Pages should have exactly one H1 tag to establish the main topic."
        : "Multiple H1 tags dilute the page's structural hierarchy.",
      impact: "High",
    });
  }

  if (!data.title) {
    recommendations.push({
      priority: "High",
      title: "Add a Page Title",
      explanation: "A <title> tag is essential for SEO and tab navigation.",
      impact: "Critical",
    });
  }

  if (!data.metaDescription) {
    recommendations.push({
      priority: "Medium",
      title: "Add a Meta Description",
      explanation: "A compelling meta description improves click-through rates from search results.",
      impact: "Medium",
    });
  }

  if (data.missingAlt > 0) {
    recommendations.push({
      priority: "Medium",
      title: "Add missing ALT Attributes",
      explanation: `${data.missingAlt} images are missing descriptive alt text, hurting accessibility.`,
      impact: "Medium",
    });
  }
  
  if (data.responseTime > 500) {
    recommendations.push({
      priority: "Low",
      title: "Optimize Server Response",
      explanation: `Response time of ${data.responseTime}ms is slower than the recommended 200ms.`,
      impact: "Low",
    });
  }

  return (
    <Card className="flex flex-col p-6 bg-background-card-glass border-border-neutral h-full">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-4">Priority Recommendations</h3>
      
      {recommendations.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center text-text-muted">
          <Info className="h-8 w-8 mb-2 opacity-50" />
          <p className="text-sm font-medium">No critical recommendations.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="flex flex-col p-4 rounded-xl border border-border-neutral bg-background-main/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {rec.priority === "High" && <AlertCircle className="h-4 w-4 text-accent-error" />}
                  {rec.priority === "Medium" && <AlertTriangle className="h-4 w-4 text-accent-warning" />}
                  {rec.priority === "Low" && <Info className="h-4 w-4 text-accent-primary" />}
                  <span className="text-sm font-bold text-text-primary">{rec.title}</span>
                </div>
                <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  rec.priority === "High" ? "bg-accent-error/10 text-accent-error" :
                  rec.priority === "Medium" ? "bg-accent-warning/10 text-accent-warning" :
                  "bg-accent-primary/10 text-accent-primary"
                }`}>
                  {rec.priority} Priority
                </div>
              </div>
              <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                {rec.explanation}
              </p>
              <div className="flex items-center justify-between border-t border-border-neutral pt-2">
                <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">SEO Impact</span>
                <span className="text-xs font-semibold text-text-primary">{rec.impact}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
