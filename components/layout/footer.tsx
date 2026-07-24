
export function Footer() {
  return (
    <footer className="w-full border-t border-border-neutral py-8 mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-center gap-2 px-8 text-center">
        <p className="text-sm font-medium text-text-muted">
          &copy; 2026 Rahul Barman
        </p>
        <a 
          href="https://digitalheroesco.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm font-medium text-text-muted transition-all duration-200 hover:text-accent-primary hover:underline hover:opacity-100"
        >
          Built for Digital Heroes Training Task
        </a>
      </div>
    </footer>
  );
}
