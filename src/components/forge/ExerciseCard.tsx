import { Heart, Dumbbell, Plus, Eye } from "lucide-react";
import type { Exercicio } from "@/data/exercicios";
import { useForge } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Thumbnail } from "./Media";
import { Chip, EtiquetaExemplo } from "./ui-bits";

export function ExerciseCard({
  exercicio,
  onVer,
  onAdicionar,
}: {
  exercicio: Exercicio;
  onVer: () => void;
  onAdicionar: () => void;
}) {
  const { isFavorito, toggleFavorito } = useForge();
  const favorito = isFavorito("exercicios", exercicio.id);

  return (
    <article className="card-surface group flex flex-col overflow-hidden">
      <div className="relative">
        <button
          type="button"
          onClick={onVer}
          className="block w-full"
          aria-label={`Ver execução de ${exercicio.nome}`}
        >
          <Thumbnail
            src={exercicio.thumbnailUrl}
            alt={exercicio.nome}
            className="aspect-[4/3] w-full"
            fallbackIcone={<Dumbbell className="h-7 w-7" aria-hidden />}
          />
        </button>
        <button
          type="button"
          onClick={() => toggleFavorito("exercicios", exercicio.id)}
          aria-pressed={favorito}
          aria-label={favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-background"
        >
          <Heart
            className={cn(
              "h-[18px] w-[18px]",
              favorito ? "fill-accent text-accent" : "text-foreground",
            )}
          />
        </button>
        {exercicio.exemplo ? (
          <EtiquetaExemplo className="absolute left-2 top-2" />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-2 font-display text-lg font-semibold uppercase leading-tight">
          {exercicio.nome}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          <Chip className="bg-primary/15 text-primary">
            {exercicio.grupoMuscularPrincipal}
          </Chip>
          {exercicio.equipamento ? <Chip>{exercicio.equipamento}</Chip> : null}
          {exercicio.nivel ? <Chip>{exercicio.nivel}</Chip> : null}
        </div>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
          <Button size="sm" onClick={onVer} className="gap-1.5">
            <Eye className="h-4 w-4" /> Ver execução
          </Button>
          <Button size="sm" variant="outline" onClick={onAdicionar} className="gap-1.5">
            <Plus className="h-4 w-4" /> Cronograma
          </Button>
        </div>
      </div>
    </article>
  );
}
