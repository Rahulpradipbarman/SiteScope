import { Card } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";
import type { AuditMetrics } from "@/types/audit";

interface InsightsPanelProps {
  data: AuditMetrics;
}

export function InsightsPanel({ data }: InsightsPanelProps) {
  const insights = [];

  // Response Time
  if (data.responseTime < 200) {
    insights.push({ type: "success", text: "Excellent response time" });
  } else if (data.responseTime > 500) {
    insights.push({ type: "warning", text: "Slow server response time detected" });
  }

  // HTTP Status
  if (data.status === 200) {
    insights.push({ type: "success", text: "HTTP 200 returned successfully" });
  } else {
    insights.push({ type: "error", text: `Non-standard HTTP status: ${data.status}` });
  }

  // Headings
  if (data.h1Count === 0) {
    insights.push({ type: "error", text: "Missing primary H1 heading" });
  } else if (data.h1Count > 1) {
    insights.push({ type: "warning", text: "Multiple H1 tags detected" });
  }

  // Meta
  if (data.metaDescription) {
    insights.push({ type: "success", text: "Meta description detected" });
  } else {
    insights.push({ type: "warning", text: "Missing meta description" });
  }

  if (data.title) {
    insights.push({ type: "success", text: "Page title detected" });
  } else {
    insights.push({ type: "error", text: "Missing page title" });
  }

  // Alt Tags
  if (data.missingAlt > 0) {
    insights.push({ type: "warning", text: `Missing ALT attributes on ${data.missingAlt} images` });
  }

  return (
    <Card className="flex flex-col p-6 bg-background-card-glass border-border-neutral h-full">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-4">Key Insights</h3>
      <div className="flex flex-col gap-3">
        {insights.map((insight, idx) => (
          <div key={idx} className="flex items-start space-x-3">
            <div className="mt-0.5">
              {insight.type === "success" && <CheckCircle2 className="h-4 w-4 text-accent-primary" />}
              {insight.type === "warning" && <AlertTriangle className="h-4 w-4 text-accent-warning" />}
              {insight.type === "error" && <AlertCircle className="h-4 w-4 text-accent-error" />}
            </div>
            <span className="text-sm font-medium text-text-primary leading-tight">
              {insight.text}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
