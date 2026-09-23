import { cn } from "@/lib/utils";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center", compact ? "gap-2.5" : "gap-3")}>
      <span
        aria-hidden
        className={cn(
          "relative grid shrink-0 place-items-center overflow-hidden border border-primary/45 bg-[#0b100c] shadow-lg shadow-primary/15",
          compact ? "h-9 w-9 rounded-xl" : "h-11 w-11 rounded-[14px]",
        )}
      >
        <span className="absolute -right-3 -top-3 h-8 w-8 rounded-full bg-primary/20 blur-md" />
        <span className="absolute inset-x-0 bottom-0 h-1 bg-primary" />
        <svg viewBox="0 0 48 48" className="relative h-[72%] w-[72%] text-primary">
          <path d="M11 10h27l-4.6 7.5H20v5.2h11.2l-4.4 7.2H20V39h-9V10Z" fill="currentColor" />
          <path d="M30.5 10H38l-4.6 7.5H26l4.5-7.5Z" fill="white" fillOpacity="0.92" />
        </svg>
      </span>

      <span className="flex min-w-0 flex-col">
        <span
          className={cn(
            "font-display font-bold uppercase leading-[0.82] tracking-[0.08em] text-foreground",
            compact ? "text-[22px]" : "text-[28px]",
          )}
        >
          Forge<span className="text-primary">Fit</span>
        </span>
        {!compact && (
          <span className="mt-1 flex items-center gap-1.5 whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-px w-4 bg-primary" /> Treino inteligente
          </span>
        )}
      </span>
    </span>
  );
}
