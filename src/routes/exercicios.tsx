import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { exercicios as todos, type Exercicio } from "@/data/exercicios";
import { categorias, locais, niveis } from "@/data/categorias";
import { PageHeader, EmptyState } from "@/components/forge/ui-bits";
import { ExerciseCard } from "@/components/forge/ExerciseCard";
import { ExerciseModal } from "@/components/forge/ExerciseModal";
import { AddToScheduleDialog } from "@/components/forge/AddToScheduleDialog";

type Busca = { categoria?: string | undefined };

export const Route = createFileRoute("/exercicios")({
  validateSearch: (s: Record<string, unknown>): Busca => ({
    categoria: typeof s["categoria"] === "string" ? s["categoria"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Execuções de exercícios — FORGEFIT" },
      {
        name: "description",
        content:
          "Veja como executar cada exercício com GIF e encontre movimentos por grupo muscular, equipamento e local.",
      },
      { property: "og:title", content: "Execuções de exercícios — FORGEFIT" },
      {
        property: "og:description",
        content: "Busque e filtre exercícios e adicione ao seu cronograma semanal.",
      },
    ],
  }),
  component: Biblioteca,
});

const PAGINA = 12;
const TODOS = "__todos";

function Biblioteca() {
  const { categoria: catInicial } = Route.useSearch();
  const [busca, setBusca] = React.useState("");
  const [categoria, setCategoria] = React.useState(catInicial ?? TODOS);
  const [nivel, setNivel] = React.useState(TODOS);
  const [equipamento, setEquipamento] = React.useState(TODOS);
  const [local, setLocal] = React.useState(TODOS);
  const [visiveis, setVisiveis] = React.useState(PAGINA);

  const [detalhe, setDetalhe] = React.useState<Exercicio | null>(null);
  const [paraAgendar, setParaAgendar] = React.useState<Exercicio | null>(null);

  React.useEffect(() => {
    if (catInicial) setCategoria(catInicial);
  }, [catInicial]);

  const equipamentos = React.useMemo(
    () => Array.from(new Set(todos.map((e) => e.equipamento).filter(Boolean))).sort(),
    [],
  );

  const filtrados = React.useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return todos
      .filter((e) => e.publicado)
      .filter((e) => (termo ? e.nome.toLowerCase().includes(termo) : true))
      .filter((e) => (categoria === TODOS ? true : e.categoria === categoria))
      .filter((e) => (nivel === TODOS ? true : e.nivel === nivel))
      .filter((e) => (equipamento === TODOS ? true : e.equipamento === equipamento))
      .filter((e) =>
        local === TODOS ? true : e.local === local || e.local === "Ambos",
      )
      .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  }, [busca, categoria, nivel, equipamento, local]);

  React.useEffect(() => setVisiveis(PAGINA), [busca, categoria, nivel, equipamento, local]);

  const limpar = () => {
    setBusca("");
    setCategoria(TODOS);
    setNivel(TODOS);
    setEquipamento(TODOS);
    setLocal(TODOS);
  };

  return (
    <div>
      <PageHeader
        titulo="Execuções"
        descricao="Consulte o movimento correto. Para montar uma rotina completa, comece em Treinos."
      />

      <div className="card-surface mb-5 space-y-3 p-4">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Label htmlFor="busca-exercicio" className="sr-only">
            Pesquisar exercício
          </Label>
          <Input
            id="busca-exercicio"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Qual exercício você procura?"
            className="pl-9"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          <FiltroSelect
            label="Grupo muscular"
            valor={categoria}
            onChange={setCategoria}
            opcoes={categorias.map((c) => ({ valor: c.slug, texto: c.nome }))}
          />
          <FiltroSelect
            label="Nível"
            valor={nivel}
            onChange={setNivel}
            opcoes={niveis.map((n) => ({ valor: n, texto: n }))}
          />
          <FiltroSelect
            label="Equipamento"
            valor={equipamento}
            onChange={setEquipamento}
            opcoes={equipamentos.map((e) => ({ valor: e, texto: e }))}
          />
          <FiltroSelect
            label="Local"
            valor={local}
            onChange={setLocal}
            opcoes={locais.map((l) => ({ valor: l, texto: l }))}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {filtrados.length} resultado(s)
          </p>
          <Button variant="ghost" size="sm" className="gap-1.5" onClick={limpar}>
            <X className="h-4 w-4" /> Limpar filtros
          </Button>
        </div>
      </div>

      {filtrados.length === 0 ? (
        <EmptyState
          titulo="Nenhum resultado"
          descricao="Ajuste a busca ou limpe os filtros para ver mais exercícios."
          acao={
            <Button variant="outline" onClick={limpar}>
              Limpar filtros
            </Button>
          }
        />
      ) : (
        <>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {filtrados.slice(0, visiveis).map((ex) => (
              <li key={ex.id}>
                <ExerciseCard
                  exercicio={ex}
                  onVer={() => setDetalhe(ex)}
                  onAdicionar={() => setParaAgendar(ex)}
                />
              </li>
            ))}
          </ul>
          {visiveis < filtrados.length ? (
            <div className="mt-6 flex justify-center">
              <Button variant="outline" onClick={() => setVisiveis((v) => v + PAGINA)}>
                Carregar mais
              </Button>
            </div>
          ) : null}
        </>
      )}

      <ExerciseModal
        exercicio={detalhe}
        open={Boolean(detalhe)}
        onOpenChange={(v) => !v && setDetalhe(null)}
        onAdicionar={(ex) => {
          setDetalhe(null);
          setParaAgendar(ex);
        }}
      />
      <AddToScheduleDialog
        exercicio={paraAgendar}
        open={Boolean(paraAgendar)}
        onOpenChange={(v) => !v && setParaAgendar(null)}
      />
    </div>
  );
}

function FiltroSelect({
  label,
  valor,
  onChange,
  opcoes,
}: {
  label: string;
  valor: string;
  onChange: (v: string) => void;
  opcoes: Array<{ valor: string; texto: string }>;
}) {
  return (
    <div>
      <Label className="mb-1 block text-[11px] uppercase tracking-wide text-muted-foreground">
        {label}
      </Label>
      <Select value={valor} onValueChange={onChange}>
        <SelectTrigger aria-label={label} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={TODOS}>Todos</SelectItem>
          {opcoes.map((o) => (
            <SelectItem key={o.valor} value={o.valor}>
              {o.texto}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
