import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-neutral bg-background-primary/70 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 md:px-8 gap-2 sm:gap-4 md:gap-6">
        <Link 
          href={ROUTES.home}
          className="flex shrink-0 items-center space-x-2.5 rounded-md transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-primary/10 text-accent-primary border border-accent-primary/20 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <span className="tracking-tight font-bold text-text-primary whitespace-nowrap text-base sm:text-lg">
            Page <span className="text-accent-primary">Pulse</span>
          </span>
        </Link>
        <nav className="flex shrink-0 items-center space-x-3 sm:space-x-6">
          <div className="flex shrink-0 items-center space-x-1.5 sm:space-x-2 rounded-full border border-border-neutral bg-background-card-glass px-2.5 py-1 sm:px-3">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-primary"></span>
            </span>
            <span className="text-xs font-medium text-text-secondary whitespace-nowrap">Systems Operational</span>
          </div>
          <a
            href={ROUTES.external.github}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-md text-sm font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary whitespace-nowrap"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
