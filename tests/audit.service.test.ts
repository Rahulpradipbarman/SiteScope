import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { performAudit } from "@/services/audit.service";
import { generateMockAuditData } from "@/mocks/audit.mock";
import { APP_CONSTANTS } from "@/constants/app";
import type { AuditMetrics } from "@/types/audit";
import type { AuditRequest } from "@/types/request";

vi.mock("@/mocks/audit.mock", () => ({
  generateMockAuditData: vi.fn(),
}));

describe("performAudit", () => {
  const mockRequest: AuditRequest = {
    url: "https://example.com",
  };

  const mockMetrics: AuditMetrics = {
    status: 200,
    responseTime: 120,
    title: "Example Domain - Official Homepage",
    metaDescription: "Technical SEO overview and performance data for https://example.com.",
    h1Count: 1,
    missingAlt: 0,
    wordCount: 500,
    healthScore: 90,
    categoryScores: {
      responseTime: 20,
      metadata: 20,
      accessibility: 20,
      headings: 20,
      content: 10,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should handle successful HTML response and call generateMockAuditData", async () => {
    vi.mocked(generateMockAuditData).mockReturnValue(mockMetrics);

    const mockHeaders = new Headers();
    mockHeaders.set("content-type", "text/html; charset=utf-8");

    const mockResponse = {
      ok: true,
      status: 200,
      headers: mockHeaders,
    } as Response;

    vi.mocked(global.fetch).mockResolvedValue(mockResponse);

    const result = await performAudit(mockRequest);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      mockRequest.url,
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          "User-Agent": expect.any(String),
          Accept: expect.any(String),
          "Accept-Language": expect.any(String),
        }),
      })
    );

    expect(generateMockAuditData).toHaveBeenCalledTimes(1);
    expect(generateMockAuditData).toHaveBeenCalledWith(mockRequest.url);

    expect(result).toEqual({
      success: true,
      data: mockMetrics,
    });
  });

  it("should handle HTTP error response (response.ok === false) and NOT call generateMockAuditData", async () => {
    const mockHeaders = new Headers();
    mockHeaders.set("content-type", "text/html");

    const mockResponse = {
      ok: false,
      status: 404,
      headers: mockHeaders,
    } as Response;

    vi.mocked(global.fetch).mockResolvedValue(mockResponse);

    const result = await performAudit(mockRequest);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(generateMockAuditData).not.toHaveBeenCalled();

    expect(result).toEqual({
      success: false,
      error: {
        type: "SERVER_ERROR",
        message: APP_CONSTANTS.errorMessages.serverError,
      },
    });
  });

  it("should handle unsupported content type and NOT call generateMockAuditData", async () => {
    const mockHeaders = new Headers();
    mockHeaders.set("content-type", "application/json");

    const mockResponse = {
      ok: true,
      status: 200,
      headers: mockHeaders,
    } as Response;

    vi.mocked(global.fetch).mockResolvedValue(mockResponse);

    const result = await performAudit(mockRequest);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(generateMockAuditData).not.toHaveBeenCalled();

    expect(result).toEqual({
      success: false,
      error: {
        type: "INVALID_CONTENT_TYPE",
        message: APP_CONSTANTS.errorMessages.invalidContentType,
      },
    });
  });

  it("should handle missing content type header and NOT call generateMockAuditData", async () => {
    const mockHeaders = new Headers();

    const mockResponse = {
      ok: true,
      status: 200,
      headers: mockHeaders,
    } as Response;

    vi.mocked(global.fetch).mockResolvedValue(mockResponse);

    const result = await performAudit(mockRequest);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(generateMockAuditData).not.toHaveBeenCalled();

    expect(result).toEqual({
      success: false,
      error: {
        type: "INVALID_CONTENT_TYPE",
        message: APP_CONSTANTS.errorMessages.invalidContentType,
      },
    });
  });

  it("should handle timeout (AbortError) and NOT call generateMockAuditData", async () => {
    const abortError = new Error("The operation was aborted");
    abortError.name = "AbortError";

    vi.mocked(global.fetch).mockRejectedValue(abortError);

    const result = await performAudit(mockRequest);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(generateMockAuditData).not.toHaveBeenCalled();

    expect(result).toEqual({
      success: false,
      error: {
        type: "TIMEOUT",
        message: APP_CONSTANTS.errorMessages.timeout,
      },
    });
  });

  it("should handle DNS / network failure and NOT call generateMockAuditData", async () => {
    const networkError = new TypeError("Failed to fetch");

    vi.mocked(global.fetch).mockRejectedValue(networkError);

    const result = await performAudit(mockRequest);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(generateMockAuditData).not.toHaveBeenCalled();

    expect(result).toEqual({
      success: false,
      error: {
        type: "DNS_FAILURE",
        message: APP_CONSTANTS.errorMessages.dnsFailure,
      },
    });
  });

  it("should respect custom timeout option", async () => {
    const setTimeoutSpy = vi.spyOn(global, "setTimeout");
    vi.mocked(generateMockAuditData).mockReturnValue(mockMetrics);

    const mockHeaders = new Headers();
    mockHeaders.set("content-type", "text/html");

    const mockResponse = {
      ok: true,
      status: 200,
      headers: mockHeaders,
    } as Response;

    vi.mocked(global.fetch).mockResolvedValue(mockResponse);

    const customTimeoutMs = 3000;
    const result = await performAudit(mockRequest, { timeoutMs: customTimeoutMs });

    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), customTimeoutMs);
    expect(result.success).toBe(true);
  });
});
