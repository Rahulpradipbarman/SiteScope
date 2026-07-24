import { Card } from "@/components/ui/card";
import { FileText, Info } from "lucide-react";

interface WordCountCardProps {
  count: number;
}

export function WordCountCard({ count }: WordCountCardProps) {
  const isThin = count < 300;

  return (
    <Card className="flex flex-col p-6 h-full bg-background-card-glass border-border-neutral">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Word Count
        </h3>
        <FileText className="h-4 w-4 text-text-muted" />
      </div>
      
      <div className="flex items-end space-x-3 mb-4">
        <span className="font-mono text-4xl font-bold tracking-tight text-text-primary leading-none">
          {count.toLocaleString()}
        </span>
        <span className="text-sm font-medium text-text-muted pb-1">
          words
        </span>
      </div>
      
      <div className="mt-auto pt-4 border-t border-border-neutral">
        <div className="flex items-start space-x-2">
          <Info className={`h-4 w-4 mt-0.5 ${isThin ? "text-accent-warning" : "text-accent-primary"}`} />
          <p className="text-xs font-medium text-text-secondary">
            {isThin 
              ? "Thin content may struggle to rank." 
              : "Sufficient content depth detected."}
          </p>
        </div>
      </div>
    </Card>
  );
}
