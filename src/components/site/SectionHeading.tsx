import { cn } from "@/lib/utils";

import { Squiggle } from "./Doodles";

export function SectionHeading({
  eyebrow,
  title,
  script,
  description,
  className,
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: string;
  script?: string;
  description?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <Tag className="mt-3 text-4xl font-medium leading-tight text-foreground sm:text-5xl">
        {title} {script && <span className="font-script text-primary">{script}</span>}
      </Tag>
      <Squiggle className="mx-auto mt-4 h-3 w-28 text-lilac" />
      {description && <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>}
    </div>
  );
}
