import receitas100Pdf from "@/assets/materiais/100-receitas-fit.pdf.asset.json";
import receitas200Pdf from "@/assets/materiais/200-receitas-cafe-da-manha.pdf.asset.json";
import receitas500Pdf from "@/assets/materiais/500-receitas-low-carb.pdf.asset.json";
import emagrecimentoPdf from "@/assets/materiais/emagrecimento-sem-dietas.pdf.asset.json";
import { receitasGeradas } from "./receitas.generated";

export type Receita = {
  id: string;
  nome: string;
  slug: string;
  categoria: string;
  refeicao: string;
  tempoPreparoMin: number | null;
  rendimento: string;
  imagemUrl: string;
  descricao: string;
  ingredientes: string[];
  modoPreparo: string[];
  arquivoDownloadUrl: string;
  publicado: boolean;
  colecao: string;
  calorias?: number | null;
};

export const refeicoes = ["Café da manhã", "Almoço", "Lanche", "Jantar"] as const;

const arquivosPorColecao: Record<string, string> = {
  "100 Receitas Fit": receitas100Pdf.url,
  "Cafés da Manhã Nutritivos": receitas200Pdf.url,
  "500 Receitas Low Carb": receitas500Pdf.url,
  "Emagrecimento sem dietas": emagrecimentoPdf.url,
};

export const receitas: Receita[] = receitasGeradas.map((receita) => ({
  ...receita,
  arquivoDownloadUrl: arquivosPorColecao[receita.colecao] ?? "",
}));

export const colecoesReceitas = Array.from(new Set(receitas.map((receita) => receita.colecao)));
