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
    invalidUrl: "Unable to parse destination. Please check the structure (e.g., https://example.com).",
    timeout: "The targeted server did not respond within our 15-second diagnostic limit. This may be due to high traffic, DDoS prevention firewalls, or geographic routing limits.",
    dnsFailure: "Our nodes could not locate a corresponding DNS record for this domain. Check for spelling errors or inactive domain registration.",
    invalidContentType: "Page Pulse audits HTML structural assets. The target URL returned a binary payload. Please submit a standard web page address.",
    serverError: "We reached the address, but the host server encountered an internal configuration issue. Please try again once the server is back online.",
  },
  labels: {
    analyzeButton: "Analyze",
    retryButton: "Retry Diagnosis",
  }
} as const;
