export type MetricStatus = "success" | "warning" | "error" | "neutral";

export interface CategoryScores {
  responseTime: number;
  metadata: number;
  accessibility: number;
  headings: number;
  content: number;
}

export interface AuditMetrics {
  status: number;
  responseTime: number;
  title: string | null;
  metaDescription: string | null;
  h1Count: number;
  missingAlt: number;
  wordCount: number;
  healthScore: number;
  categoryScores: CategoryScores;
}
