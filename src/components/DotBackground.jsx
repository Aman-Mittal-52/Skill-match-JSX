// components/DotBackground.jsx
import React from "react";
import { cn } from "@/lib/utils"; // Make sure this is defined correctly

export function DotBackground({ children, className }) {
  return (
    <div className={cn("relative w-full min-h-screen", className)}>
      {/* Dotted background layer */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />

      {/* Radial mask for center fade effect */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Foreground content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
}