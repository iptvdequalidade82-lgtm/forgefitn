import * as React from "react";
import { Heart, Pause, Play, RotateCcw, Plus, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Exercicio } from "@/data/exercicios";
import { useForge } from "@/lib/store";
import { baixarArquivo } from "@/lib/download";
import { cn } from "@/lib/utils";
import { PlayerExecucao } from "./Media";
import { Chip, EtiquetaExemplo } from "./ui-bits";

export function ExerciseModal({
  exercicio,
  open,
  onOpenChange,
  onAdicionar,
}: {
  exercicio: Exercicio | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAdicionar: (ex: Exercicio) => void;
}) {
  const { isFavorito, toggleFavorito } = useForge();
  const [pausado, setPausado] = React.useState(false);
  const [chave, setChave] = React.useState(0);

  React.useEffect(() => {
    if (open) {
      setPausado(false);
      setChave((k) => k + 1);
    }
  }, [open, exercicio?.id]);

  if (!exercicio) return null;
  const favorito = isFavorito("exercicios", exercicio.id);

  const detalhes: Array<[string, string]> = [
    ["Grupo muscular", exercicio.grupoMuscularPrincipal],
    ["Músculos secundários", exercicio.gruposSecundarios.join(", ")],
    ["Equipamento", exercicio.equipamento],
    ["Nível", exercicio.nivel],
    ["Local", exercicio.local],
    ["Séries", exercicio.seriesPadrao],
    ["Repetições", exercicio.repeticoesPadrao],
    ["Duração", exercicio.duracaoPadrao],
    ["Descanso", exercicio.descansoPadrao],
  ].filter(([, v]) => Boolean(v)) as Array<[string, string]>;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex flex-wrap items-center gap-2 pr-6 text-left font-display text-2xl uppercase">
            {exercicio.nome}
            {exercicio.exemplo ? <EtiquetaExemplo /> : null}
          </DialogTitle>
        </DialogHeader>

        {/* O player só existe enquanto o modal está aberto */}
        {open ? (
          <PlayerExecucao
            fonte={{
              gifUrl: exercicio.gifUrl,
              videoUrl: exercicio.videoUrl,
              thumbnailUrl: exercicio.thumbnailUrl,
            }}
            nome={exercicio.nome}
            pausado={pausado}
            chaveReinicio={chave}
          />
        ) : null}

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => setPausado((p) => !p)}
          >
            {pausado ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            {pausado ? "Retomar" : "Pausar"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => {
              setPausado(false);
              setChave((k) => k + 1);
            }}
          >
            <RotateCcw className="h-4 w-4" /> Reiniciar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            aria-pressed={favorito}
            onClick={() => toggleFavorito("exercicios", exercicio.id)}
          >
            <Heart className={cn("h-4 w-4", favorito && "fill-accent text-accent")} />
            {favorito ? "Favoritado" : "Favoritar"}
          </Button>
        </div>

        {detalhes.length ? (
          <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {detalhes.map(([label, valor]) => (
              <div key={label} className="rounded-xl bg-elevated px-3 py-2">
                <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  {label}
                </dt>
                <dd className="text-sm font-medium">{valor}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {exercicio.descricao ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {exercicio.descricao}
          </p>
        ) : null}

        {exercicio.tags.length ? (
          <div className="flex flex-wrap gap-1.5">
            {exercicio.tags.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        ) : null}

        <div className="grid gap-2 sm:grid-cols-2">
          <Button className="gap-1.5" onClick={() => onAdicionar(exercicio)}>
            <Plus className="h-4 w-4" /> Adicionar ao cronograma
          </Button>
          <Button
            variant="outline"
            className="gap-1.5"
            onClick={() =>
              baixarArquivo(
                exercicio.arquivoDownloadUrl || exercicio.videoUrl || exercicio.gifUrl,
                exercicio.slug,
              )
            }
          >
            <Download className="h-4 w-4" /> Baixar exercício
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
