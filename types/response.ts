import type { AuditMetrics } from "./audit";
import type { AppError } from "./error";

export interface AuditSuccessResponse {
  success: true;
  data: AuditMetrics;
}

export interface AuditErrorResponse {
  success: false;
  error: AppError;
}

export type AuditResponse = AuditSuccessResponse | AuditErrorResponse;
