export type MetricStatus = "success" | "warning" | "error" | "neutral";

export interface AuditMetrics {
  status: number;
  responseTime: number;
  title: string | null;
  metaDescription: string | null;
  h1Count: number;
  missingAlt: number;
  wordCount: number;
  healthScore: number;
}
