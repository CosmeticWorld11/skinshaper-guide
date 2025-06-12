
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonLoaderProps {
  variant?: "card" | "text" | "avatar" | "button";
  lines?: number;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  variant = "text", 
  lines = 3,
  className = ""
}) => {
  switch (variant) {
    case "card":
      return (
        <div className={`space-y-3 ${className}`}>
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      );

    case "avatar":
      return (
        <div className={`flex items-center space-x-4 ${className}`}>
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      );

    case "button":
      return <Skeleton className={`h-10 w-[100px] rounded-md ${className}`} />;

    case "text":
    default:
      return (
        <div className={`space-y-2 ${className}`}>
          {Array.from({ length: lines }).map((_, index) => (
            <Skeleton 
              key={index} 
              className={`h-4 ${
                index === lines - 1 ? 'w-[80%]' : 'w-full'
              }`} 
            />
          ))}
        </div>
      );
  }
};

export default SkeletonLoader;
