import * as React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type DashboardTableColumn<T> = {
  header: string;
  accessor: (row: T) => React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  width?: string;
  mobileHidden?: boolean;
};

export type DashboardTableProps<T> = {
  columns: DashboardTableColumn<T>[];
  data: T[];
  rowKey: (row: T, index: number) => string;
  loading?: boolean;
  emptyState?: React.ReactNode;
  loadingRows?: number;
  rowClassName?: (row: T, index: number) => string;
  rowStyle?: (row: T, index: number) => React.CSSProperties | undefined;
  className?: string;
  noCard?: boolean;
};

export function DashboardTable<T>({
  columns,
  data,
  rowKey,
  loading,
  emptyState,
  loadingRows = 5,
  rowClassName,
  rowStyle,
  className,
  noCard = false,
}: DashboardTableProps<T>) {
  const cellsClass = "px-3 py-3 text-sm leading-tight";

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile && !noCard) {
    return (
      <div className={cn("space-y-3", className)}>
        {loading
          ? Array.from({ length: loadingRows }).map((_, idx) => (
              <div
                key={`skeleton-${idx}`}
                className="rounded-xl border border-border bg-card p-4 space-y-3"
              >
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))
          : data.length === 0
          ? (
              <div className="rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
                {emptyState ?? "No records found."}
              </div>
            )
          : data.map((row, rowIndex) => (
              <div
                key={rowKey(row, rowIndex)}
                className={cn(
                  "rounded-xl border border-border bg-card p-4 space-y-3 shadow-sm",
                  rowClassName?.(row, rowIndex)
                )}
                style={rowStyle?.(row, rowIndex)}
              >
                {columns.map((column) => (
                  <div
                    key={column.header}
                    className={cn(
                      "flex justify-between items-center",
                      column.align === "center" && "justify-center",
                      column.align === "right" && "flex-row-reverse",
                      column.mobileHidden && "hidden md:flex"
                    )}
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground md:hidden">
                      {column.header}
                    </span>
                    <div
                      className={cn(
                        "text-sm",
                        column.align === "center" && "text-center",
                        column.align === "right" && "text-right",
                        column.mobileHidden && "hidden md:block"
                      )}
                    >
                      {column.accessor(row)}
                    </div>
                  </div>
                ))}
              </div>
            ))}
      </div>
    );
  }

  return (
    <div className={cn("dashboard-table-scroll min-w-full overflow-x-auto", className)}>
      <table className="w-full min-w-[600px] table-auto border-collapse">
        <thead>
          <tr className="text-sm text-left text-muted-foreground">
            {columns.map((column) => (
              <th
                key={column.header}
                className={cn(
                  "px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em]",
                  column.className,
                  column.align === "center" && "text-center",
                  column.align === "right" && "text-right",
                  column.mobileHidden && "hidden md:table-cell"
                )}
                style={column.width ? { width: column.width } : undefined}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: loadingRows }).map((_, idx) => (
                <tr key={`skeleton-${idx}`} className="border-t border-border">
                  {columns.map((column, columnIndex) => (
                    <td
                      key={`${idx}-${columnIndex}`}
                      className={cn(
                        cellsClass,
                        column.className,
                        column.mobileHidden && "hidden md:table-cell"
                      )}
                    >
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))
            : data.length === 0
            ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-3 py-6 text-center text-sm text-muted-foreground"
                  >
                    {emptyState ?? "No records found."}
                  </td>
                </tr>
              )
            : data.map((row, rowIndex) => (
                <tr
                  key={rowKey(row, rowIndex)}
                  className={cn(
                    "border-t border-border bg-white/80 transition hover:bg-secondary/10 dark:bg-slate-900/70 dark:hover:bg-secondary/20",
                    rowClassName?.(row, rowIndex)
                  )}
                  style={rowStyle?.(row, rowIndex)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.header}
                      className={cn(
                        cellsClass,
                        column.className,
                        column.align === "center" && "text-center",
                        column.align === "right" && "text-right",
                        column.mobileHidden && "hidden md:table-cell"
                      )}
                      style={column.width ? { width: column.width } : undefined}
                    >
                      {column.accessor(row)}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
