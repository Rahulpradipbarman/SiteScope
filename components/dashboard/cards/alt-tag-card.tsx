import { Card } from "@/components/ui/card";
import { Image as ImageIcon, CheckCircle2, AlertTriangle } from "lucide-react";

interface AltTagCardProps {
  missingCount: number;
}

export function AltTagCard({ missingCount }: AltTagCardProps) {
  const status = missingCount === 0 ? "success" : "warning";

  return (
    <Card className="flex flex-col p-6 h-full bg-background-card-glass border-border-neutral">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Image Alt Tags
        </h3>
        <ImageIcon className="h-4 w-4 text-text-muted" />
      </div>
      
      <div className="flex items-end space-x-3 mb-4">
        <span className="font-mono text-4xl font-bold tracking-tight text-text-primary leading-none">
          {missingCount}
        </span>
        <span className="text-sm font-medium text-text-muted pb-1">
          missing
        </span>
      </div>
      
      <div className="mt-auto pt-4 border-t border-border-neutral">
        <div className="flex items-start space-x-2">
          <div className="mt-0.5">
            {status === "success" 
              ? <CheckCircle2 className="h-4 w-4 text-accent-primary" />
              : <AlertTriangle className="h-4 w-4 text-accent-warning" />
            }
          </div>
          <p className="text-xs font-medium text-text-secondary">
            {status === "success" 
              ? "All images are accessible." 
              : "Missing tags harm accessibility and SEO."}
          </p>
        </div>
      </div>
    </Card>
  );
}
