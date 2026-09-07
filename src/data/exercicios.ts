export type Exercicio = {
  id: string;
  nome: string;
  slug: string;
  categoria: string; // slug da categoria
  grupoMuscularPrincipal: string;
  gruposSecundarios: string[];
  descricao: string;
  nivel: string;
  equipamento: string;
  local: "Casa" | "Academia" | "Ambos" | "";
  thumbnailUrl: string;
  gifUrl: string;
  videoUrl: string;
  arquivoDownloadUrl: string;
  seriesPadrao: string;
  repeticoesPadrao: string;
  duracaoPadrao: string;
  descansoPadrao: string;
  tags: string[];
  publicado: boolean;
  /** true = conteúdo de demonstração, deve ser removido na publicação final */
  exemplo?: boolean;
};

/**
 * CONTEÚDO DE EXEMPLO — 6 itens apenas para validar o layout.
 * Substituir integralmente pelos exercícios reais.
 * Mídias devem ficar em /public/conteudos/gifs/ e /public/conteudos/exercicios/
 */
export const exercicios: Exercicio[] = [
  {
    id: "ex-1",
    nome: "Exercício de exemplo 1",
    slug: "exercicio-de-exemplo-1",
    categoria: "biceps",
    grupoMuscularPrincipal: "Bíceps",
    gruposSecundarios: ["Antebraço"],
    descricao: "Descrição de demonstração. O texto real virá do material enviado.",
    nivel: "Iniciante",
    equipamento: "Halteres",
    local: "Ambos",
    thumbnailUrl: "",
    gifUrl: "",
    videoUrl: "",
    arquivoDownloadUrl: "",
    seriesPadrao: "3",
    repeticoesPadrao: "12",
    duracaoPadrao: "",
    descansoPadrao: "60s",
    tags: [],
    publicado: true,
    exemplo: true,
  },
  {
    id: "ex-2",
    nome: "Exercício de exemplo 2",
    slug: "exercicio-de-exemplo-2",
    categoria: "peito",
    grupoMuscularPrincipal: "Peito",
    gruposSecundarios: ["Tríceps", "Ombros"],
    descricao: "Descrição de demonstração. O texto real virá do material enviado.",
    nivel: "Intermediário",
    equipamento: "Peso do corpo",
    local: "Casa",
    thumbnailUrl: "",
    gifUrl: "",
    videoUrl: "",
    arquivoDownloadUrl: "",
    seriesPadrao: "4",
    repeticoesPadrao: "10",
    duracaoPadrao: "",
    descansoPadrao: "45s",
    tags: [],
    publicado: true,
    exemplo: true,
  },
  {
    id: "ex-3",
    nome: "Exercício de exemplo 3",
    slug: "exercicio-de-exemplo-3",
    categoria: "pernas",
    grupoMuscularPrincipal: "Pernas",
    gruposSecundarios: ["Glúteos"],
    descricao: "Descrição de demonstração. O texto real virá do material enviado.",
    nivel: "Iniciante",
    equipamento: "",
    local: "Casa",
    thumbnailUrl: "",
    gifUrl: "",
    videoUrl: "",
    arquivoDownloadUrl: "",
    seriesPadrao: "3",
    repeticoesPadrao: "15",
    duracaoPadrao: "",
    descansoPadrao: "",
    tags: [],
    publicado: true,
    exemplo: true,
  },
  {
    id: "ex-4",
    nome: "Exercício de exemplo 4",
    slug: "exercicio-de-exemplo-4",
    categoria: "abdomen",
    grupoMuscularPrincipal: "Abdômen",
    gruposSecundarios: [],
    descricao: "Descrição de demonstração. O texto real virá do material enviado.",
    nivel: "Iniciante",
    equipamento: "Colchonete",
    local: "Casa",
    thumbnailUrl: "",
    gifUrl: "",
    videoUrl: "",
    arquivoDownloadUrl: "",
    seriesPadrao: "3",
    repeticoesPadrao: "",
    duracaoPadrao: "40s",
    descansoPadrao: "30s",
    tags: [],
    publicado: true,
    exemplo: true,
  },
  {
    id: "ex-5",
    nome: "Exercício de exemplo 5",
    slug: "exercicio-de-exemplo-5",
    categoria: "costas",
    grupoMuscularPrincipal: "Costas",
    gruposSecundarios: ["Bíceps"],
    descricao: "Descrição de demonstração. O texto real virá do material enviado.",
    nivel: "Avançado",
    equipamento: "Barra fixa",
    local: "Academia",
    thumbnailUrl: "",
    gifUrl: "",
    videoUrl: "",
    arquivoDownloadUrl: "",
    seriesPadrao: "4",
    repeticoesPadrao: "8",
    duracaoPadrao: "",
    descansoPadrao: "90s",
    tags: [],
    publicado: true,
    exemplo: true,
  },
  {
    id: "ex-6",
    nome: "Exercício de exemplo 6",
    slug: "exercicio-de-exemplo-6",
    categoria: "ombros",
    grupoMuscularPrincipal: "Ombros",
    gruposSecundarios: [],
    descricao: "Descrição de demonstração. O texto real virá do material enviado.",
    nivel: "Intermediário",
    equipamento: "Halteres",
    local: "Ambos",
    thumbnailUrl: "",
    gifUrl: "",
    videoUrl: "",
    arquivoDownloadUrl: "",
    seriesPadrao: "3",
    repeticoesPadrao: "12",
    duracaoPadrao: "",
    descansoPadrao: "60s",
    tags: [],
    publicado: true,
    exemplo: true,
  },
];

export const getExercicio = (id: string) => exercicios.find((e) => e.id === id);
