import fichasTreinosPdf from "@/assets/materiais/fichas-de-treinos.pdf.asset.json";
import fichasTreinosCapa from "@/assets/materiais/fichas-de-treinos-capa.jpg.asset.json";
import fichasPersonalizadasPdf from "@/assets/materiais/fichas-personalizadas.pdf.asset.json";
import fichasPersonalizadasCapa from "@/assets/materiais/fichas-personalizadas-capa.jpg.asset.json";

export const planilhas: Planilha[] = [
  {
    id: "pl-fichas-de-treinos",
    nome: "Fichas de Treinos",
    slug: "fichas-de-treinos",
    capaUrl: fichasTreinosCapa.url,
    objetivo: "",
    nivel: "",
    local: "",
    quantidadeDias: "",
    descricao: "Material em PDF com as fichas de treino, organizadas por semana.",
    arquivoUrl: fichasTreinosPdf.url,
    arquivoTipo: "PDF",
    publicado: true,
  },
  {
    id: "pl-fichas-personalizadas",
    nome: "Fichas Personalizadas",
    slug: "fichas-personalizadas",
    capaUrl: fichasPersonalizadasCapa.url,
    objetivo: "",
    nivel: "",
    local: "",
    quantidadeDias: "",
    descricao: "Material em PDF com fichas personalizadas e alongamentos.",
    arquivoUrl: fichasPersonalizadasPdf.url,
    arquivoTipo: "PDF",
    publicado: true,
  },
];

export type PlanilhaDia = {
  dia: number; // 1 = segunda ... 7 = domingo
  exercicioIds: string[];
};

export type Planilha = {
  id: string;
  nome: string;
  slug: string;
  capaUrl: string;
  objetivo: string;
  nivel: string;
  local: string;
  quantidadeDias: string;
  descricao: string;
  arquivoUrl: string;
  arquivoTipo: "PDF" | "XLSX" | "CSV" | "Imagem" | "";
  /** Estrutura opcional: só preencher quando as colunas do arquivo estiverem claras */
  estrutura?: PlanilhaDia[];
  publicado: boolean;
  exemplo?: boolean;
};
