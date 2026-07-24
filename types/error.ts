export type ErrorType = 
  | "INVALID_URL"
  | "TIMEOUT"
  | "DNS_FAILURE"
  | "INVALID_CONTENT_TYPE"
  | "SERVER_ERROR"
  | "UNKNOWN_ERROR";

export interface AppError {
  type: ErrorType;
  message: string;
  statusCode?: number;
}
