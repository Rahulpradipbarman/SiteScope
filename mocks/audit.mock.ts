import type { AuditMetrics } from "@/types/audit";

export function generateMockAuditData(url: string): AuditMetrics {
  let hostname = "Unknown";
  try {
    const parsed = new URL(url);
    hostname = parsed.hostname;
  } catch {
    // Fallback if URL parsing fails unexpectedly
  }

  const hash = url.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const parts = hostname.split(".");
  let domainName = parts.length > 1 ? parts[parts.length - 2] : hostname;
  if (domainName.length <= 2 && parts.length > 2) {
    domainName = parts[parts.length - 3];
  }
  const title = domainName.charAt(0).toUpperCase() + domainName.slice(1).toLowerCase();

  return {
    status: hash % 10 === 0 ? 404 : (hash % 15 === 0 ? 500 : 200),
    responseTime: 50 + (hash % 450),
    title: `${title} | Simulated Environment`,
    metaDescription: `Simulated SEO audit and performance data generated for ${url}.`,
    h1Count: hash % 7 === 0 ? 0 : (hash % 3) + 1,
    missingAlt: hash % 6,
    wordCount: 250 + (hash % 3000),
    healthScore: Math.max(45, 100 - (hash % 40)),
  };
}
