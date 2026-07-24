import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="w-full border-t border-border-neutral py-6 mt-auto">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-8 md:flex-row">
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} {siteConfig.author}. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <p className="text-xs font-medium text-text-muted">
            {siteConfig.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
