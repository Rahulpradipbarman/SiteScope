"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Hero } from "@/components/hero/hero";
import { AuditDashboard } from "@/components/dashboard";
import { ErrorPanel } from "@/components/dashboard/error-panel";
import { useAudit } from "@/hooks/useAudit";
import { useKeyboard } from "@/hooks/useKeyboard";
import { Skeleton } from "@/components/ui/skeleton";
import { ANIMATION } from "@/constants/animation";

export default function Home() {
  const { url, setUrl, state, data, error, performAudit, reset } = useAudit();

  useKeyboard("Enter", () => performAudit(), true);

  return (
    <div className="flex w-full flex-col items-center">
      <Hero
        value={url}
        onChange={setUrl}
        onSubmit={() => performAudit()}
        disabled={state === "loading"}
        errorState={state === "error"}
        isCentered={state === "idle"}
      />

      <div className="w-full max-w-[1400px] px-4">
        <AnimatePresence mode="wait">
          {state === "loading" ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={ANIMATION.ease}
              className="grid grid-cols-12 gap-6 pb-20"
            >
              <div className="col-span-12 space-y-6 lg:col-span-8">
                <div className="grid grid-cols-2 gap-6">
                  <Skeleton className="col-span-2 h-[120px] sm:col-span-1" />
                  <Skeleton className="col-span-2 h-[120px] sm:col-span-1" />
                </div>
                <Skeleton className="h-[100px] w-full" />
                <Skeleton className="h-[120px] w-full" />
                <div className="grid grid-cols-3 gap-6">
                  <Skeleton className="col-span-3 h-[110px] sm:col-span-1" />
                  <Skeleton className="col-span-3 h-[110px] sm:col-span-1" />
                  <Skeleton className="col-span-3 h-[110px] sm:col-span-1" />
                </div>
              </div>
              <div className="col-span-12 space-y-6 lg:col-span-4">
                <Skeleton className="h-[320px] w-full" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            </motion.div>
          ) : null}

          {state === "success" && data ? (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AuditDashboard url={url} data={data} onReset={reset} />
            </motion.div>
          ) : null}

          {state === "error" && error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={ANIMATION.ease}
              className="flex w-full items-center justify-center py-6 pb-20"
            >
              <ErrorPanel error={error} onRetry={reset} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
