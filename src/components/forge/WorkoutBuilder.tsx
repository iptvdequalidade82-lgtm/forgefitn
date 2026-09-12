import * as React from "react";
import { Check, ChevronRight, Dumbbell, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { focosTreino } from "@/data/treinos-personalizados";
import { DIAS, useForge } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Thumbnail } from "./Media";

type ItemEditavel = {
  exercicioId: string;
  series: string;
  repeticoes: string;
  descanso: string;
};

const criarItens = (ids: string[]): ItemEditavel[] =>
  ids.map((exercicioId) => ({
    exercicioId,
    series: "3 - 4",
    repeticoes: "10 - 12",
    descanso: "1 min",
  }));

export function WorkoutBuilder({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const forge = useForge();
  const [focoId, setFocoId] = React.useState(focosTreino[0]?.id ?? "");
  const [variacao, setVariacao] = React.useState(0);
  const [dia, setDia] = React.useState(1);
  const [itens, setItens] = React.useState<ItemEditavel[]>([]);
  const [confirmar, setConfirmar] = React.useState(false);
  const foco = focosTreino.find((item) => item.id === focoId) ?? focosTreino[0];
  const modelo = foco?.variacoes[variacao] ?? foco?.variacoes[0];

  const carregarModelo = React.useCallback(() => {
    setItens(criarItens(modelo?.exercicioIds ?? []));
  }, [modelo]);

  React.useEffect(() => {
    if (open) carregarModelo();
  }, [open, carregarModelo]);

  if (!foco || !modelo) return null;

  const alternativas = exercicios.filter(
    (ex) =>
      ex.publicado &&
      (ex.categoria === foco.categoria || (foco.id === "gluteos" && ex.categoria === "pernas")),
  );

  const atualizar = (indice: number, patch: Partial<ItemEditavel>) =>
    setItens((atuais) => atuais.map((item, i) => (i === indice ? { ...item, ...patch } : item)));

  const aplicar = () => {
    forge.limparDia(dia);
    itens.forEach((item) => {
      forge.adicionarAoDia(dia, {
        ...item,
        duracao: "",
        observacao: `Treino personalizado — ${foco.nome}`,
      });
    });
    setConfirmar(false);
    onOpenChange(false);
    toast.success(`Treino de ${foco.nome} adicionado em ${DIAS[dia - 1]}`);
  };

  const solicitarAplicacao = () => {
    if ((forge.state.cronograma[dia]?.itens.length ?? 0) > 0) setConfirmar(true);
    else aplicar();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[94vh] overflow-y-auto sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="pr-7 font-display text-2xl uppercase sm:text-3xl">
              Monte sua ficha personalizada
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Escolha um foco, ajuste o treino e salve no seu cronograma.
            </p>
          </DialogHeader>

          <section aria-labelledby="foco-titulo">
            <h3 id="foco-titulo" className="mb-2 text-sm font-semibold">
              1. Qual treino você quer fazer?
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {focosTreino.map((item) => (
                <Button
                  key={item.id}
                  variant={item.id === foco.id ? "default" : "outline"}
                  className="h-auto min-h-11 justify-between px-3 py-2"
                  onClick={() => {
                    setFocoId(item.id);
                    setVariacao(0);
                  }}
                >
                  {item.nome}
                  {item.id === foco.id ? <Check className="h-4 w-4" /> : null}
                </Button>
              ))}
            </div>
          </section>

          <section aria-labelledby="modelo-titulo">
            <div className="mb-2 flex items-end justify-between gap-3">
              <div>
                <h3 id="modelo-titulo" className="text-sm font-semibold">
                  2. Escolha uma variação
                </h3>
                <p className="text-xs text-muted-foreground">{foco.descricao}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="shrink-0 gap-1.5"
                onClick={carregarModelo}
              >
                <RotateCcw className="h-4 w-4" /> Restaurar
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {foco.variacoes.map((item, indice) => (
                <Button
                  key={item.nome}
                  variant={indice === variacao ? "secondary" : "outline"}
                  className="h-auto min-h-12 whitespace-normal px-3 py-2 text-left"
                  onClick={() => setVariacao(indice)}
                >
                  {item.nome}
                </Button>
              ))}
            </div>
          </section>

          <div className="rounded-lg border border-primary/25 bg-primary/10 px-3 py-3 text-sm">
            <div className="flex gap-2">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p>
                <strong>Antes do treino:</strong> faça 2–3 séries de alongamento do grupo, segurando
                por 30 segundos e descansando 30 segundos.
              </p>
            </div>
          </div>

          <section aria-labelledby="ajuste-titulo">
            <h3 id="ajuste-titulo" className="mb-2 text-sm font-semibold">
              3. Confira e ajuste os exercícios
            </h3>
            <div className="space-y-2">
              {itens.map((item, indice) => {
                const ex = exercicios.find((e) => e.id === item.exercicioId);
                return (
                  <article
                    key={`${indice}-${item.exercicioId}`}
                    className="grid gap-3 rounded-lg border border-border bg-elevated p-3 sm:grid-cols-[72px_1fr]"
                  >
                    <Thumbnail
                      src={ex?.thumbnailUrl}
                      alt={ex?.nome ?? "Exercício"}
                      className="aspect-square w-[72px] rounded-md"
                      fallbackIcone={<Dumbbell className="h-6 w-6" />}
                    />
                    <div className="min-w-0 space-y-3">
                      <Select
                        value={item.exercicioId}
                        onValueChange={(value) => atualizar(indice, { exercicioId: value })}
                      >
                        <SelectTrigger
                          aria-label={`Exercício ${indice + 1}`}
                          className="h-10 bg-background font-medium"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {alternativas.map((alternativa) => (
                            <SelectItem key={alternativa.id} value={alternativa.id}>
                              {alternativa.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="grid grid-cols-3 gap-2">
                        <Campo
                          label="Séries"
                          value={item.series}
                          onChange={(value) => atualizar(indice, { series: value })}
                        />
                        <Campo
                          label="Repetições"
                          value={item.repeticoes}
                          onChange={(value) => atualizar(indice, { repeticoes: value })}
                        />
                        <Campo
                          label="Descanso"
                          value={item.descanso}
                          onChange={(value) => atualizar(indice, { descanso: value })}
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section
            className="grid gap-3 border-t border-border pt-4 sm:grid-cols-[1fr_auto] sm:items-end"
            aria-labelledby="dia-titulo"
          >
            <div>
              <h3 id="dia-titulo" className="mb-2 text-sm font-semibold">
                4. Em qual dia?
              </h3>
              <Select value={String(dia)} onValueChange={(value) => setDia(Number(value))}>
                <SelectTrigger className="h-11 bg-elevated">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DIAS.map((nome, indice) => (
                    <SelectItem key={nome} value={String(indice + 1)}>
                      {nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button size="lg" className="gap-2" onClick={solicitarAplicacao}>
              Adicionar ao cronograma <ChevronRight className="h-4 w-4" />
            </Button>
          </section>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmar} onOpenChange={setConfirmar}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Substituir o treino de {DIAS[dia - 1]}?</AlertDialogTitle>
            <AlertDialogDescription>
              Esse dia já tem exercícios. O treino atual será trocado pela nova ficha de {foco.nome}
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={aplicar}>Substituir treino</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function Campo({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = React.useId();
  return (
    <label htmlFor={id} className="min-w-0 text-xs text-muted-foreground">
      {label}
      <Input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "mt-1 h-9 bg-background px-2 text-foreground",
          label === "Repetições" && "text-xs sm:text-sm",
        )}
      />
    </label>
  );
}
