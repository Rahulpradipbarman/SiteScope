import type { AuditRequest } from "@/types/request";
import type { AuditResponse } from "@/types/response";
import type { ApiOptions } from "@/types/api";
import { APP_CONSTANTS } from "@/constants/app";
import { generateMockAuditData } from "@/mocks/audit.mock";

export class AuditService {
  static async performAudit(
    request: AuditRequest,
    options?: ApiOptions
  ): Promise<AuditResponse> {
    const timeout = options?.timeoutMs ?? APP_CONSTANTS.defaultTimeoutMs;

    return new Promise((resolve) => {
      const delay = Math.floor(Math.random() * 1500) + 1500;
      
      setTimeout(() => {
        resolve({
          success: true,
          data: generateMockAuditData(request.url),
        });
      }, Math.min(delay, timeout));
    });
  }
}
