import React from "react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  fallback?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
};

const minWidthClasses = {
  sm: "min-w-8",
  md: "min-w-12",
  lg: "min-w-16",
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  size = "md",
  className,
  fallback,
}) => {
  const sizeClass = sizeClasses[size];
  const minWClass = minWidthClasses[size];

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden border border-foreground-secondary",
        sizeClass,
        minWClass,
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size === "sm" ? 32 : size === "md" ? 48 : 64}
          height={size === "sm" ? 32 : size === "md" ? 48 : 64}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-secondary flex items-center justify-center">
          <span className="text-accent font-medium text-sm">
            {fallback || "?"}
          </span>
        </div>
      )}
    </div>
  );
};
