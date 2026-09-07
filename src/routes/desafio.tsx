import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Flame, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { diasDesafio, TOTAL_DIAS_DESAFIO, type DiaDesafio } from "@/data/desafio";
import { useForge } from "@/lib/store";
import { PageHeader, EtiquetaExemplo } from "@/components/forge/ui-bits";
import { Thumbnail } from "@/components/forge/Media";
import { materiaisPorCategoria } from "@/data/materiais";
import { baixarArquivo } from "@/lib/download";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/desafio")({
  head: () => ({
    meta: [
      { title: "Desafio 24 dias — FORGEFIT" },
      {
        name: "description",
        content:
          "Acompanhe o desafio de 24 dias do ForgeFit e marque cada dia concluído no seu ritmo.",
      },
      { property: "og:title", content: "Desafio 24 dias — FORGEFIT" },
      {
        property: "og:description",
        content: "Conteúdo diário do desafio, com progresso salvo no navegador.",
      },
    ],
  }),
  component: Desafio,
});

function Desafio() {
  const { state, toggleDesafio } = useForge();
  const [aberto, setAberto] = React.useState<DiaDesafio | null>(null);
  const concluidos = state.desafio.concluidos;

  return (
    <div>
      <PageHeader
        titulo="Desafio 24 dias"
        descricao="Continue no seu ritmo. Seu progresso fica salvo neste navegador."
      />

      <div className="card-surface mb-5 p-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium">
            {concluidos.length} de {TOTAL_DIAS_DESAFIO} dias concluídos
          </span>
          <Flame className="h-5 w-5 text-accent" aria-hidden />
        </div>
        <Progress value={(concluidos.length / TOTAL_DIAS_DESAFIO) * 100} />
        <Button
          className="mt-4"
          onClick={() => {
            const proximo =
              diasDesafio.find((d) => !concluidos.includes(d.dia)) ?? diasDesafio[0];
            if (proximo) setAberto(proximo);
          }}
        >
          Continuar do dia {state.desafio.ultimoDia}
        </Button>
      </div>

      <section className="mb-6">
        <h2 className="mb-3 font-display text-xl uppercase tracking-wide">
          Materiais do desafio
        </h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {materiaisPorCategoria("Desafio").map((m) => (
            <li key={m.id} className="card-surface flex flex-col gap-3 p-4">
              <img
                src={m.capaUrl}
                alt={`Capa do material ${m.nome}`}
                loading="lazy"
                className="h-40 w-full rounded-xl object-cover object-top"
              />
              <div className="flex-1">
                <p className="font-medium leading-snug">{m.nome}</p>
                <p className="text-sm text-muted-foreground">
                  PDF{m.paginas ? ` · ${m.paginas} páginas` : ""}
                </p>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="secondary" className="flex-1">
                  <a href={m.arquivoUrl} target="_blank" rel="noreferrer">
                    Visualizar
                  </a>
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => baixarArquivo(m.arquivoUrl, m.nome)}
                >
                  Baixar
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <ul className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-6">
        {diasDesafio.map((d) => {
          const feito = concluidos.includes(d.dia);
          return (
            <li key={d.dia}>
              <button
                type="button"
                onClick={() => setAberto(d)}
                className={cn(
                  "flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-2xl border transition-colors",
                  feito
                    ? "border-primary bg-primary/15 text-primary"
                    : d.publicado
                      ? "border-border bg-card hover:border-primary/40"
                      : "border-border bg-card/50 text-muted-foreground",
                )}
              >
                <span className="font-display text-2xl font-bold">{d.dia}</span>
                {feito ? (
                  <Check className="h-4 w-4" aria-label="Concluído" />
                ) : !d.publicado ? (
                  <Lock className="h-3.5 w-3.5" aria-label="Sem conteúdo ainda" />
                ) : (
                  <span className="text-[10px] uppercase">Dia</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <Dialog open={Boolean(aberto)} onOpenChange={(v) => !v && setAberto(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          {aberto ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex flex-wrap items-center gap-2 pr-6 text-left font-display text-2xl uppercase">
                  {aberto.titulo}
                  {aberto.exemplo ? <EtiquetaExemplo /> : null}
                </DialogTitle>
              </DialogHeader>

              {aberto.midiaUrl ? (
                <Thumbnail
                  src={aberto.midiaUrl}
                  alt={aberto.titulo}
                  className="aspect-video w-full rounded-xl"
                />
              ) : null}

              {aberto.descricao ? (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {aberto.descricao}
                </p>
              ) : (
                <p className="rounded-xl bg-elevated px-3 py-3 text-sm text-muted-foreground">
                  Próximo conteúdo disponível em breve.
                </p>
              )}

              <div className="grid gap-2 sm:grid-cols-2">
                <Button
                  variant={
                    state.desafio.concluidos.includes(aberto.dia) ? "secondary" : "default"
                  }
                  onClick={() => toggleDesafio(aberto.dia)}
                >
                  {state.desafio.concluidos.includes(aberto.dia)
                    ? "Desmarcar dia"
                    : "Marcar como concluído"}
                </Button>
                {aberto.arquivoUrl ? (
                  <Button
                    variant="outline"
                    onClick={() =>
                      baixarArquivo(aberto.arquivoUrl, `desafio-dia-${aberto.dia}`)
                    }
                  >
                    Baixar material
                  </Button>
                ) : null}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
