import { useId } from "react";

import { cn } from "@/lib/utils";

export function ButterflyMark({ className, animated = true }: { className?: string; animated?: boolean }) {
  const id = useId().replace(/:/g, "");
  const top = `bf-top-${id}`;
  const bottom = `bf-bottom-${id}`;
  return (
    <svg viewBox="0 0 64 64" className={cn("overflow-visible", className)} aria-hidden="true">
      <defs>
        <linearGradient id={top} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--primary-glow)" }} />
          <stop offset="100%" style={{ stopColor: "var(--primary)" }} />
        </linearGradient>
        <linearGradient id={bottom} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--lilac)" }} />
          <stop offset="100%" style={{ stopColor: "var(--accent)" }} />
        </linearGradient>
      </defs>
      <g className={animated ? "wing-left" : undefined}>
        <path d="M31 31 C 24 13, 8 6, 5 17 C 2 28, 17 33, 31 32 Z" fill={`url(#${top})`} />
        <path d="M31 34 C 20 34, 9 40, 13 50 C 17 58, 28 48, 31 37 Z" fill={`url(#${bottom})`} />
        <circle cx="14" cy="19" r="2.4" style={{ fill: "var(--card)" }} opacity="0.7" />
      </g>
      <g className={animated ? "wing-right" : undefined}>
        <path d="M33 31 C 40 13, 56 6, 59 17 C 62 28, 47 33, 33 32 Z" fill={`url(#${top})`} />
        <path d="M33 34 C 44 34, 55 40, 51 50 C 47 58, 36 48, 33 37 Z" fill={`url(#${bottom})`} />
        <circle cx="50" cy="19" r="2.4" style={{ fill: "var(--card)" }} opacity="0.7" />
      </g>
      <ellipse cx="32" cy="34" rx="1.9" ry="11" style={{ fill: "var(--plum)" }} />
      <path d="M31 24 C 29 17, 26 14, 22 13" fill="none" style={{ stroke: "var(--plum)" }} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M33 24 C 35 17, 38 14, 42 13" fill="none" style={{ stroke: "var(--plum)" }} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="22" cy="13" r="1.4" style={{ fill: "var(--plum)" }} />
      <circle cx="42" cy="13" r="1.4" style={{ fill: "var(--plum)" }} />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <ButterflyMark className="h-10 w-10" />
      <span className="flex items-baseline leading-none">
        <span className="font-display text-2xl font-semibold tracking-tight text-foreground">Giglow</span>
        <span className="font-script text-2xl text-primary">Spa</span>
      </span>
    </span>
  );
}
