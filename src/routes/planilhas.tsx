import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Download, FileSpreadsheet, Heart, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { planilhas as todas, type Planilha } from "@/data/planilhas";
import { exercicios } from "@/data/exercicios";
import { DIAS, useForge } from "@/lib/store";
import { PageHeader, Chip, EtiquetaExemplo, EmptyState } from "@/components/forge/ui-bits";
import { Thumbnail } from "@/components/forge/Media";
import { baixarArquivo } from "@/lib/download";
import { cn } from "@/lib/utils";
import { WorkoutBuilder } from "@/components/forge/WorkoutBuilder";

export const Route = createFileRoute("/planilhas")({
  head: () => ({
    meta: [
      { title: "Treinos recomendados — FORGEFIT" },
      {
        name: "description",
        content:
          "Escolha um treino recomendado, adapte exercícios e salve séries, repetições e descanso na sua semana.",
      },
      { property: "og:title", content: "Treinos recomendados — FORGEFIT" },
      {
        property: "og:description",
        content: "Cronogramas prontos para baixar ou aplicar na sua semana.",
      },
    ],
  }),
  component: Planilhas,
});

function Planilhas() {
  const forge = useForge();
  const [detalhe, setDetalhe] = React.useState<Planilha | null>(null);
  const [aplicar, setAplicar] = React.useState<Planilha | null>(null);
  const [montadorAberto, setMontadorAberto] = React.useState(false);

  const aplicarPlanilha = (p: Planilha) => {
    if (!p.estrutura?.length) {
      toast.error("Estrutura não definida", {
        description:
          "Esta planilha ainda não tem os dias mapeados. Envie as orientações das colunas.",
      });
      return;
    }
    p.estrutura.forEach((d) => {
      forge.limparDia(d.dia);
      d.exercicioIds.forEach((id) => {
        const ex = exercicios.find((e) => e.id === id);
        if (!ex) return;
        forge.adicionarAoDia(d.dia, {
          exercicioId: ex.id,
          series: ex.seriesPadrao,
          repeticoes: ex.repeticoesPadrao,
          duracao: ex.duracaoPadrao,
          descanso: ex.descansoPadrao,
          observacao: "",
        });
      });
    });
    toast.success("Planilha aplicada ao seu cronograma");
    setAplicar(null);
    setDetalhe(null);
  };

  return (
    <div>
      <PageHeader
        titulo="Treinos"
        descricao="Escolha uma recomendação, confira os movimentos e salve tudo no dia certo."
      />

      <section className="mb-6 grid gap-4 border-y border-border py-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <div className="mb-1 flex items-center gap-2 text-primary">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase">Comece por aqui</span>
          </div>
          <h2 className="font-display text-2xl uppercase">Monte seu treino passo a passo</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Escolha a região do corpo, use o modelo como está ou faça alterações. Depois, salve no
            dia da semana desejado.
          </p>
        </div>
        <Button className="gap-2" onClick={() => setMontadorAberto(true)}>
          <Sparkles className="h-4 w-4" /> Montar meu treino
        </Button>
      </section>

      <div className="mb-3">
        <h2 className="font-display text-2xl font-semibold uppercase">Materiais de apoio</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Consulte ou baixe as fichas originais. Para usar no dia a dia, prefira o montador acima.
        </p>
      </div>

      {todas.length === 0 ? (
        <EmptyState
          titulo="Nenhuma planilha ainda"
          icone={<FileSpreadsheet className="h-7 w-7" />}
        />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {todas.map((p) => {
            const fav = forge.isFavorito("planilhas", p.id);
            return (
              <li key={p.id}>
                <article className="card-surface flex h-full flex-col overflow-hidden">
                  <div className="relative">
                    <Thumbnail
                      src={p.capaUrl}
                      alt={p.nome}
                      className="aspect-[16/9] w-full"
                      fallbackIcone={<FileSpreadsheet className="h-7 w-7" />}
                    />
                    <button
                      type="button"
                      aria-pressed={fav}
                      aria-label={fav ? "Remover dos favoritos" : "Favoritar planilha"}
                      onClick={() => forge.toggleFavorito("planilhas", p.id)}
                      className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-background/80 backdrop-blur"
                    >
                      <Heart
                        className={cn("h-[18px] w-[18px]", fav && "fill-accent text-accent")}
                      />
                    </button>
                    {p.exemplo ? <EtiquetaExemplo className="absolute left-2 top-2" /> : null}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <h3 className="font-display text-xl font-semibold uppercase leading-tight">
                      {p.nome}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {p.objetivo ? <Chip>{p.objetivo}</Chip> : null}
                      {p.nivel ? <Chip>{p.nivel}</Chip> : null}
                      {p.local ? <Chip>{p.local}</Chip> : null}
                      {p.quantidadeDias ? <Chip>{p.quantidadeDias} dias</Chip> : null}
                      {p.arquivoTipo ? (
                        <Chip className="bg-primary/15 text-primary">{p.arquivoTipo}</Chip>
                      ) : null}
                    </div>
                    {p.descricao ? (
                      <p className="text-sm text-muted-foreground">{p.descricao}</p>
                    ) : null}
                    <div className="mt-auto grid gap-2 pt-2">
                      <Button size="sm" className="gap-1.5" onClick={() => setMontadorAberto(true)}>
                        <Sparkles className="h-4 w-4" /> Montar treino interativo
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5"
                        onClick={() => setDetalhe(p)}
                      >
                        <Eye className="h-4 w-4" /> Ver material original
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1.5"
                        onClick={() => baixarArquivo(p.arquivoUrl, p.slug)}
                      >
                        <Download className="h-4 w-4" /> Baixar arquivo
                      </Button>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}

      <Dialog open={Boolean(detalhe)} onOpenChange={(v) => !v && setDetalhe(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          {detalhe ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex flex-wrap items-center gap-2 pr-6 text-left font-display text-2xl uppercase">
                  {detalhe.nome}
                  {detalhe.exemplo ? <EtiquetaExemplo /> : null}
                </DialogTitle>
              </DialogHeader>
              {detalhe.arquivoUrl && detalhe.arquivoTipo === "PDF" ? (
                <iframe
                  src={detalhe.arquivoUrl}
                  title={detalhe.nome}
                  className="h-[60vh] w-full rounded-xl border border-border bg-white"
                />
              ) : detalhe.arquivoUrl && detalhe.arquivoTipo === "Imagem" ? (
                <Thumbnail
                  src={detalhe.arquivoUrl}
                  alt={detalhe.nome}
                  className="w-full rounded-xl"
                />
              ) : (
                <p className="rounded-xl bg-elevated px-3 py-3 text-sm text-muted-foreground">
                  Pré-visualização indisponível para este formato. Use o botão de download.
                </p>
              )}
              {detalhe.estrutura?.length ? (
                <div>
                  <h3 className="mb-2 font-display text-lg font-semibold uppercase">Estrutura</h3>
                  <ul className="space-y-1 text-sm">
                    {detalhe.estrutura.map((d) => (
                      <li key={d.dia} className="rounded-xl bg-elevated px-3 py-2">
                        <span className="font-medium">{DIAS[d.dia - 1]}: </span>
                        {d.exercicioIds
                          .map((id) => exercicios.find((e) => e.id === id)?.nome ?? id)
                          .join(", ")}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(aplicar)} onOpenChange={(v) => !v && setAplicar(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Aplicar esta planilha?</AlertDialogTitle>
            <AlertDialogDescription>
              Os dias usados por esta planilha serão substituídos no seu cronograma atual.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => aplicar && aplicarPlanilha(aplicar)}>
              Substituir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <WorkoutBuilder open={montadorAberto} onOpenChange={setMontadorAberto} />
    </div>
  );
}
