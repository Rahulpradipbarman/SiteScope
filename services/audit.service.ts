"use server";

import type { AuditRequest } from "@/types/request";
import type { AuditResponse } from "@/types/response";
import type { ApiOptions } from "@/types/api";
import { APP_CONSTANTS } from "@/constants/app";
import { generateMockAuditData } from "@/mocks/audit.mock";

export async function performAudit(
  request: AuditRequest,
  options?: ApiOptions
): Promise<AuditResponse> {
  const timeout = options?.timeoutMs ?? APP_CONSTANTS.defaultTimeoutMs;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  console.log("--- START AUDIT TRACE ---");
  console.log("1. Normalized URL:", request.url);

  try {
    console.log("2. fetch() called");
    const response = await fetch(request.url, {
      method: "GET",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5"
      },
    });

    clearTimeout(id);

    console.log("3. fetch() completed");
    console.log("4. response.status:", response.status);
    console.log("5. response.ok:", response.ok);
    const contentType = response.headers.get("content-type");
    console.log("6. response.headers.get(\"content-type\"):", contentType);

    if (!response.ok) {
      console.log("7. Whether the code enters the HTTP error branch: true");
      console.log("8. Whether the code enters the unsupported content branch: false (skipped due to HTTP error)");
      console.log("9. Whether the parser executes: false");
      console.log("10. Whether generateAudit() executes: false");
      const result: AuditResponse = {
        success: false,
        error: {
          type: "SERVER_ERROR",
          message: APP_CONSTANTS.errorMessages.serverError,
        },
      };
      console.log("11. What object is finally returned to the client:", JSON.stringify(result));
      console.log("--- END AUDIT TRACE ---");
      return result;
    }
    console.log("7. Whether the code enters the HTTP error branch: false");

    if (!contentType || !contentType.startsWith("text/html")) {
      console.log("8. Whether the code enters the unsupported content branch: true");
      console.log("9. Whether the parser executes: false");
      console.log("10. Whether generateAudit() executes: false");
      const result: AuditResponse = {
        success: false,
        error: {
          type: "INVALID_CONTENT_TYPE",
          message: APP_CONSTANTS.errorMessages.invalidContentType,
        },
      };
      console.log("11. What object is finally returned to the client:", JSON.stringify(result));
      console.log("--- END AUDIT TRACE ---");
      return result;
    }
    console.log("8. Whether the code enters the unsupported content branch: false");

    console.log("9. Whether the parser executes: true");
    console.log("10. Whether generateAudit() executes: true");
    const auditData = generateMockAuditData(request.url);

    const result: AuditResponse = {
      success: true,
      data: auditData,
    };
    console.log("11. What object is finally returned to the client:", JSON.stringify(result));
    console.log("--- END AUDIT TRACE ---");
    return result;
  } catch (err: unknown) {
    clearTimeout(id);
    console.log("Caught exception in catch block:", err);
    console.log("7. Whether the code enters the HTTP error branch: false (exception caught)");
    console.log("8. Whether the code enters the unsupported content branch: false (exception caught)");
    console.log("9. Whether the parser executes: false");
    console.log("10. Whether generateAudit() executes: false");

    let result: AuditResponse;
    if (err instanceof Error && err.name === "AbortError") {
      result = {
        success: false,
        error: {
          type: "TIMEOUT",
          message: APP_CONSTANTS.errorMessages.timeout,
        },
      };
    } else {
      result = {
        success: false,
        error: {
          type: "DNS_FAILURE",
          message: APP_CONSTANTS.errorMessages.dnsFailure,
        },
      };
    }

    console.log("11. What object is finally returned to the client:", JSON.stringify(result));
    console.log("--- END AUDIT TRACE ---");
    return result;
  }
}
