import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarDays,
  Dumbbell,
  Flame,
  FileSpreadsheet,
  UtensilsCrossed,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DIAS, DIAS_CURTOS, useForge } from "@/lib/store";
import { categorias } from "@/data/categorias";
import { exercicios } from "@/data/exercicios";
import { TOTAL_DIAS_DESAFIO } from "@/data/desafio";
import { Logo } from "@/components/forge/Logo";
import { Chip, EmptyState } from "@/components/forge/ui-bits";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Início — FORGEFIT" },
      {
        name: "description",
        content:
          "Seu painel ForgeFit: treino de hoje, resumo da semana, treinos recomendados, execuções e receitas.",
      },
      { property: "og:title", content: "Início — FORGEFIT" },
      {
        property: "og:description",
        content: "Painel ForgeFit com treino de hoje, semana e atalhos de conteúdo.",
      },
    ],
  }),
  component: Inicio,
});

function hojeIndex() {
  const js = new Date().getDay(); // 0 = domingo
  return js === 0 ? 7 : js;
}

function Inicio() {
  const { state, hidratado } = useForge();
  const hoje = hojeIndex();
  const diaHoje = state.cronograma[hoje];
  const semanaVazia = Object.values(state.cronograma).every((d) => d.itens.length === 0);
  const diasMarcados = Object.values(state.cronograma).filter((d) => d.concluido).length;

  const recentes = Object.entries(state.cronograma)
    .flatMap(([, d]) => d.itens)
    .slice(-4)
    .reverse()
    .map((i) => exercicios.find((e) => e.id === i.exercicioId))
    .filter(Boolean);

  return (
    <div className="space-y-6">
      <section>
        <div className="hidden lg:block">
          <Logo />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Bem-vindo de volta</p>
        <h1 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
          Vamos treinar hoje
        </h1>
      </section>

      {/* Treino de hoje */}
      <section className="card-surface p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="font-display text-xl font-semibold uppercase">Seu treino de hoje</h2>
          <Chip className="bg-primary/15 text-primary">{DIAS[hoje - 1]}</Chip>
        </div>

        {!hidratado ? (
          <div className="h-20 animate-pulse rounded-xl bg-elevated" />
        ) : diaHoje && diaHoje.itens.length > 0 ? (
          <>
            <ul className="mb-4 space-y-1.5">
              {diaHoje.itens.slice(0, 4).map((item) => {
                const ex = exercicios.find((e) => e.id === item.exercicioId);
                return (
                  <li
                    key={item.uid}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2
                      className={cn(
                        "h-4 w-4 shrink-0",
                        item.concluido ? "text-primary" : "text-muted-foreground/40",
                      )}
                    />
                    <span className="truncate text-foreground">{ex?.nome ?? "Exercício"}</span>
                    {item.series || item.repeticoes ? (
                      <span className="shrink-0">
                        {item.series && `${item.series}x`}
                        {item.repeticoes}
                      </span>
                    ) : null}
                  </li>
                );
              })}
              {diaHoje.itens.length > 4 ? (
                <li className="text-sm text-muted-foreground">
                  + {diaHoje.itens.length - 4} exercício(s)
                </li>
              ) : null}
            </ul>
            <Button asChild className="gap-1.5">
              <Link to="/planejar">
                Abrir meu cronograma <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </>
        ) : semanaVazia ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Seu cronograma ainda está vazio.</p>
            <Button asChild>
              <Link to="/planilhas">Escolher um treino</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Nenhum exercício planejado para hoje.</p>
            <Button asChild variant="outline">
              <Link to="/planejar">Abrir meu cronograma</Link>
            </Button>
          </div>
        )}
      </section>

      {/* Resumo da semana */}
      <section className="card-surface p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="font-display text-xl font-semibold uppercase">Sua semana</h2>
          <span className="text-xs text-muted-foreground">{diasMarcados} de 7 dias marcados</span>
        </div>
        <ul className="grid grid-cols-7 gap-1.5">
          {DIAS_CURTOS.map((label, i) => {
            const dia = state.cronograma[i + 1];
            const temItens = (dia?.itens.length ?? 0) > 0;
            return (
              <li key={label}>
                <Link
                  to="/planejar"
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl border border-border px-1 py-2.5 text-[11px] font-medium transition-colors",
                    dia?.concluido
                      ? "border-primary/40 bg-primary/15 text-primary"
                      : temItens
                        ? "bg-elevated text-foreground"
                        : "text-muted-foreground",
                    i + 1 === hoje && "ring-1 ring-primary/50",
                  )}
                >
                  <span>{label}</span>
                  <span className="text-[10px] opacity-70">
                    {temItens ? `${dia?.itens.length}` : "—"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Atalhos */}
      <section className="grid gap-3 sm:grid-cols-3">
        <AtalhoCard
          to="/desafio"
          icone={<Flame className="h-5 w-5" />}
          titulo="Desafio 24 dias"
          descricao={`${state.desafio.concluidos.length}/${TOTAL_DIAS_DESAFIO} concluídos`}
        />
        <AtalhoCard
          to="/planilhas"
          icone={<FileSpreadsheet className="h-5 w-5" />}
          titulo="Treinos"
          descricao="Recomendações personalizáveis"
        />
        <AtalhoCard
          to="/receitas"
          icone={<UtensilsCrossed className="h-5 w-5" />}
          titulo="Receitas"
          descricao="Ideias de refeições"
        />
      </section>

      {/* Categorias */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold uppercase">Execuções por região</h2>
          <Link to="/exercicios" className="text-sm text-primary hover:underline">
            Ver todas
          </Link>
        </div>
        <ul className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categorias.slice(0, 8).map((c) => (
            <li key={c.id}>
              <Link
                to="/exercicios"
                search={{ categoria: c.slug }}
                className="flex min-w-[104px] flex-col items-center gap-1 rounded-2xl border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-primary/50"
              >
                <span aria-hidden className="text-xl">
                  {c.icone}
                </span>
                <span className="whitespace-nowrap font-medium">{c.nome}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Recentes */}
      <section>
        <h2 className="mb-3 font-display text-xl font-semibold uppercase">
          Adicionados recentemente
        </h2>
        {recentes.length ? (
          <ul className="space-y-2">
            {recentes.map((ex, i) => (
              <li key={`${ex!.id}-${i}`} className="card-surface flex items-center gap-3 p-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-elevated">
                  <Dumbbell className="h-4 w-4 text-primary" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{ex!.nome}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {ex!.grupoMuscularPrincipal}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            titulo="Nada por aqui ainda"
            descricao="Os exercícios que você adicionar ao cronograma aparecem nesta lista."
            icone={<Dumbbell className="h-7 w-7" />}
            acao={
              <Button asChild>
                <Link to="/exercicios">Ver execuções</Link>
              </Button>
            }
          />
        )}
      </section>

      <div className="pb-2">
        <Button asChild variant="outline" className="w-full gap-2 sm:w-auto">
          <Link to="/exercicios">
            <CalendarDays className="h-4 w-4" /> Consultar execuções
          </Link>
        </Button>
      </div>
    </div>
  );
}

function AtalhoCard({
  to,
  icone,
  titulo,
  descricao,
}: {
  to: string;
  icone: React.ReactNode;
  titulo: string;
  descricao: string;
}) {
  return (
    <Link
      to={to}
      className="card-surface flex items-center gap-3 p-4 transition-colors hover:border-primary/40"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
        {icone}
      </span>
      <span className="min-w-0">
        <span className="block truncate font-display text-base font-semibold uppercase">
          {titulo}
        </span>
        <span className="block truncate text-xs text-muted-foreground">{descricao}</span>
      </span>
    </Link>
  );
}
