import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, Search, FileWarning } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { exercicios } from "@/data/exercicios";
import { planilhas } from "@/data/planilhas";
import { receitas } from "@/data/receitas";
import { diasDesafio } from "@/data/desafio";
import { materiais } from "@/data/materiais";
import { PageHeader, Chip, EmptyState } from "@/components/forge/ui-bits";
import { baixarArquivo } from "@/lib/download";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Downloads — FORGEFIT" },
      {
        name: "description",
        content:
          "Central de downloads ForgeFit: exercícios, GIFs, planilhas, receitas, cardápios e bônus.",
      },
      { property: "og:title", content: "Downloads — FORGEFIT" },
      {
        property: "og:description",
        content: "Baixe os arquivos originais do seu material ForgeFit.",
      },
    ],
  }),
  component: Downloads,
});

type Arquivo = {
  id: string;
  nome: string;
  tipo: string;
  categoria: string;
  url: string;
};

const TODOS = "__todos";

function listarArquivos(): Arquivo[] {
  const itens: Arquivo[] = [];
  exercicios.forEach((e) => {
    const url = e.arquivoDownloadUrl || e.videoUrl || e.gifUrl;
    itens.push({
      id: `ex-${e.id}`,
      nome: e.nome,
      tipo: e.videoUrl ? "Vídeo" : "GIF",
      categoria: "Exercícios",
      url,
    });
  });
  planilhas.forEach((p) =>
    itens.push({
      id: `pl-${p.id}`,
      nome: p.nome,
      tipo: p.arquivoTipo || "Arquivo",
      categoria: "Planilhas",
      url: p.arquivoUrl,
    }),
  );
  receitas.forEach((r) =>
    itens.push({
      id: `rc-${r.id}`,
      nome: r.nome,
      tipo: "Receita",
      categoria: "Receitas",
      url: r.arquivoDownloadUrl,
    }),
  );
  materiais
    .filter((m) => m.publicado)
    .forEach((m) =>
      itens.push({
        id: m.id,
        nome: m.nome,
        tipo: m.arquivoTipo,
        categoria: m.categoria,
        url: m.arquivoUrl,
      }),
    );
  diasDesafio
    .filter((d) => d.arquivoUrl)
    .forEach((d) =>
      itens.push({
        id: `df-${d.dia}`,
        nome: d.titulo,
        tipo: "Arquivo",
        categoria: "Desafio",
        url: d.arquivoUrl,
      }),
    );
  return itens;
}

function Downloads() {
  const [busca, setBusca] = React.useState("");
  const [categoria, setCategoria] = React.useState(TODOS);
  const arquivos = React.useMemo(listarArquivos, []);
  const categoriasDisponiveis = Array.from(new Set(arquivos.map((a) => a.categoria)));

  const lista = arquivos
    .filter((a) => a.nome.toLowerCase().includes(busca.trim().toLowerCase()))
    .filter((a) => (categoria === TODOS ? true : a.categoria === categoria));

  return (
    <div>
      <PageHeader
        titulo="Downloads"
        descricao="Arquivos originais do seu material. Nada é gerado automaticamente."
      />

      <div className="card-surface mb-5 grid gap-3 p-4 sm:grid-cols-[minmax(0,1fr)_200px]">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Label htmlFor="busca-download" className="sr-only">
            Pesquisar arquivo
          </Label>
          <Input
            id="busca-download"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Pesquisar arquivo"
            className="pl-9"
          />
        </div>
        <Select value={categoria} onValueChange={setCategoria}>
          <SelectTrigger aria-label="Filtrar por categoria">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TODOS}>Todas as categorias</SelectItem>
            {categoriasDisponiveis.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {lista.length === 0 ? (
        <EmptyState titulo="Nenhum arquivo encontrado" icone={<FileWarning className="h-7 w-7" />} />
      ) : (
        <ul className="space-y-2">
          {lista.map((a) => (
            <li
              key={a.id}
              className="card-surface grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-3"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">{a.nome}</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  <Chip>{a.tipo}</Chip>
                  <Chip className="bg-primary/15 text-primary">{a.categoria}</Chip>
                  {!a.url ? <Chip className="text-destructive">Indisponível</Chip> : null}
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!a.url}
                  onClick={() => window.open(a.url, "_blank", "noopener")}
                >
                  Visualizar
                </Button>
                <Button size="sm" className="gap-1.5" onClick={() => baixarArquivo(a.url, a.nome)}>
                  <Download className="h-4 w-4" /> Baixar
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
