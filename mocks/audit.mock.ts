import type { AuditMetrics } from "@/types/audit";

export function generateMockAuditData(url: string): AuditMetrics {
  let hostname = "Unknown";
  try {
    const parsed = new URL(url);
    hostname = parsed.hostname;
  } catch {}

  const hash = url.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const parts = hostname.split(".");
  let domainName = parts.length > 1 ? parts[parts.length - 2] : hostname;
  if (domainName.length <= 2 && parts.length > 2) {
    domainName = parts[parts.length - 3];
  }
  const titleStr = domainName.charAt(0).toUpperCase() + domainName.slice(1).toLowerCase();

  const status = hash % 10 === 0 ? 404 : (hash % 15 === 0 ? 500 : 200);
  const responseTime = 50 + (hash % 450);
  const title = `${titleStr} - Official Homepage`;
  const metaDescription = `Technical SEO overview and performance data for ${url}.`;
  const h1Count = hash % 7 === 0 ? 0 : (hash % 3) + 1;
  const missingAlt = hash % 6;
  const wordCount = 250 + (hash % 3000);

  const catResponse = responseTime < 200 ? 20 : responseTime < 500 ? 15 : 10;
  const catMeta = (title ? 10 : 0) + (metaDescription ? 10 : 0);
  const catAccess = missingAlt === 0 ? 20 : missingAlt < 5 ? 10 : 5;
  const catHeading = h1Count === 1 ? 20 : h1Count === 0 ? 0 : 10;
  const catContent = wordCount > 300 ? 20 : 10;

  const totalScore = catResponse + catMeta + catAccess + catHeading + catContent;

  return {
    status,
    responseTime,
    title,
    metaDescription,
    h1Count,
    missingAlt,
    wordCount,
    healthScore: totalScore,
    categoryScores: {
      responseTime: catResponse,
      metadata: catMeta,
      accessibility: catAccess,
      headings: catHeading,
      content: catContent,
    }
  };
}
