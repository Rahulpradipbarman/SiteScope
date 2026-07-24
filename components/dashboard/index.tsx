"use client";

import { motion } from "framer-motion";
import { MetricCard } from "./metric-card";
import { HealthScoreCard } from "./health-score";
import { AuditSummary } from "./audit-summary";
import { InsightsPanel } from "./insights-panel";
import { RecommendationsPanel } from "./recommendations-panel";
import { ScoreBreakdown } from "./score-breakdown";
import { MetaCard } from "./cards/meta-card";
import { H1Card } from "./cards/h1-card";
import { AltTagCard } from "./cards/alt-tag-card";
import { WordCountCard } from "./cards/word-count-card";

import { ANIMATION } from "@/constants/animation";
import type { AuditMetrics } from "@/types/audit";
import { APP_CONSTANTS } from "@/constants/app";
import { Download, Copy, RotateCcw, CheckCircle2, AlertCircle } from "lucide-react";

interface DashboardProps {
  url: string;
  data: AuditMetrics;
  onReset: () => void;
}

export function AuditDashboard({ url, data, onReset }: DashboardProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: ANIMATION.delays.staggerStep },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: ANIMATION.ease },
  };

  const getTopIssues = () => {
    const issues = [];
    if (data.status !== 200) issues.push(`HTTP ${data.status} Status`);
    if (!data.title) issues.push("Missing Page Title");
    if (data.h1Count === 0) issues.push("Missing H1 Tag");
    if (data.missingAlt > 0) issues.push(`${data.missingAlt} Images missing ALT`);
    if (!data.metaDescription) issues.push("Missing Meta Description");
    return issues.slice(0, 3);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex w-full flex-col gap-6 pb-24"
    >
      <motion.div variants={item}>
        <AuditSummary url={url} data={data} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column - Metrics & Details */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={item} className="col-span-1">
              <MetricCard
                label="HTTP Status"
                value={`${data.status} OK`}
                description={data.status === 200 ? "Server resolved successfully" : "Non-standard status"}
                status={data.status === 200 ? "success" : "error"}
                icon={data.status === 200 ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              />
            </motion.div>
            <motion.div variants={item} className="col-span-1">
              <MetricCard
                label="Response Time"
                value={`${data.responseTime} ms`}
                description={data.responseTime < 200 ? "Sub-second TTFB" : "Moderate latency"}
                status={data.responseTime < 200 ? "success" : "warning"}
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div variants={item}>
              <MetaCard type="Title" content={data.title} recommendedMax={60} />
            </motion.div>
            <motion.div variants={item}>
              <MetaCard type="Description" content={data.metaDescription} recommendedMax={160} />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <motion.div variants={item}>
              <H1Card count={data.h1Count} />
            </motion.div>
            <motion.div variants={item}>
              <AltTagCard missingCount={data.missingAlt} />
            </motion.div>
            <motion.div variants={item}>
              <WordCountCard count={data.wordCount} />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={item}>
              <InsightsPanel data={data} />
            </motion.div>
            <motion.div variants={item}>
              <RecommendationsPanel data={data} />
            </motion.div>
          </div>

        </div>

        {/* Right Column - Scoring & Actions */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
          <motion.div variants={item}>
            <HealthScoreCard
              score={data.healthScore}
              grade={data.healthScore >= APP_CONSTANTS.healthThresholds.excellent ? "A+" : data.healthScore >= APP_CONSTANTS.healthThresholds.good ? "B" : "C"}
              summaryText={data.healthScore >= APP_CONSTANTS.healthThresholds.excellent ? "All primary technical SEO tags are fully optimized." : "Some structural HTML issues were detected."}
              topIssues={getTopIssues()}
            />
          </motion.div>

          <motion.div variants={item}>
            <ScoreBreakdown data={data} />
          </motion.div>

          <motion.div variants={item} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <button className="flex h-12 items-center justify-center space-x-2 rounded-xl border border-border-neutral bg-background-card-glass text-sm font-semibold text-text-primary transition-colors hover:bg-border-focus">
                <Download className="h-4 w-4" />
                <span>Export JSON</span>
              </button>
              <button className="flex h-12 items-center justify-center space-x-2 rounded-xl border border-border-neutral bg-background-card-glass text-sm font-semibold text-text-primary transition-colors hover:bg-border-focus">
                <Copy className="h-4 w-4" />
                <span>Copy Report</span>
              </button>
            </div>
            
            <button 
              onClick={onReset}
              className="flex h-14 w-full items-center justify-center space-x-2 rounded-xl bg-accent-primary text-sm font-semibold text-background-main transition-colors hover:bg-accent-primary/90"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Analyze Another Website</span>
            </button>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
