"use client";

import { motion } from "framer-motion";
import { Activity, ShieldCheck, Zap, Code2 } from "lucide-react";
import { UrlInput } from "./url-input";
import { APP_CONSTANTS } from "@/constants/app";
import { ANIMATION } from "@/constants/animation";
import { siteConfig } from "@/config/site";
import type { UrlInputProps } from "@/types/components";

interface HeroProps extends UrlInputProps {
  isCentered?: boolean;
}

export function Hero({ isCentered = true, ...inputProps }: HeroProps) {
  return (
    <motion.div
      initial={false}
      animate={{
        paddingTop: isCentered ? "12vh" : "2rem",
        paddingBottom: isCentered ? "12vh" : "2rem",
      }}
      transition={ANIMATION.ease}
      className="flex w-full flex-col items-center justify-center px-4"
    >
      <div className="flex w-full max-w-[800px] flex-col items-center">
        
        {isCentered && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex w-full flex-col items-center text-center"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border-neutral bg-background-card-glass shadow-sm">
              <Activity className="h-8 w-8 text-accent-primary" />
            </div>
            
            <h1 className="mb-4 bg-gradient-to-br from-white to-text-muted bg-clip-text text-5xl font-extrabold tracking-tighter text-transparent sm:text-7xl">
              {siteConfig.name}
            </h1>
            
            <p className="mb-12 max-w-[600px] text-lg leading-relaxed text-text-secondary sm:text-xl">
              {APP_CONSTANTS.statusMessages.emptyHeroDescription}
            </p>
          </motion.div>
        )}

        <motion.div
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex w-full flex-col items-center"
        >
          <UrlInput {...inputProps} />
          
          {isCentered && (
            <div className="mt-4 flex w-full justify-center">
              <p className="flex items-center justify-center space-x-2 whitespace-nowrap text-sm text-text-muted">
                <span>{APP_CONSTANTS.statusMessages.ready}</span>
                <span className="flex items-center space-x-1">
                  <kbd className="flex h-6 items-center justify-center rounded border border-border-neutral bg-background-card-glass px-2 font-mono text-xs text-text-primary shadow-sm">⌘</kbd>
                  <span className="opacity-50">+</span>
                  <kbd className="flex h-6 items-center justify-center rounded border border-border-neutral bg-background-card-glass px-2 font-mono text-xs text-text-primary shadow-sm">Enter</kbd>
                </span>
              </p>
            </div>
          )}
        </motion.div>

        {isCentered && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-12 flex w-full max-w-xl flex-row flex-wrap items-center justify-center gap-6 text-sm font-medium text-text-secondary sm:justify-between"
          >
            <div className="flex items-center space-x-2 transition-colors hover:text-text-primary">
              <Zap className="h-4 w-4 text-accent-primary" />
              <span>Sub-Second Audits</span>
            </div>
            <div className="flex items-center space-x-2 transition-colors hover:text-text-primary">
              <ShieldCheck className="h-4 w-4 text-accent-primary" />
              <span>Enterprise Grade</span>
            </div>
            <div className="flex items-center space-x-2 transition-colors hover:text-text-primary">
              <Code2 className="h-4 w-4 text-accent-primary" />
              <span>Technical SEO</span>
            </div>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
}
