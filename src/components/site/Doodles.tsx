import { cn } from "@/lib/utils";

type DoodleProps = { className?: string; style?: React.CSSProperties };

export function Sparkle({ className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("animate-twinkle", className)} style={style} aria-hidden="true">
      <path d="M12 0 C 13 8, 16 11, 24 12 C 16 13, 13 16, 12 24 C 11 16, 8 13, 0 12 C 8 11, 11 8, 12 0 Z" fill="currentColor" />
    </svg>
  );
}

export function Heart({ className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path
        d="M12 21 C 5 15, 2 12, 2 8 C 2 5, 4.5 3, 7 3 C 9 3, 11 4.5, 12 6.5 C 13 4.5, 15 3, 17 3 C 19.5 3, 22 5, 22 8 C 22 12, 19 15, 12 21 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Swirl({ className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 60" className={className} style={style} aria-hidden="true">
      <path
        d="M2 40 C 20 5, 40 5, 45 28 C 50 50, 30 52, 32 34 C 34 18, 60 12, 75 30 C 88 46, 105 40, 118 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 7"
      />
    </svg>
  );
}

export function Squiggle({ className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 200 20" className={className} style={style} aria-hidden="true" preserveAspectRatio="none">
      <path d="M2 10 Q 15 0, 28 10 T 54 10 T 80 10 T 106 10 T 132 10 T 158 10 T 184 10 T 198 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function Flower({ className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden="true">
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="20" cy="10" rx="6" ry="9" fill="currentColor" opacity="0.55" transform={`rotate(${r} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="4" style={{ fill: "var(--card)" }} />
    </svg>
  );
}
