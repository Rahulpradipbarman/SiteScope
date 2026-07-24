import { useState, useCallback } from "react";
import { AuditService } from "@/services/audit.service";
import type { AuditMetrics } from "@/types/audit";
import type { AppError } from "@/types/error";
import { isValidUrl, formatUrlInput } from "@/lib/validator";
import { APP_CONSTANTS } from "@/constants/app";

type AuditState = "idle" | "loading" | "success" | "error";

export function useAudit() {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<AuditState>("idle");
  const [data, setData] = useState<AuditMetrics | null>(null);
  const [error, setError] = useState<AppError | null>(null);

  const reset = useCallback(() => {
    setState("idle");
    setData(null);
    setError(null);
    setUrl("");
  }, []);

  const performAudit = useCallback(async (targetUrl: string = url) => {
    const formattedUrl = formatUrlInput(targetUrl);
    
    if (!isValidUrl(formattedUrl)) {
      setState("error");
      setError({
        type: "INVALID_URL",
        message: APP_CONSTANTS.errorMessages.invalidUrl,
      });
      return;
    }

    setUrl(formattedUrl);
    setState("loading");
    setError(null);

    try {
      const response = await AuditService.performAudit({ url: formattedUrl });

      if (response.success) {
        setData(response.data);
        setState("success");
      } else {
        setError(response.error);
        setState("error");
      }
    } catch {
      setError({
        type: "UNKNOWN_ERROR",
        message: APP_CONSTANTS.errorMessages.serverError,
      });
      setState("error");
    }
  }, [url]);

  return {
    url,
    setUrl,
    state,
    data,
    error,
    performAudit,
    reset,
  };
}
