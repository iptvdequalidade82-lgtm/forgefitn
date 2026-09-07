import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EtiquetaExemplo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-accent px-1.5 py-0.5 font-display text-[11px] font-bold uppercase leading-none tracking-wider text-accent-foreground",
        className,
      )}
    >
      Exemplo
    </span>
  );
}

export function Chip({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-elevated px-2 py-0.5 text-[11px] font-medium text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function PageHeader({
  titulo,
  descricao,
  acoes,
}: {
  titulo: string;
  descricao?: string;
  acoes?: ReactNode;
}) {
  return (
    <header className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="truncate font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
          {titulo}
        </h1>
        {descricao ? (
          <p className="mt-1 text-sm text-muted-foreground">{descricao}</p>
        ) : null}
      </div>
      {acoes ? <div className="flex shrink-0 flex-wrap gap-2">{acoes}</div> : null}
    </header>
  );
}

export function EmptyState({
  titulo,
  descricao,
  acao,
  icone,
}: {
  titulo: string;
  descricao?: string;
  acao?: ReactNode;
  icone?: ReactNode;
}) {
  return (
    <div className="card-surface flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
      {icone ? <div className="text-muted-foreground">{icone}</div> : null}
      <h3 className="font-display text-xl font-semibold uppercase tracking-wide">
        {titulo}
      </h3>
      {descricao ? (
        <p className="max-w-sm text-sm text-muted-foreground">{descricao}</p>
      ) : null}
      {acao}
    </div>
  );
}

export function SkeletonCard() {
  return <div className="h-56 animate-pulse rounded-2xl bg-elevated/70" />;
}
