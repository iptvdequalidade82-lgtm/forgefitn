import * as React from "react";
import { Check, ChevronRight, Eye, RotateCcw, Sparkles, Wand2 } from "lucide-react";
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
import { ExerciseModal } from "./ExerciseModal";

type ItemEditavel = {
  focoId: string;
  exercicioId: string;
  series: string;
  repeticoes: string;
  descanso: string;
};

const criarItens = (focoId: string, ids: string[]): ItemEditavel[] =>
  ids.map((exercicioId) => ({
    focoId,
    exercicioId,
    series: "3 - 4",
    repeticoes: "10 - 12",
    descanso: "1 min",
  }));

const combinacoesSugeridas = [
  { nome: "Costas + Bíceps", focos: ["costas", "biceps"] },
  { nome: "Peito + Tríceps", focos: ["peito", "triceps"] },
  { nome: "Pernas", focos: ["pernas"] },
  { nome: "Ombros + Tríceps", focos: ["ombros", "triceps"] },
];

export function WorkoutBuilder({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const forge = useForge();
  const [focoIds, setFocoIds] = React.useState<string[]>([focosTreino[0]?.id ?? ""]);
  const [variacoes, setVariacoes] = React.useState<Record<string, number>>({});
  const [dia, setDia] = React.useState(1);
  const [itens, setItens] = React.useState<ItemEditavel[]>([]);
  const [modo, setModo] = React.useState<"padrao" | "personalizado">("padrao");
  const [confirmar, setConfirmar] = React.useState(false);
  const [execucaoId, setExecucaoId] = React.useState<string | null>(null);
  const focosSelecionados = focoIds
    .map((id) => focosTreino.find((item) => item.id === id))
    .filter((item): item is (typeof focosTreino)[number] => Boolean(item));
  const nomesFocos = focosSelecionados.map((item) => item.nome).join(" + ");

  const carregarModelo = React.useCallback(() => {
    setItens(
      focosSelecionados.flatMap((foco) => {
        const indice = variacoes[foco.id] ?? 0;
        const modelo = foco.variacoes[indice] ?? foco.variacoes[0];
        return criarItens(foco.id, modelo?.exercicioIds ?? []);
      }),
    );
    setModo("padrao");
  }, [focosSelecionados, variacoes]);

  React.useEffect(() => {
    if (open) carregarModelo();
  }, [open, carregarModelo]);

  if (focosSelecionados.length === 0) return null;

  const selecionarFoco = (id: string) => {
    setFocoIds((atuais) => {
      if (atuais.includes(id)) {
        if (atuais.length === 1) {
          toast.info("Escolha pelo menos uma região do corpo");
          return atuais;
        }
        return atuais.filter((item) => item !== id);
      }
      if (atuais.length === 2) {
        toast.info("Você pode combinar até duas regiões por treino");
        return atuais;
      }
      return [...atuais, id];
    });
  };

  const atualizar = (indice: number, patch: Partial<ItemEditavel>) =>
    setItens((atuais) => atuais.map((item, i) => (i === indice ? { ...item, ...patch } : item)));

  const aplicar = () => {
    forge.limparDia(dia);
    itens.forEach((item) => {
      forge.adicionarAoDia(dia, {
        ...item,
        duracao: "",
        observacao: `${modo === "padrao" ? "Recomendação FORGEFIT" : "Treino personalizado"} — ${nomesFocos}`,
      });
    });
    setConfirmar(false);
    onOpenChange(false);
    toast.success(`Treino de ${nomesFocos} adicionado em ${DIAS[dia - 1]}`);
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
            <DialogTitle className="flex flex-wrap items-center gap-2 pr-7 font-display text-2xl uppercase sm:text-3xl">
              <Sparkles className="h-5 w-5 text-primary" aria-hidden />
              Recomendação FORGEFIT
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Escolha uma ou duas regiões, siga a combinação recomendada ou personalize cada
              exercício antes de salvar.
            </p>
          </DialogHeader>

          <section aria-labelledby="foco-titulo">
            <h3 id="foco-titulo" className="mb-2 text-sm font-semibold">
               1. Escolha sua rotina
            </h3>
             <p className="mb-3 text-xs text-muted-foreground">
               Comece por uma sugestão da FORGEFIT ou escolha até duas regiões do corpo.
             </p>
             <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
               {combinacoesSugeridas.map((combinacao) => {
                 const ativa =
                   combinacao.focos.length === focoIds.length &&
                   combinacao.focos.every((id) => focoIds.includes(id));
                 return (
                   <Button
                     key={combinacao.nome}
                     type="button"
                     variant={ativa ? "secondary" : "outline"}
                     className="h-auto min-h-12 whitespace-normal px-3 py-2"
                     onClick={() => {
                       setFocoIds(combinacao.focos);
                       setVariacoes({});
                     }}
                   >
                     <Sparkles className="h-4 w-4 shrink-0" /> {combinacao.nome}
                   </Button>
                 );
               })}
             </div>
             <p className="mb-2 text-xs font-medium">Ou monte sua combinação</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {focosTreino.map((item) => (
                <Button
                  key={item.id}
                   type="button"
                   aria-pressed={focoIds.includes(item.id)}
                   variant={focoIds.includes(item.id) ? "default" : "outline"}
                  className="h-auto min-h-11 justify-between px-3 py-2"
                   onClick={() => selecionarFoco(item.id)}
                >
                  {item.nome}
                   {focoIds.includes(item.id) ? <Check className="h-4 w-4" /> : null}
                </Button>
              ))}
            </div>
             <p className="mt-2 text-sm font-medium text-primary">Selecionado: {nomesFocos}</p>
          </section>

          <section aria-labelledby="modelo-titulo">
             <div className="mb-2 flex items-end justify-between gap-3">
              <div>
                <h3 id="modelo-titulo" className="text-sm font-semibold">
                   2. Escolha o modelo de cada região
                </h3>
                 <p className="text-xs text-muted-foreground">
                   Cada região tem duas sequências preparadas pela FORGEFIT.
                 </p>
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
             <div className="space-y-3">
               {focosSelecionados.map((foco) => (
                 <div key={foco.id} className="rounded-lg border border-border p-3">
                   <p className="mb-2 font-medium">{foco.nome}</p>
                   <div className="grid grid-cols-2 gap-2">
                     {foco.variacoes.map((item, indice) => (
                       <Button
                         key={item.nome}
                         type="button"
                         variant={(variacoes[foco.id] ?? 0) === indice ? "secondary" : "outline"}
                         className="h-auto min-h-12 whitespace-normal px-3 py-2 text-left"
                         onClick={() =>
                           setVariacoes((atuais) => ({ ...atuais, [foco.id]: indice }))
                         }
                       >
                         {item.nome}
                       </Button>
                     ))}
                   </div>
                 </div>
               ))}
            </div>
          </section>

          <section
            aria-labelledby="modo-titulo"
            className="rounded-lg border border-border bg-elevated p-3"
          >
            <h3 id="modo-titulo" className="mb-2 text-sm font-semibold">
              3. Como você prefere usar este treino?
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={modo === "padrao" ? "default" : "outline"}
                className="h-auto min-h-11 justify-center gap-1.5 px-3 py-2"
                onClick={() => setModo("padrao")}
              >
                <Sparkles className="h-4 w-4" /> Usar como está
              </Button>
              <Button
                type="button"
                variant={modo === "personalizado" ? "default" : "outline"}
                className="h-auto min-h-11 justify-center gap-1.5 px-3 py-2"
                onClick={() => setModo("personalizado")}
              >
                <Wand2 className="h-4 w-4" /> Fazer alterações
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {modo === "padrao"
                ? "Você verá exatamente a ficha recomendada pela FORGEFIT para este foco."
                : "Troque qualquer exercício por uma alternativa da mesma região e ajuste séries, repetições e descanso."}
            </p>
          </section>

          <div className="rounded-lg border border-primary/25 bg-primary/10 px-3 py-3 text-sm">
            <div className="flex gap-2">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p>
                <strong>Antes do treino:</strong> confira a orientação da ficha e respeite seus
                limites. Se sentir dor, pare o exercício.
              </p>
            </div>
          </div>

          <section aria-labelledby="ajuste-titulo">
            <h3 id="ajuste-titulo" className="mb-2 text-sm font-semibold">
              4. Confira cada exercício
            </h3>
            <div className="space-y-2">
              {itens.map((item, indice) => {
                const ex = exercicios.find((e) => e.id === item.exercicioId);
                 const focoDoItem = focosTreino.find((foco) => foco.id === item.focoId);
                 const alternativas = exercicios.filter(
                   (alternativa) =>
                     alternativa.publicado &&
                     (alternativa.categoria === focoDoItem?.categoria ||
                       (focoDoItem?.id === "gluteos" && alternativa.categoria === "pernas")),
                 );
                const personalizando = modo === "personalizado";
                return (
                  <article
                    key={`${indice}-${item.exercicioId}`}
                    className="grid gap-3 rounded-lg border border-border bg-elevated p-3 sm:grid-cols-[96px_1fr]"
                  >
                    {/* GIF ao vivo do exercício selecionado — troca junto com a seleção abaixo */}
                    <img
                      key={item.exercicioId}
                      src={ex?.gifUrl || ex?.thumbnailUrl || ""}
                      alt={`Execução: ${ex?.nome ?? "Exercício"}`}
                      loading="lazy"
                      className="aspect-square w-24 rounded-md bg-black object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                     <div className="min-w-0 space-y-3">
                       <p className="text-xs font-semibold uppercase text-primary">
                         {focoDoItem?.nome}
                       </p>
                      {personalizando ? (
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
                      ) : (
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-medium">{ex?.nome ?? "Exercício"}</p>
                          <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                            Recomendação FORGEFIT
                          </span>
                        </div>
                      )}
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="gap-1.5"
                        onClick={() => setExecucaoId(item.exercicioId)}
                      >
                        <Eye className="h-4 w-4" /> Ver como fazer
                      </Button>
                      <div className="grid gap-2 sm:grid-cols-3">
                        <Campo
                          label="Séries"
                          value={item.series}
                          onChange={(value) => atualizar(indice, { series: value })}
                          somenteLeitura={!personalizando}
                        />
                        <Campo
                          label="Repetições"
                          value={item.repeticoes}
                          onChange={(value) => atualizar(indice, { repeticoes: value })}
                          somenteLeitura={!personalizando}
                        />
                        <Campo
                          label="Descanso"
                          value={item.descanso}
                          onChange={(value) => atualizar(indice, { descanso: value })}
                          somenteLeitura={!personalizando}
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
                5. Escolha o dia da semana
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
              Salvar no meu treino <ChevronRight className="h-4 w-4" />
            </Button>
          </section>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmar} onOpenChange={setConfirmar}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Substituir o treino de {DIAS[dia - 1]}?</AlertDialogTitle>
            <AlertDialogDescription>
               Esse dia já tem exercícios. O treino atual será trocado pela nova rotina de {nomesFocos}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={aplicar}>Substituir treino</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <ExerciseModal
        exercicio={exercicios.find((item) => item.id === execucaoId) ?? null}
        open={Boolean(execucaoId)}
        onOpenChange={(aberto) => !aberto && setExecucaoId(null)}
      />
    </>
  );
}

function Campo({
  label,
  value,
  onChange,
  somenteLeitura,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  somenteLeitura?: boolean;
}) {
  const id = React.useId();
  return (
    <label htmlFor={id} className="min-w-0 text-xs text-muted-foreground">
      {label}
      <Input
        id={id}
        value={value}
        readOnly={somenteLeitura}
        aria-readonly={somenteLeitura}
        onChange={(event) => onChange(event.target.value)}
        placeholder={
          label === "Séries" ? "Ex.: 3" : label === "Repetições" ? "Ex.: 10" : "Ex.: 60 s"
        }
        className={cn(
          "mt-1 h-9 bg-background px-2 text-foreground",
          label === "Repetições" && "text-xs sm:text-sm",
          somenteLeitura && "cursor-default opacity-80",
        )}
      />
    </label>
  );
}
