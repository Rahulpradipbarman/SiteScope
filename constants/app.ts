export const APP_CONSTANTS = {
  defaultTimeoutMs: 15000,
  healthThresholds: {
    excellent: 90,
    good: 80,
    warning: 70,
  },
  statusMessages: {
    analyzing: "Analyzing",
    emptyHeroDescription: "Audit any website in seconds.",
    ready: "Press Enter to begin analysis",
  },
  errorMessages: {
    invalidUrl: "Please enter a valid website URL beginning with http:// or https://",
    timeout: "The website took too long to respond.",
    dnsFailure: "We couldn't connect to the requested URL.",
    invalidContentType: "This URL does not return an HTML webpage and cannot be audited.",
    serverError: "The requested page could not be retrieved. It may have been moved, deleted, or is temporarily unavailable.",
  },
  errorTitles: {
    INVALID_URL: "Invalid URL",
    TIMEOUT: "Connection Timed Out",
    DNS_FAILURE: "Unable to Reach Website",
    INVALID_CONTENT_TYPE: "Unsupported Content",
    SERVER_ERROR: "Page Not Found",
    UNKNOWN_ERROR: "Unknown Error",
  },
  labels: {
    analyzeButton: "Analyze",
    retryButton: "Retry Diagnosis",
  }
} as const;
