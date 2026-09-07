import { cn } from "@/lib/utils";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span
        aria-hidden
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary font-display text-lg font-bold text-primary-foreground"
      >
        F
      </span>
      <span
        className={cn(
          "font-display font-bold uppercase tracking-wide",
          compact ? "text-xl" : "text-2xl",
        )}
      >
        Forge<span className="text-primary">Fit</span>
      </span>
    </span>
  );
}
