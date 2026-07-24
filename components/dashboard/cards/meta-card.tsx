import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";

interface MetaCardProps {
  type: "Title" | "Description";
  content: string | null;
  recommendedMax: number;
}

export function MetaCard({ type, content, recommendedMax }: MetaCardProps) {
  const length = content ? content.length : 0;
  
  const getStatus = () => {
    if (!content) return "error";
    if (length > recommendedMax) return "warning";
    if (type === "Description" && length < 50) return "warning";
    if (type === "Title" && length < 30) return "warning";
    return "success";
  };

  const status = getStatus();

  return (
    <Card className="flex flex-col p-6 h-full bg-background-card-glass border-border-neutral">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Page {type}
        </h3>
        <Search className="h-4 w-4 text-text-muted" />
      </div>
      
      <div className="flex flex-col flex-1">
        <div className="mb-4 text-lg font-medium text-text-primary line-clamp-3">
          {content ? content : <span className="italic opacity-50">Missing {type}</span>}
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-text-muted">Length</span>
            <span className={`text-xs font-bold ${
              status === "error" ? "text-accent-error" : 
              status === "warning" ? "text-accent-warning" : 
              "text-accent-primary"
            }`}>
              {length} / {recommendedMax} chars
            </span>
          </div>
          <div className="h-1.5 w-full bg-border-neutral rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${
                status === "error" ? "bg-accent-error" : 
                status === "warning" ? "bg-accent-warning" : 
                "bg-accent-primary"
              }`}
              style={{ width: `${Math.min((length / recommendedMax) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
