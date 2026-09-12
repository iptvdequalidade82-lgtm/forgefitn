import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  ArrowDown,
  ArrowUp,
  Copy,
  Eraser,
  Play,
  Plus,
  Printer,
  Search,
  Trash2,
  Upload,
  Download,
  CopyPlus,
  GripVertical,
  Eye,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DIAS, DIAS_CURTOS, useForge } from "@/lib/store";
import { exercicios } from "@/data/exercicios";
import { categorias } from "@/data/categorias";
import { receitas } from "@/data/receitas";
import { PageHeader, EmptyState, Chip } from "@/components/forge/ui-bits";
import { WorkoutMode } from "@/components/forge/WorkoutMode";
import { WorkoutBuilder } from "@/components/forge/WorkoutBuilder";
import { ExerciseModal } from "@/components/forge/ExerciseModal";
import type { Exercicio } from "@/data/exercicios";
import { baixarJson } from "@/lib/download";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/planejar")({
  head: () => ({
    meta: [
      { title: "Meu cronograma — FORGEFIT" },
      {
        name: "description",
        content:
          "Monte seu cronograma semanal de treinos: adicione exercícios, defina séries, repetições e descanso.",
      },
      { property: "og:title", content: "Meu cronograma — FORGEFIT" },
      {
        property: "og:description",
        content: "Planejador semanal de treinos salvo no seu navegador.",
      },
    ],
  }),
  component: Planejar,
});

const TODOS = "__todos";

function Planejar() {
  const forge = useForge();
  const { state } = forge;
  const [dia, setDia] = React.useState(1);
  const [seletorAberto, setSeletorAberto] = React.useState(false);
  const [copiarAberto, setCopiarAberto] = React.useState(false);
  const [limparAberto, setLimparAberto] = React.useState(false);
  const [treinoAberto, setTreinoAberto] = React.useState(false);
  const [montadorAberto, setMontadorAberto] = React.useState(false);
  const [execucao, setExecucao] = React.useState<Exercicio | null>(null);
  const [arrastando, setArrastando] = React.useState<number | null>(null);
  const inputImport = React.useRef<HTMLInputElement>(null);

  const diaAtual = state.cronograma[dia] ?? { itens: [], refeicoes: [], concluido: false };

  return (
    <div>
      <PageHeader
        titulo="Meu treino"
        descricao="Organize sua semana. As alterações são salvas automaticamente neste aparelho."
        acoes={
          <>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 no-print"
              onClick={() => window.print()}
            >
              <Printer className="h-4 w-4" /> Imprimir / PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 no-print"
              onClick={() =>
                baixarJson({ cronograma: state.cronograma }, "forgefit-cronograma.json")
              }
            >
              <Download className="h-4 w-4" /> Exportar
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 no-print"
              onClick={() => inputImport.current?.click()}
            >
              <Upload className="h-4 w-4" /> Importar
            </Button>
          </>
        }
      />

      <section className="no-print mb-5 grid gap-3 border-y border-border py-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <h2 className="font-display text-xl font-semibold uppercase">
            Precisa de ajuda para começar?
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Escolha um treino recomendado e salve todos os exercícios de uma vez.
          </p>
        </div>
        <Button className="gap-2" onClick={() => setMontadorAberto(true)}>
          <Sparkles className="h-4 w-4" /> Escolher treino recomendado
        </Button>
      </section>

      <input
        ref={inputImport}
        type="file"
        accept="application/json"
        className="hidden"
        aria-hidden
        onChange={async (e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;
          try {
            const dados = JSON.parse(await file.text());
            const cron = dados?.cronograma ?? dados?.state?.cronograma;
            if (!cron) throw new Error("formato");
            forge.setState((s) => ({ ...s, cronograma: cron }));
            toast.success("Cronograma importado");
          } catch {
            toast.error("Falha ao importar", {
              description: "O arquivo não parece ser um backup válido do ForgeFit.",
            });
          }
        }}
      />

      {/* Seletor de dias */}
      <div className="no-print mb-4 flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {DIAS_CURTOS.map((label, i) => {
          const d = state.cronograma[i + 1];
          return (
            <button
              key={label}
              type="button"
              onClick={() => setDia(i + 1)}
              aria-pressed={dia === i + 1}
              className={cn(
                "min-w-[74px] rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors",
                dia === i + 1
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="block">{label}</span>
              <span className="block text-[10px] opacity-80">
                {d?.itens.length ? `${d.itens.length} ex.` : "vazio"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="card-surface print-area p-4 sm:p-5">
        <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
          <h2 className="truncate font-display text-2xl font-semibold uppercase">
            {DIAS[dia - 1]}
          </h2>
          <label className="flex shrink-0 items-center gap-2 text-sm no-print">
            <Checkbox
              checked={diaAtual.concluido}
              onCheckedChange={(v) => forge.marcarDiaConcluido(dia, Boolean(v))}
            />
            Treino concluído
          </label>
        </div>

        <div className="no-print mb-4 flex flex-wrap gap-2">
          <Button size="sm" className="gap-1.5" onClick={() => setSeletorAberto(true)}>
            <Plus className="h-4 w-4" /> Adicionar exercício avulso
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5"
            disabled={diaAtual.itens.length === 0}
            onClick={() => setTreinoAberto(true)}
          >
            <Play className="h-4 w-4" /> Começar treino
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5"
            onClick={() => setCopiarAberto(true)}
          >
            <Copy className="h-4 w-4" /> Copiar dia
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5"
            onClick={() => {
              forge.duplicarSemana(dia);
              toast.success("Semana duplicada a partir deste dia");
            }}
          >
            <CopyPlus className="h-4 w-4" /> Duplicar semana
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="gap-1.5 text-destructive"
            onClick={() => setLimparAberto(true)}
          >
            <Eraser className="h-4 w-4" /> Limpar dia
          </Button>
        </div>

        {diaAtual.itens.length === 0 ? (
          <EmptyState
            titulo="Dia vazio"
            descricao="Use um treino recomendado acima ou adicione um exercício avulso."
            acao={
              <Button className="no-print" onClick={() => setSeletorAberto(true)}>
                Adicionar exercício avulso
              </Button>
            }
          />
        ) : (
          <ul className="space-y-3">
            {diaAtual.itens.map((item, index) => {
              const ex = exercicios.find((e) => e.id === item.exercicioId);
              return (
                <li
                  key={item.uid}
                  draggable
                  onDragStart={() => setArrastando(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (arrastando !== null) forge.reordenarItens(dia, arrastando, index);
                    setArrastando(null);
                  }}
                  className="rounded-2xl border border-border bg-elevated/50 p-3"
                >
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                    <div className="flex min-w-0 items-start gap-2">
                      <GripVertical
                        className="mt-1 hidden h-4 w-4 shrink-0 cursor-grab text-muted-foreground lg:block no-print"
                        aria-hidden
                      />
                      <div className="min-w-0">
                        <p className="truncate font-medium">{ex?.nome ?? "Exercício removido"}</p>
                        {ex ? <Chip className="mt-1">{ex.grupoMuscularPrincipal}</Chip> : null}
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 no-print">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Ver execução de ${ex?.nome ?? "exercício"}`}
                        disabled={!ex}
                        onClick={() => ex && setExecucao(ex)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Mover para cima"
                        disabled={index === 0}
                        onClick={() => forge.moverItem(dia, item.uid, -1)}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Mover para baixo"
                        disabled={index === diaAtual.itens.length - 1}
                        onClick={() => forge.moverItem(dia, item.uid, 1)}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Remover exercício"
                        onClick={() => forge.removerItem(dia, item.uid)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <CampoItem
                      label="Séries"
                      valor={item.series}
                      onChange={(v) => forge.atualizarItem(dia, item.uid, { series: v })}
                    />
                    <CampoItem
                      label="Repetições"
                      valor={item.repeticoes}
                      onChange={(v) => forge.atualizarItem(dia, item.uid, { repeticoes: v })}
                    />
                    <CampoItem
                      label="Duração"
                      valor={item.duracao}
                      onChange={(v) => forge.atualizarItem(dia, item.uid, { duracao: v })}
                    />
                    <CampoItem
                      label="Descanso"
                      valor={item.descanso}
                      onChange={(v) => forge.atualizarItem(dia, item.uid, { descanso: v })}
                    />
                  </div>

                  <div className="mt-2">
                    <Label
                      htmlFor={`obs-${item.uid}`}
                      className="mb-1 block text-[11px] uppercase tracking-wide text-muted-foreground"
                    >
                      Observação
                    </Label>
                    <Input
                      id={`obs-${item.uid}`}
                      value={item.observacao}
                      onChange={(e) =>
                        forge.atualizarItem(dia, item.uid, { observacao: e.target.value })
                      }
                      placeholder="Opcional"
                    />
                  </div>

                  <label className="mt-3 flex items-center gap-2 text-sm no-print">
                    <Checkbox
                      checked={item.concluido}
                      onCheckedChange={(v) =>
                        forge.atualizarItem(dia, item.uid, { concluido: Boolean(v) })
                      }
                    />
                    Exercício concluído
                  </label>
                </li>
              );
            })}
          </ul>
        )}

        {/* Refeições planejadas */}
        {diaAtual.refeicoes.length > 0 ? (
          <div className="mt-6">
            <h3 className="mb-2 font-display text-lg font-semibold uppercase">Refeições do dia</h3>
            <ul className="space-y-2">
              {diaAtual.refeicoes.map((r) => {
                const rec = receitas.find((x) => x.id === r.receitaId);
                return (
                  <li
                    key={r.uid}
                    className="flex items-center justify-between gap-3 rounded-xl bg-elevated px-3 py-2 text-sm"
                  >
                    <span className="min-w-0 truncate">
                      <span className="text-muted-foreground">{r.refeicao}: </span>
                      {rec?.nome ?? "Receita"}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Remover refeição"
                      className="no-print"
                      onClick={() => forge.removerRefeicao(dia, r.uid)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground no-print">
        Cronograma salvo neste dispositivo.
      </p>

      <SeletorExercicios
        open={seletorAberto}
        onOpenChange={setSeletorAberto}
        onEscolher={(id) => {
          const ex = exercicios.find((e) => e.id === id);
          if (!ex) return;
          forge.adicionarAoDia(dia, {
            exercicioId: ex.id,
            series: ex.seriesPadrao,
            repeticoes: ex.repeticoesPadrao,
            duracao: ex.duracaoPadrao,
            descanso: ex.descansoPadrao,
            observacao: "",
          });
          toast.success(`${ex.nome} adicionado em ${DIAS[dia - 1]}`);
        }}
      />

      <Dialog open={copiarAberto} onOpenChange={setCopiarAberto}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl uppercase">
              Copiar {DIAS[dia - 1]} para
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-2">
            {DIAS.map((nome, i) => (
              <Button
                key={nome}
                variant="outline"
                disabled={i + 1 === dia}
                onClick={() => {
                  forge.copiarDia(dia, i + 1);
                  setCopiarAberto(false);
                  toast.success(`Copiado para ${nome}`);
                }}
              >
                {nome}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={limparAberto} onOpenChange={setLimparAberto}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Limpar {DIAS[dia - 1]}?</AlertDialogTitle>
            <AlertDialogDescription>
              Todos os exercícios e refeições deste dia serão removidos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                forge.limparDia(dia);
                toast.success("Dia limpo");
              }}
            >
              Limpar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <WorkoutMode
        open={treinoAberto}
        itens={diaAtual.itens}
        nomeDia={DIAS[dia - 1] ?? ""}
        onOpenChange={setTreinoAberto}
        onToggleItem={(uid, valor) => forge.atualizarItem(dia, uid, { concluido: valor })}
        onFinalizar={() => {
          forge.marcarDiaConcluido(dia, true);
          toast.success("Treino finalizado");
        }}
      />
      <WorkoutBuilder open={montadorAberto} onOpenChange={setMontadorAberto} />
      <ExerciseModal
        exercicio={execucao}
        open={Boolean(execucao)}
        onOpenChange={(aberto) => !aberto && setExecucao(null)}
      />
    </div>
  );
}

function CampoItem({
  label,
  valor,
  onChange,
}: {
  label: string;
  valor: string;
  onChange: (v: string) => void;
}) {
  const id = React.useId();
  return (
    <div>
      <Label
        htmlFor={id}
        className="mb-1 block text-[11px] uppercase tracking-wide text-muted-foreground"
      >
        {label}
      </Label>
      <Input
        id={id}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          label === "Séries"
            ? "Ex.: 3"
            : label === "Repetições"
              ? "Ex.: 10"
              : label === "Descanso"
                ? "Ex.: 60 s"
                : "Ex.: 30 s"
        }
      />
    </div>
  );
}

function SeletorExercicios({
  open,
  onOpenChange,
  onEscolher,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onEscolher: (id: string) => void;
}) {
  const [busca, setBusca] = React.useState("");
  const [categoria, setCategoria] = React.useState(TODOS);

  const lista = exercicios
    .filter((e) => e.publicado)
    .filter((e) => e.nome.toLowerCase().includes(busca.trim().toLowerCase()))
    .filter((e) => (categoria === TODOS ? true : e.categoria === categoria));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl uppercase">Adicionar exercício</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Label htmlFor="busca-seletor" className="sr-only">
            Pesquisar na biblioteca
          </Label>
          <Input
            id="busca-seletor"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Pesquisar na biblioteca"
            className="pl-9"
          />
        </div>
        <Select value={categoria} onValueChange={setCategoria}>
          <SelectTrigger aria-label="Filtrar por categoria">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TODOS}>Todas as categorias</SelectItem>
            {categorias.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>
                {c.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {lista.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Nenhum exercício encontrado.
          </p>
        ) : (
          <ul className="space-y-2">
            {lista.map((ex) => (
              <li key={ex.id}>
                <button
                  type="button"
                  onClick={() => onEscolher(ex.id)}
                  className="flex w-full items-center justify-between gap-3 rounded-xl border border-border px-3 py-2.5 text-left transition-colors hover:border-primary/50"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{ex.nome}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {ex.grupoMuscularPrincipal}
                    </span>
                  </span>
                  <Plus className="h-4 w-4 shrink-0 text-primary" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}
