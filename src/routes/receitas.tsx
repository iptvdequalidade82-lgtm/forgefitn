import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Heart, Search, UtensilsCrossed, Clock, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { receitas as todas, refeicoes, type Receita } from "@/data/receitas";
import { DIAS, useForge } from "@/lib/store";
import { PageHeader, EmptyState, Chip, EtiquetaExemplo } from "@/components/forge/ui-bits";
import { Thumbnail } from "@/components/forge/Media";
import { baixarArquivo } from "@/lib/download";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/receitas")({
  head: () => ({
    meta: [
      { title: "Receitas — FORGEFIT" },
      {
        name: "description",
        content:
          "Biblioteca de receitas ForgeFit com busca, filtros por categoria, refeição e tempo de preparo.",
      },
      { property: "og:title", content: "Receitas — FORGEFIT" },
      {
        property: "og:description",
        content: "Receitas com ingredientes e modo de preparo, salváveis na sua semana.",
      },
    ],
  }),
  component: Receitas,
});

const TODOS = "__todos";
const PAGINA = 8;

function Receitas() {
  const { isFavorito, toggleFavorito, adicionarRefeicao } = useForge();
  const [busca, setBusca] = React.useState("");
  const [categoria, setCategoria] = React.useState(TODOS);
  const [refeicao, setRefeicao] = React.useState(TODOS);
  const [tempo, setTempo] = React.useState(TODOS);
  const [soFavoritas, setSoFavoritas] = React.useState(false);
  const [visiveis, setVisiveis] = React.useState(PAGINA);
  const [detalhe, setDetalhe] = React.useState<Receita | null>(null);
  const [paraSemana, setParaSemana] = React.useState<Receita | null>(null);

  const cats = React.useMemo(
    () => Array.from(new Set(todas.map((r) => r.categoria).filter(Boolean))).sort(),
    [],
  );

  const lista = todas
    .filter((r) => r.publicado)
    .filter((r) => r.nome.toLowerCase().includes(busca.trim().toLowerCase()))
    .filter((r) => (categoria === TODOS ? true : r.categoria === categoria))
    .filter((r) => (refeicao === TODOS ? true : r.refeicao === refeicao))
    .filter((r) => {
      if (tempo === TODOS) return true;
      if (r.tempoPreparoMin === null) return false;
      if (tempo === "15") return r.tempoPreparoMin <= 15;
      if (tempo === "30") return r.tempoPreparoMin <= 30;
      return r.tempoPreparoMin > 30;
    })
    .filter((r) => (soFavoritas ? isFavorito("receitas", r.id) : true));

  const limpar = () => {
    setBusca("");
    setCategoria(TODOS);
    setRefeicao(TODOS);
    setTempo(TODOS);
    setSoFavoritas(false);
  };

  return (
    <div>
      <PageHeader titulo="Receitas" descricao="Ideias de refeições do seu material." />

      <div className="card-surface mb-5 space-y-3 p-4">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Label htmlFor="busca-receita" className="sr-only">
            Pesquisar receita
          </Label>
          <Input
            id="busca-receita"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Pesquisar receita"
            className="pl-9"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
          <div>
            <Label className="mb-1 block text-[11px] uppercase text-muted-foreground">
              Categoria
            </Label>
            <Select value={categoria} onValueChange={setCategoria}>
              <SelectTrigger aria-label="Categoria">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={TODOS}>Todas</SelectItem>
                {cats.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-1 block text-[11px] uppercase text-muted-foreground">
              Refeição
            </Label>
            <Select value={refeicao} onValueChange={setRefeicao}>
              <SelectTrigger aria-label="Refeição">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={TODOS}>Todas</SelectItem>
                {refeicoes.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-1 block text-[11px] uppercase text-muted-foreground">
              Tempo de preparo
            </Label>
            <Select value={tempo} onValueChange={setTempo}>
              <SelectTrigger aria-label="Tempo de preparo">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={TODOS}>Qualquer</SelectItem>
                <SelectItem value="15">Até 15 min</SelectItem>
                <SelectItem value="30">Até 30 min</SelectItem>
                <SelectItem value="mais">Mais de 30 min</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {lista.length} receita(s)
          </p>
          <div className="flex gap-2">
            <Button
              variant={soFavoritas ? "default" : "outline"}
              size="sm"
              className="gap-1.5"
              aria-pressed={soFavoritas}
              onClick={() => setSoFavoritas((v) => !v)}
            >
              <Heart className="h-4 w-4" /> Favoritas
            </Button>
            <Button variant="ghost" size="sm" className="gap-1.5" onClick={limpar}>
              <X className="h-4 w-4" /> Limpar
            </Button>
          </div>
        </div>
      </div>

      {lista.length === 0 ? (
        <EmptyState
          titulo="Nenhuma receita encontrada"
          descricao="Ajuste a busca ou limpe os filtros."
          icone={<UtensilsCrossed className="h-7 w-7" />}
        />
      ) : (
        <>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {lista.slice(0, visiveis).map((r) => {
              const fav = isFavorito("receitas", r.id);
              return (
                <li key={r.id}>
                  <article className="card-surface flex h-full flex-col overflow-hidden">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setDetalhe(r)}
                        className="block w-full"
                        aria-label={`Ver receita ${r.nome}`}
                      >
                        <Thumbnail
                          src={r.imagemUrl}
                          alt={r.nome}
                          className="aspect-[4/3] w-full"
                          fallbackIcone={<UtensilsCrossed className="h-7 w-7" />}
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleFavorito("receitas", r.id)}
                        aria-pressed={fav}
                        aria-label={fav ? "Remover dos favoritos" : "Favoritar receita"}
                        className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-background/80 backdrop-blur"
                      >
                        <Heart
                          className={cn("h-[18px] w-[18px]", fav && "fill-accent text-accent")}
                        />
                      </button>
                      {r.exemplo ? <EtiquetaExemplo className="absolute left-2 top-2" /> : null}
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-3">
                      <h3 className="line-clamp-2 font-display text-lg font-semibold uppercase leading-tight">
                        {r.nome}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        <Chip className="bg-primary/15 text-primary">{r.categoria}</Chip>
                        {r.tempoPreparoMin !== null ? (
                          <Chip>{r.tempoPreparoMin} min</Chip>
                        ) : null}
                      </div>
                      <Button
                        size="sm"
                        className="mt-auto"
                        onClick={() => setDetalhe(r)}
                      >
                        Ver receita
                      </Button>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
          {visiveis < lista.length ? (
            <div className="mt-6 flex justify-center">
              <Button variant="outline" onClick={() => setVisiveis((v) => v + PAGINA)}>
                Carregar mais
              </Button>
            </div>
          ) : null}
        </>
      )}

      {/* Detalhe */}
      <Dialog open={Boolean(detalhe)} onOpenChange={(v) => !v && setDetalhe(null)}>
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
          {detalhe ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex flex-wrap items-center gap-2 pr-6 text-left font-display text-2xl uppercase">
                  {detalhe.nome}
                  {detalhe.exemplo ? <EtiquetaExemplo /> : null}
                </DialogTitle>
              </DialogHeader>
              <Thumbnail
                src={detalhe.imagemUrl}
                alt={detalhe.nome}
                className="aspect-video w-full rounded-xl"
                fallbackIcone={<UtensilsCrossed className="h-8 w-8" />}
              />
              <div className="flex flex-wrap gap-1.5">
                <Chip className="bg-primary/15 text-primary">{detalhe.categoria}</Chip>
                <Chip>{detalhe.refeicao}</Chip>
                {detalhe.tempoPreparoMin !== null ? (
                  <Chip>
                    <Clock className="mr-1 h-3 w-3" /> {detalhe.tempoPreparoMin} min
                  </Chip>
                ) : null}
                {detalhe.rendimento ? <Chip>{detalhe.rendimento}</Chip> : null}
              </div>
              {detalhe.descricao ? (
                <p className="text-sm text-muted-foreground">{detalhe.descricao}</p>
              ) : null}
              {detalhe.ingredientes.length ? (
                <section>
                  <h3 className="mb-2 font-display text-lg font-semibold uppercase">
                    Ingredientes
                  </h3>
                  <ul className="list-disc space-y-1 pl-5 text-sm">
                    {detalhe.ingredientes.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </section>
              ) : null}
              {detalhe.modoPreparo.length ? (
                <section>
                  <h3 className="mb-2 font-display text-lg font-semibold uppercase">
                    Modo de preparo
                  </h3>
                  <ol className="list-decimal space-y-1 pl-5 text-sm">
                    {detalhe.modoPreparo.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ol>
                </section>
              ) : null}
              <div className="grid gap-2 sm:grid-cols-2">
                <Button
                  onClick={() => {
                    setParaSemana(detalhe);
                  }}
                >
                  Adicionar à semana
                </Button>
                <Button
                  variant="outline"
                  className="gap-1.5"
                  onClick={() =>
                    baixarArquivo(detalhe.arquivoDownloadUrl, detalhe.slug)
                  }
                >
                  <Download className="h-4 w-4" /> Baixar receita
                </Button>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Adicionar à semana */}
      <Dialog open={Boolean(paraSemana)} onOpenChange={(v) => !v && setParaSemana(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl uppercase">
              Adicionar à semana
            </DialogTitle>
          </DialogHeader>
          <EscolherDiaRefeicao
            onConfirmar={(dia, ref) => {
              if (!paraSemana) return;
              adicionarRefeicao(dia, paraSemana.id, ref);
              setParaSemana(null);
              setDetalhe(null);
              toast.success(`Adicionada em ${DIAS[dia - 1]} (${ref})`);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EscolherDiaRefeicao({
  onConfirmar,
}: {
  onConfirmar: (dia: number, refeicao: string) => void;
}) {
  const [dia, setDia] = React.useState("1");
  const [ref, setRef] = React.useState<string>(refeicoes[0]);
  return (
    <div className="space-y-3">
      <div>
        <Label className="mb-1 block text-[11px] uppercase text-muted-foreground">
          Dia
        </Label>
        <Select value={dia} onValueChange={setDia}>
          <SelectTrigger aria-label="Dia da semana">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DIAS.map((d, i) => (
              <SelectItem key={d} value={String(i + 1)}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="mb-1 block text-[11px] uppercase text-muted-foreground">
          Refeição
        </Label>
        <Select value={ref} onValueChange={setRef}>
          <SelectTrigger aria-label="Refeição">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {refeicoes.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full" onClick={() => onConfirmar(Number(dia), ref)}>
        Salvar na semana
      </Button>
    </div>
  );
}
