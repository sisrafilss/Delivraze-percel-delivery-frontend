import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Package } from "lucide-react";

const StatCard: React.FC<{
  title: string;
  subtitle?: string;
  value?: React.ReactNode;
  loading?: boolean;
  className?: string;
}> = ({ title, subtitle, value, loading, className }) => {
  return (
    <Card
      className={`w-full overflow-hidden transition-transform duration-300 ease-out hover:scale-[1.03] hover:shadow-xl ${
        className ?? ""
      }`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="text-sm font-medium">{title}</span>
          </div>
          {subtitle && <span className="text-xs opacity-80">{subtitle}</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center py-4 md:py-6">
        {loading ? (
          <Skeleton className="h-8 w-24 bg-white/40 dark:bg-black/40" />
        ) : (
          <div className="text-4xl md:text-5xl font-semibold">{value}</div>
        )}
      </CardContent>
      <CardFooter />
    </Card>
  );
};

export default StatCard;
