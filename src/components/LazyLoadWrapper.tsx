// LazyLoadWrapper.tsx
import React, { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

interface LazyLoadWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function LazyLoadWrapper({ children, fallback }: LazyLoadWrapperProps) {
  return (
    <Suspense
      fallback={
        fallback ?? (
          <div>
            <Skeleton className="h-6 w-28 mb-3" />
            <Skeleton className="h-8 w-full" />
          </div>
        )
      }
    >
      {children}
    </Suspense>
  );
}
