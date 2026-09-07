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

/** CONTEÚDO DE EXEMPLO — substituir pelos arquivos reais em /public/conteudos/planilhas/ */
export const planilhas: Planilha[] = [
  {
    id: "pl-1",
    nome: "Planilha de exemplo A",
    slug: "planilha-de-exemplo-a",
    capaUrl: "",
    objetivo: "",
    nivel: "Iniciante",
    local: "Casa",
    quantidadeDias: "3",
    descricao: "Planilha de demonstração para validar o layout desta tela.",
    arquivoUrl: "",
    arquivoTipo: "PDF",
    estrutura: [
      { dia: 1, exercicioIds: ["ex-2", "ex-4"] },
      { dia: 3, exercicioIds: ["ex-3", "ex-4"] },
      { dia: 5, exercicioIds: ["ex-1", "ex-6"] },
    ],
    publicado: true,
    exemplo: true,
  },
  {
    id: "pl-2",
    nome: "Planilha de exemplo B",
    slug: "planilha-de-exemplo-b",
    capaUrl: "",
    objetivo: "",
    nivel: "Intermediário",
    local: "Academia",
    quantidadeDias: "4",
    descricao: "Planilha de demonstração para validar o layout desta tela.",
    arquivoUrl: "",
    arquivoTipo: "XLSX",
    publicado: true,
    exemplo: true,
  },
];
