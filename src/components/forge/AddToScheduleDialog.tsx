import * as React from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DIAS, useForge } from "@/lib/store";
import type { Exercicio } from "@/data/exercicios";

export function AddToScheduleDialog({
  exercicio,
  open,
  onOpenChange,
}: {
  exercicio: Exercicio | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { adicionarAoDia } = useForge();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl uppercase">
            Adicionar ao cronograma
          </DialogTitle>
          <DialogDescription>
            {exercicio ? `Escolha o dia para “${exercicio.nome}”.` : ""}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2">
          {DIAS.map((nome, i) => (
            <Button
              key={nome}
              variant="outline"
              className="justify-start"
              onClick={() => {
                if (!exercicio) return;
                adicionarAoDia(i + 1, {
                  exercicioId: exercicio.id,
                  series: exercicio.seriesPadrao,
                  repeticoes: exercicio.repeticoesPadrao,
                  duracao: exercicio.duracaoPadrao,
                  descanso: exercicio.descansoPadrao,
                  observacao: "",
                });
                onOpenChange(false);
                toast.success(`Adicionado em ${nome}`, {
                  description: "Cronograma salvo neste dispositivo.",
                });
              }}
            >
              {nome}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
