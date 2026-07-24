import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-neutral bg-background-primary/70 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        <Link 
          href={ROUTES.home}
          className="flex items-center space-x-2 rounded-md transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-primary/10 text-accent-primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <span className="tracking-tight font-semibold text-text-primary">
            {siteConfig.name}
          </span>
        </Link>
        <nav className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 rounded-full border border-border-neutral bg-background-card-glass px-3 py-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-primary"></span>
            </span>
            <span className="text-xs font-medium text-text-secondary">Systems Operational</span>
          </div>
          <a
            href={ROUTES.external.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-md text-sm font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
