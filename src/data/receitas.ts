export type Receita = {
  id: string;
  nome: string;
  slug: string;
  categoria: string;
  refeicao: string; // Café da manhã, Almoço, Jantar, Lanche
  tempoPreparoMin: number | null;
  rendimento: string;
  imagemUrl: string;
  descricao: string;
  ingredientes: string[];
  modoPreparo: string[];
  arquivoDownloadUrl: string;
  publicado: boolean;
  exemplo?: boolean;
};

export const refeicoes = ["Café da manhã", "Almoço", "Lanche", "Jantar"] as const;

/** CONTEÚDO DE EXEMPLO — substituir pelas receitas reais (/public/conteudos/receitas/) */
export const receitas: Receita[] = [
  {
    id: "rc-1",
    nome: "Receita de exemplo 1",
    slug: "receita-de-exemplo-1",
    categoria: "Proteica",
    refeicao: "Café da manhã",
    tempoPreparoMin: 10,
    rendimento: "1 porção",
    imagemUrl: "",
    descricao: "Receita de demonstração. O conteúdo real virá do material enviado.",
    ingredientes: ["Ingrediente de exemplo 1", "Ingrediente de exemplo 2"],
    modoPreparo: ["Etapa de exemplo 1.", "Etapa de exemplo 2."],
    arquivoDownloadUrl: "",
    publicado: true,
    exemplo: true,
  },
  {
    id: "rc-2",
    nome: "Receita de exemplo 2",
    slug: "receita-de-exemplo-2",
    categoria: "Low carb",
    refeicao: "Almoço",
    tempoPreparoMin: 25,
    rendimento: "2 porções",
    imagemUrl: "",
    descricao: "Receita de demonstração. O conteúdo real virá do material enviado.",
    ingredientes: ["Ingrediente de exemplo 1", "Ingrediente de exemplo 2"],
    modoPreparo: ["Etapa de exemplo 1.", "Etapa de exemplo 2."],
    arquivoDownloadUrl: "",
    publicado: true,
    exemplo: true,
  },
  {
    id: "rc-3",
    nome: "Receita de exemplo 3",
    slug: "receita-de-exemplo-3",
    categoria: "Lanche rápido",
    refeicao: "Lanche",
    tempoPreparoMin: 5,
    rendimento: "",
    imagemUrl: "",
    descricao: "Receita de demonstração. O conteúdo real virá do material enviado.",
    ingredientes: ["Ingrediente de exemplo 1"],
    modoPreparo: ["Etapa de exemplo 1."],
    arquivoDownloadUrl: "",
    publicado: true,
    exemplo: true,
  },
  {
    id: "rc-4",
    nome: "Receita de exemplo 4",
    slug: "receita-de-exemplo-4",
    categoria: "Proteica",
    refeicao: "Jantar",
    tempoPreparoMin: null,
    rendimento: "",
    imagemUrl: "",
    descricao: "Receita de demonstração. O conteúdo real virá do material enviado.",
    ingredientes: ["Ingrediente de exemplo 1", "Ingrediente de exemplo 2"],
    modoPreparo: ["Etapa de exemplo 1.", "Etapa de exemplo 2.", "Etapa de exemplo 3."],
    arquivoDownloadUrl: "",
    publicado: true,
    exemplo: true,
  },
];
