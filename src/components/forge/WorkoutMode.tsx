import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
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
import { exercicios } from "@/data/exercicios";
import type { ItemCronograma } from "@/lib/store";
import { PlayerExecucao } from "./Media";

export function WorkoutMode({
  open,
  itens,
  nomeDia,
  onOpenChange,
  onToggleItem,
  onFinalizar,
}: {
  open: boolean;
  itens: ItemCronograma[];
  nomeDia: string;
  onOpenChange: (v: boolean) => void;
  onToggleItem: (uid: string, valor: boolean) => void;
  onFinalizar: () => void;
}) {
  const [idx, setIdx] = React.useState(0);
  const [confirmarSaida, setConfirmarSaida] = React.useState(false);

  React.useEffect(() => {
    if (open) setIdx(0);
  }, [open]);

  const item = itens[idx];
  const ex = item ? exercicios.find((e) => e.id === item.exercicioId) : undefined;
  const feitos = itens.filter((i) => i.concluido).length;

  if (!open || !item) return null;

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(v) => {
          if (!v) setConfirmarSaida(true);
        }}
      >
        <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-2xl">
          <div className="flex items-center justify-between gap-3 pr-6">
            <DialogTitle className="font-display text-xl uppercase">
              Modo treino — {nomeDia}
            </DialogTitle>
          </div>

          <div className="space-y-1">
            <Progress value={(feitos / itens.length) * 100} />
            <p className="text-xs text-muted-foreground">
              {feitos} de {itens.length} concluídos · exercício {idx + 1} de{" "}
              {itens.length}
            </p>
          </div>

          <PlayerExecucao
            fonte={{
              gifUrl: ex?.gifUrl,
              videoUrl: ex?.videoUrl,
              thumbnailUrl: ex?.thumbnailUrl,
            }}
            nome={ex?.nome ?? "Exercício"}
            pausado={false}
            chaveReinicio={idx}
          />

          <div>
            <h3 className="font-display text-2xl font-semibold uppercase">
              {ex?.nome ?? "Exercício"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {[
                item.series && `${item.series} séries`,
                item.repeticoes && `${item.repeticoes} repetições`,
                item.duracao && item.duracao,
                item.descanso && `descanso ${item.descanso}`,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
            {item.observacao ? (
              <p className="mt-2 rounded-xl bg-elevated px-3 py-2 text-sm">
                {item.observacao}
              </p>
            ) : null}
          </div>

          <label className="flex items-center gap-3 rounded-xl bg-elevated px-3 py-3 text-sm">
            <Checkbox
              checked={item.concluido}
              onCheckedChange={(v) => onToggleItem(item.uid, Boolean(v))}
            />
            Marcar este exercício como concluído
          </label>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              disabled={idx === 0}
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              className="gap-1.5"
            >
              <ChevronLeft className="h-4 w-4" /> Anterior
            </Button>
            <Button
              disabled={idx >= itens.length - 1}
              onClick={() => setIdx((i) => Math.min(itens.length - 1, i + 1))}
              className="gap-1.5"
            >
              Próximo <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="secondary"
            onClick={() => {
              onFinalizar();
              onOpenChange(false);
            }}
          >
            Finalizar treino
          </Button>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmarSaida} onOpenChange={setConfirmarSaida}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sair do modo treino?</AlertDialogTitle>
            <AlertDialogDescription>
              Suas marcações ficam salvas. Você pode retomar quando quiser.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continuar treinando</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setConfirmarSaida(false);
                onOpenChange(false);
              }}
            >
              Sair
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
