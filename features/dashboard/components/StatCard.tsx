import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: number;
  className?: string;
}

export const StatCard = ({
  title,
  value,
  description,
  trend,
  className,
}: StatCardProps) => {
  return (
    <Card className={cn("p-4", className)}>
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="mt-2 flex items-center gap-2">
        <p className="text-2xl font-bold">{value}</p>
        {trend !== undefined && (
          <span
            className={cn(
              "text-sm font-medium",
              trend > 0 ? "text-green-600" : "text-red-600"
            )}
          >
            {trend > 0 ? "+" : ""}
            {trend}%
          </span>
        )}
      </div>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      )}
    </Card>
  );
}; 