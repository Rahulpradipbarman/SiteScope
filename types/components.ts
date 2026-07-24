import type { ReactNode } from "react";
import type { MetricStatus } from "./audit";

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface MetricCardProps extends BaseProps {
  label: string;
  value: string | number;
  description?: string;
  status: MetricStatus;
  icon?: ReactNode;
}

export interface HealthScoreCardProps extends BaseProps {
  score: number;
  summaryText: string;
  grade: string;
}

export interface UrlInputProps extends BaseProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  errorState?: boolean;
}
