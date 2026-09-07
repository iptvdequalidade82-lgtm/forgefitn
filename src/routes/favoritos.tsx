import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForge } from "@/lib/store";
import { exercicios, type Exercicio } from "@/data/exercicios";
import { receitas } from "@/data/receitas";
import { planilhas } from "@/data/planilhas";
import { PageHeader, EmptyState } from "@/components/forge/ui-bits";
import { ExerciseModal } from "@/components/forge/ExerciseModal";
import { AddToScheduleDialog } from "@/components/forge/AddToScheduleDialog";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Favoritos — FORGEFIT" },
      {
        name: "description",
        content: "Seus exercícios, receitas e planilhas favoritos salvos neste navegador.",
      },
      { property: "og:title", content: "Favoritos — FORGEFIT" },
      {
        property: "og:description",
        content: "Reúna seus conteúdos favoritos do ForgeFit em um só lugar.",
      },
    ],
  }),
  component: Favoritos,
});

function Favoritos() {
  const { state, toggleFavorito } = useForge();
  const [detalhe, setDetalhe] = React.useState<Exercicio | null>(null);
  const [agendar, setAgendar] = React.useState<Exercicio | null>(null);

  const favEx = exercicios.filter((e) => state.favoritos.exercicios.includes(e.id));
  const favRc = receitas.filter((r) => state.favoritos.receitas.includes(r.id));
  const favPl = planilhas.filter((p) => state.favoritos.planilhas.includes(p.id));

  return (
    <div>
      <PageHeader titulo="Favoritos" descricao="Salvos somente neste navegador." />

      <Tabs defaultValue="exercicios">
        <TabsList className="mb-4">
          <TabsTrigger value="exercicios">Exercícios</TabsTrigger>
          <TabsTrigger value="receitas">Receitas</TabsTrigger>
          <TabsTrigger value="planilhas">Planilhas</TabsTrigger>
        </TabsList>

        <TabsContent value="exercicios">
          {favEx.length === 0 ? (
            <EmptyState
              titulo="Nenhum exercício favorito"
              descricao="Toque no coração em um exercício para salvá-lo aqui."
              icone={<Heart className="h-7 w-7" />}
              acao={
                <Button asChild>
                  <Link to="/exercicios">Explorar exercícios</Link>
                </Button>
              }
            />
          ) : (
            <ul className="space-y-2">
              {favEx.map((e) => (
                <li
                  key={e.id}
                  className="card-surface grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-3"
                >
                  <button
                    type="button"
                    className="min-w-0 text-left"
                    onClick={() => setDetalhe(e)}
                  >
                    <span className="block truncate font-medium">{e.nome}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {e.grupoMuscularPrincipal}
                    </span>
                  </button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Remover dos favoritos"
                    onClick={() => toggleFavorito("exercicios", e.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>

        <TabsContent value="receitas">
          {favRc.length === 0 ? (
            <EmptyState
              titulo="Nenhuma receita favorita"
              icone={<Heart className="h-7 w-7" />}
              acao={
                <Button asChild>
                  <Link to="/receitas">Ver receitas</Link>
                </Button>
              }
            />
          ) : (
            <ul className="space-y-2">
              {favRc.map((r) => (
                <li
                  key={r.id}
                  className="card-surface grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-3"
                >
                  <Link to="/receitas" className="min-w-0">
                    <span className="block truncate font-medium">{r.nome}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {r.categoria}
                    </span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Remover dos favoritos"
                    onClick={() => toggleFavorito("receitas", r.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>

        <TabsContent value="planilhas">
          {favPl.length === 0 ? (
            <EmptyState
              titulo="Nenhuma planilha favorita"
              icone={<Heart className="h-7 w-7" />}
              acao={
                <Button asChild>
                  <Link to="/planilhas">Ver planilhas</Link>
                </Button>
              }
            />
          ) : (
            <ul className="space-y-2">
              {favPl.map((p) => (
                <li
                  key={p.id}
                  className="card-surface grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-3"
                >
                  <Link to="/planilhas" className="min-w-0">
                    <span className="block truncate font-medium">{p.nome}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {p.nivel}
                    </span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Remover dos favoritos"
                    onClick={() => toggleFavorito("planilhas", p.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>
      </Tabs>

      <ExerciseModal
        exercicio={detalhe}
        open={Boolean(detalhe)}
        onOpenChange={(v) => !v && setDetalhe(null)}
        onAdicionar={(ex) => {
          setDetalhe(null);
          setAgendar(ex);
        }}
      />
      <AddToScheduleDialog
        exercicio={agendar}
        open={Boolean(agendar)}
        onOpenChange={(v) => !v && setAgendar(null)}
      />
    </div>
  );
}
