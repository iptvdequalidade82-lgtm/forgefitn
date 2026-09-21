import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  BookOpen,
  CalendarPlus,
  Clock,
  Download,
  ExternalLink,
  Heart,
  LibraryBig,
  Search,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { receitas as todas, colecoesReceitas, refeicoes, type Receita } from "@/data/receitas";
import { guiasAlimentacao } from "@/data/guias-alimentacao";
import { DIAS, useForge } from "@/lib/store";
import { Chip, EmptyState, PageHeader } from "@/components/forge/ui-bits";
import { Thumbnail } from "@/components/forge/Media";
import { baixarArquivo } from "@/lib/download";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/receitas")({
  head: () => ({
    meta: [
      { title: "Receitas, cardápios e guias — FORGEFIT" },
      { name: "description", content: "Biblioteca FORGEFIT com centenas de receitas, cardápios e guias de alimentação." },
      { property: "og:title", content: "Receitas, cardápios e guias — FORGEFIT" },
      { property: "og:description", content: "Encontre receitas completas e materiais para organizar sua alimentação." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Receitas,
});

const TODOS = "__todos";
const PAGINA = 24;

function Receitas() {
  const { isFavorito, toggleFavorito, adicionarRefeicao } = useForge();
  const [busca, setBusca] = React.useState("");
  const [colecao, setColecao] = React.useState(TODOS);
  const [refeicao, setRefeicao] = React.useState(TODOS);
  const [soFavoritas, setSoFavoritas] = React.useState(false);
  const [visiveis, setVisiveis] = React.useState(PAGINA);
  const [detalhe, setDetalhe] = React.useState<Receita | null>(null);
  const [paraSemana, setParaSemana] = React.useState<Receita | null>(null);

  React.useEffect(() => setVisiveis(PAGINA), [busca, colecao, refeicao, soFavoritas]);

  const termo = busca.trim().toLocaleLowerCase("pt-BR");
  const lista = todas
    .filter((r) => r.publicado)
    .filter((r) => !termo || [r.nome, r.colecao, r.categoria, ...r.ingredientes].some((v) => v.toLocaleLowerCase("pt-BR").includes(termo)))
    .filter((r) => colecao === TODOS || r.colecao === colecao)
    .filter((r) => refeicao === TODOS || r.refeicao === refeicao)
    .filter((r) => !soFavoritas || isFavorito("receitas", r.id));

  const limpar = () => {
    setBusca("");
    setColecao(TODOS);
    setRefeicao(TODOS);
    setSoFavoritas(false);
  };

  return (
    <div>
      <PageHeader titulo="Receitas" descricao="Receitas completas, cardápios e guias para cuidar da sua alimentação." />

      <Tabs defaultValue="receitas" className="space-y-5">
        <TabsList className="grid h-auto w-full grid-cols-2 p-1 sm:w-[420px]">
          <TabsTrigger value="receitas" className="min-h-10 gap-2"><UtensilsCrossed /> Receitas</TabsTrigger>
          <TabsTrigger value="guias" className="min-h-10 gap-2"><BookOpen /> Cardápios e guias</TabsTrigger>
        </TabsList>

        <TabsContent value="receitas" className="space-y-5">
          <section className="grid gap-3 sm:grid-cols-3" aria-label="Resumo da biblioteca">
            <Resumo numero={todas.length} rotulo="receitas completas" />
            <Resumo numero={colecoesReceitas.length} rotulo="coleções organizadas" />
            <Resumo numero={todas.filter((r) => r.calorias).length} rotulo="com calorias informadas" />
          </section>

          <section className="card-surface space-y-4 p-4" aria-label="Buscar e filtrar receitas">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Label htmlFor="busca-receita" className="sr-only">Buscar por nome ou ingrediente</Label>
              <Input id="busca-receita" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar receita ou ingrediente" className="h-11 pl-10 text-base" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Filtro label="Coleção" value={colecao} onChange={setColecao} todos="Todas as coleções" opcoes={colecoesReceitas} />
              <Filtro label="Refeição" value={refeicao} onChange={setRefeicao} todos="Todas as refeições" opcoes={[...refeicoes]} />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-medium" aria-live="polite">{lista.length} {lista.length === 1 ? "receita encontrada" : "receitas encontradas"}</p>
              <div className="flex gap-2">
                <Button variant={soFavoritas ? "default" : "outline"} size="sm" aria-pressed={soFavoritas} onClick={() => setSoFavoritas((v) => !v)}><Heart /> Favoritas</Button>
                <Button variant="ghost" size="sm" onClick={limpar}><X /> Limpar</Button>
              </div>
            </div>
          </section>

          {lista.length === 0 ? (
            <EmptyState titulo="Nenhuma receita encontrada" descricao="Tente outro nome, ingrediente ou limpe os filtros." icone={<UtensilsCrossed className="h-7 w-7" />} />
          ) : (
            <>
              <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {lista.slice(0, visiveis).map((r) => (
                  <li key={r.id}><ReceitaCard receita={r} favorita={isFavorito("receitas", r.id)} onFavoritar={() => toggleFavorito("receitas", r.id)} onAbrir={() => setDetalhe(r)} /></li>
                ))}
              </ul>
              {visiveis < lista.length ? <div className="flex justify-center"><Button variant="outline" size="lg" onClick={() => setVisiveis((v) => v + PAGINA)}>Mostrar mais receitas</Button></div> : null}
            </>
          )}
        </TabsContent>

        <TabsContent value="guias" className="space-y-5">
          <div className="border-l-4 border-primary pl-4">
            <h2 className="font-display text-2xl font-semibold uppercase">Materiais para sua rotina</h2>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">Use estes materiais como apoio educativo. Eles não substituem orientação individual de um profissional de saúde.</p>
          </div>
          <ul className="grid gap-4 lg:grid-cols-3">
            {guiasAlimentacao.map((guia) => (
              <li key={guia.id} className="card-surface overflow-hidden">
                <Thumbnail src={guia.capaUrl} alt={`Capa de ${guia.titulo}`} className="aspect-[16/9] w-full object-cover object-top" fallbackIcone={<BookOpen className="h-8 w-8" />} />
                <div className="space-y-3 p-4">
                  <div className="flex flex-wrap gap-2"><Chip className="bg-primary/15 text-primary">{guia.tipo}</Chip><Chip>{guia.paginas} páginas</Chip></div>
                  <div><h3 className="font-display text-2xl font-semibold uppercase leading-tight">{guia.titulo}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{guia.descricao}</p></div>
                  <ul className="flex flex-wrap gap-1.5" aria-label="Assuntos do material">{guia.topicos.map((t) => <li key={t}><Chip>{t}</Chip></li>)}</ul>
                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={() => window.open(guia.arquivoUrl, "_blank", "noopener")}><ExternalLink /> Ler guia</Button>
                    <Button variant="outline" onClick={() => baixarArquivo(guia.arquivoUrl, guia.titulo)}><Download /> Baixar</Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>

      <Dialog open={Boolean(detalhe)} onOpenChange={(v) => !v && setDetalhe(null)}>
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
          {detalhe ? <DetalheReceita receita={detalhe} favorita={isFavorito("receitas", detalhe.id)} onFavoritar={() => toggleFavorito("receitas", detalhe.id)} onAdicionar={() => setParaSemana(detalhe)} /> : null}
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(paraSemana)} onOpenChange={(v) => !v && setParaSemana(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle className="font-display text-2xl uppercase">Adicionar à semana</DialogTitle></DialogHeader>
          <EscolherDiaRefeicao refeicaoInicial={paraSemana?.refeicao} onConfirmar={(dia, ref) => { if (!paraSemana) return; adicionarRefeicao(dia, paraSemana.id, ref); setParaSemana(null); setDetalhe(null); toast.success(`Adicionada em ${DIAS[dia - 1]} (${ref})`); }} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Resumo({ numero, rotulo }: { numero: number; rotulo: string }) {
  return <div className="card-surface flex items-center gap-3 p-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-primary/15 text-primary"><LibraryBig className="h-5 w-5" /></div><div><strong className="font-display text-2xl leading-none">{numero}</strong><p className="text-xs text-muted-foreground">{rotulo}</p></div></div>;
}

function Filtro({ label, value, onChange, todos, opcoes }: { label: string; value: string; onChange: (v: string) => void; todos: string; opcoes: string[] }) {
  return <div><Label className="mb-1.5 block text-xs font-medium uppercase text-muted-foreground">{label}</Label><Select value={value} onValueChange={onChange}><SelectTrigger className="h-11" aria-label={label}><SelectValue /></SelectTrigger><SelectContent><SelectItem value={TODOS}>{todos}</SelectItem>{opcoes.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select></div>;
}

function ReceitaCard({ receita, favorita, onFavoritar, onAbrir }: { receita: Receita; favorita: boolean; onFavoritar: () => void; onAbrir: () => void }) {
  return <article className="card-surface flex h-full min-h-52 flex-col p-4">
    <div className="flex items-start justify-between gap-3"><Chip className="bg-primary/15 text-primary">{receita.colecao}</Chip><Button variant="ghost" size="icon" aria-label={favorita ? "Remover dos favoritos" : "Favoritar receita"} aria-pressed={favorita} onClick={onFavoritar}><Heart className={cn(favorita && "fill-accent text-accent")} /></Button></div>
    <h3 className="mt-3 font-display text-2xl font-semibold uppercase leading-tight">{receita.nome}</h3>
    <div className="mt-2 flex flex-wrap gap-1.5"><Chip>{receita.refeicao}</Chip>{receita.calorias ? <Chip>{receita.calorias} kcal</Chip> : null}{receita.rendimento ? <Chip>{receita.rendimento}</Chip> : null}</div>
    <p className="mt-3 text-sm text-muted-foreground">{receita.ingredientes.length} ingredientes • preparo completo</p>
    <Button className="mt-auto w-full" onClick={onAbrir}>Ver receita</Button>
  </article>;
}

function DetalheReceita({ receita, favorita, onFavoritar, onAdicionar }: { receita: Receita; favorita: boolean; onFavoritar: () => void; onAdicionar: () => void }) {
  return <>
    <DialogHeader><DialogTitle className="pr-8 text-left font-display text-3xl uppercase leading-tight">{receita.nome}</DialogTitle></DialogHeader>
    <div className="flex flex-wrap gap-1.5"><Chip className="bg-primary/15 text-primary">{receita.colecao}</Chip><Chip>{receita.refeicao}</Chip>{receita.calorias ? <Chip>{receita.calorias} kcal</Chip> : null}{receita.tempoPreparoMin ? <Chip><Clock className="mr-1 h-3 w-3" />{receita.tempoPreparoMin} min</Chip> : null}</div>
    <section><h3 className="mb-3 font-display text-xl font-semibold uppercase">Ingredientes</h3><ul className="space-y-2">{receita.ingredientes.map((i, n) => <li key={`${n}-${i}`} className="flex gap-2 text-sm leading-relaxed"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{i}</li>)}</ul></section>
    <section><h3 className="mb-3 font-display text-xl font-semibold uppercase">Modo de preparo</h3><ol className="space-y-3">{receita.modoPreparo.map((p, i) => <li key={i} className="grid grid-cols-[28px_1fr] gap-2 text-sm leading-relaxed"><span className="grid h-7 w-7 place-items-center rounded-md bg-primary/15 font-semibold text-primary">{i + 1}</span><span>{p}</span></li>)}</ol></section>
    {receita.rendimento ? <p className="text-sm"><strong>Rendimento:</strong> {receita.rendimento}</p> : null}
    <div className="grid gap-2 sm:grid-cols-2"><Button onClick={onAdicionar}><CalendarPlus /> Adicionar à semana</Button><Button variant="outline" onClick={onFavoritar}><Heart className={cn(favorita && "fill-accent text-accent")} />{favorita ? "Salva nos favoritos" : "Salvar receita"}</Button><Button variant="outline" className="sm:col-span-2" onClick={() => window.open(receita.arquivoDownloadUrl, "_blank", "noopener")}><BookOpen /> Abrir livro original</Button></div>
  </>;
}

function EscolherDiaRefeicao({ refeicaoInicial, onConfirmar }: { refeicaoInicial?: string; onConfirmar: (dia: number, refeicao: string) => void }) {
  const [dia, setDia] = React.useState("1");
  const [ref, setRef] = React.useState(refeicaoInicial && refeicoes.includes(refeicaoInicial as (typeof refeicoes)[number]) ? refeicaoInicial : refeicoes[0]);
  return <div className="space-y-4"><Filtro label="Dia" value={dia} onChange={setDia} todos="Escolha o dia" opcoes={DIAS.map((d, i) => `${i + 1}|${d}`)} /><div><Label className="mb-1.5 block text-xs font-medium uppercase text-muted-foreground">Refeição</Label><Select value={ref} onValueChange={setRef}><SelectTrigger className="h-11"><SelectValue /></SelectTrigger><SelectContent>{refeicoes.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select></div><Button className="h-11 w-full" disabled={dia === TODOS || dia.includes("|")} onClick={() => onConfirmar(Number(dia), ref)}>Salvar na semana</Button></div>;
}