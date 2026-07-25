export function isValidUrl(url: string): boolean {
  try {
    const trimmed = url.trim();
    if (!trimmed) return false;
    
    if (!/^https?:\/\//i.test(trimmed)) return false;

    const parsed = new URL(trimmed);
    if (!["http:", "https:"].includes(parsed.protocol)) return false;
    
    const hostname = parsed.hostname;
    if (!hostname.includes(".") && hostname !== "localhost") return false;
    if (hostname.length < 3) return false;
    
    return true;
  } catch {
    return false;
  }
}

export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";
  
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  
  return trimmed;
}
