import abdConcentradoBracosGif from "@/assets/exercicios/abd-concentrado-bracos-estendidos.gif.asset.json";
import abdConcentradoBracosJpg from "@/assets/exercicios/abd-concentrado-bracos-estendidos.jpg.asset.json";
import abdominalCargaGif from "@/assets/exercicios/abdominal-com-carga.gif.asset.json";
import abdominalCargaJpg from "@/assets/exercicios/abdominal-com-carga.jpg.asset.json";
import abdominalConcentradoGif from "@/assets/exercicios/abdominal-concentrado.gif.asset.json";
import abdominalConcentradoJpg from "@/assets/exercicios/abdominal-concentrado.jpg.asset.json";
import desvioRadialGif from "@/assets/exercicios/desvio-radial.gif.asset.json";
import desvioRadialJpg from "@/assets/exercicios/desvio-radial.jpg.asset.json";
import encolhimentoHalteresGif from "@/assets/exercicios/encolhimento-livre-com-halteres.gif.asset.json";
import encolhimentoHalteresJpg from "@/assets/exercicios/encolhimento-livre-com-halteres.jpg.asset.json";
import encolhimentoMaquinaGif from "@/assets/exercicios/encolhimento-maquina.gif.asset.json";
import encolhimentoMaquinaJpg from "@/assets/exercicios/encolhimento-maquina.jpg.asset.json";
import flexaoPunhoBarraGif from "@/assets/exercicios/flexao-de-punho-com-barra.gif.asset.json";
import flexaoPunhoBarraJpg from "@/assets/exercicios/flexao-de-punho-com-barra.jpg.asset.json";
import flexaoPunhoHalteresGif from "@/assets/exercicios/flexao-de-punho-com-halteres.gif.asset.json";
import flexaoPunhoHalteresJpg from "@/assets/exercicios/flexao-de-punho-com-halteres.jpg.asset.json";
import hiperPunhoBarraGif from "@/assets/exercicios/hiperextensao-de-punho-com-barra.gif.asset.json";
import hiperPunhoBarraJpg from "@/assets/exercicios/hiperextensao-de-punho-com-barra.jpg.asset.json";
import hiperPunhoHalteresGif from "@/assets/exercicios/hiperextensao-de-punho-com-halteres.gif.asset.json";
import hiperPunhoHalteresJpg from "@/assets/exercicios/hiperextensao-de-punho-com-halteres.jpg.asset.json";

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
 * Exercícios reais enviados pelo cliente.
 * Descrições, séries e repetições ficam vazias até o material escrito ser enviado.
 */
export const exercicios: Exercicio[] = [
  {
    id: "ex-abdominal-concentrado",
    nome: "Abdominal concentrado",
    slug: "abdominal-concentrado",
    categoria: "abdomen",
    grupoMuscularPrincipal: "Abdômen",
    gruposSecundarios: [],
    descricao: "",
    nivel: "",
    equipamento: "Peso do corpo",
    local: "Ambos",
    thumbnailUrl: abdominalConcentradoJpg.url,
    gifUrl: abdominalConcentradoGif.url,
    videoUrl: "",
    arquivoDownloadUrl: abdominalConcentradoGif.url,
    seriesPadrao: "",
    repeticoesPadrao: "",
    duracaoPadrao: "",
    descansoPadrao: "",
    tags: [],
    publicado: true,
  },
  {
    id: "ex-abd-concentrado-bracos-estendidos",
    nome: "Abdominal concentrado com braços estendidos",
    slug: "abd-concentrado-bracos-estendidos",
    categoria: "abdomen",
    grupoMuscularPrincipal: "Abdômen",
    gruposSecundarios: [],
    descricao: "",
    nivel: "",
    equipamento: "Peso do corpo",
    local: "Ambos",
    thumbnailUrl: abdConcentradoBracosJpg.url,
    gifUrl: abdConcentradoBracosGif.url,
    videoUrl: "",
    arquivoDownloadUrl: abdConcentradoBracosGif.url,
    seriesPadrao: "",
    repeticoesPadrao: "",
    duracaoPadrao: "",
    descansoPadrao: "",
    tags: [],
    publicado: true,
  },
  {
    id: "ex-abdominal-com-carga",
    nome: "Abdominal com carga",
    slug: "abdominal-com-carga",
    categoria: "abdomen",
    grupoMuscularPrincipal: "Abdômen",
    gruposSecundarios: [],
    descricao: "",
    nivel: "",
    equipamento: "Polia",
    local: "Academia",
    thumbnailUrl: abdominalCargaJpg.url,
    gifUrl: abdominalCargaGif.url,
    videoUrl: "",
    arquivoDownloadUrl: abdominalCargaGif.url,
    seriesPadrao: "",
    repeticoesPadrao: "",
    duracaoPadrao: "",
    descansoPadrao: "",
    tags: [],
    publicado: true,
  },
  {
    id: "ex-flexao-punho-barra",
    nome: "Flexão de punho com barra",
    slug: "flexao-de-punho-com-barra",
    categoria: "antebraco",
    grupoMuscularPrincipal: "Antebraço",
    gruposSecundarios: [],
    descricao: "",
    nivel: "",
    equipamento: "Barra",
    local: "Academia",
    thumbnailUrl: flexaoPunhoBarraJpg.url,
    gifUrl: flexaoPunhoBarraGif.url,
    videoUrl: "",
    arquivoDownloadUrl: flexaoPunhoBarraGif.url,
    seriesPadrao: "",
    repeticoesPadrao: "",
    duracaoPadrao: "",
    descansoPadrao: "",
    tags: [],
    publicado: true,
  },
  {
    id: "ex-flexao-punho-halteres",
    nome: "Flexão de punho com halteres",
    slug: "flexao-de-punho-com-halteres",
    categoria: "antebraco",
    grupoMuscularPrincipal: "Antebraço",
    gruposSecundarios: [],
    descricao: "",
    nivel: "",
    equipamento: "Halteres",
    local: "Ambos",
    thumbnailUrl: flexaoPunhoHalteresJpg.url,
    gifUrl: flexaoPunhoHalteresGif.url,
    videoUrl: "",
    arquivoDownloadUrl: flexaoPunhoHalteresGif.url,
    seriesPadrao: "",
    repeticoesPadrao: "",
    duracaoPadrao: "",
    descansoPadrao: "",
    tags: [],
    publicado: true,
  },
  {
    id: "ex-hiperextensao-punho-barra",
    nome: "Hiperextensão de punho com barra",
    slug: "hiperextensao-de-punho-com-barra",
    categoria: "antebraco",
    grupoMuscularPrincipal: "Antebraço",
    gruposSecundarios: [],
    descricao: "",
    nivel: "",
    equipamento: "Barra",
    local: "Academia",
    thumbnailUrl: hiperPunhoBarraJpg.url,
    gifUrl: hiperPunhoBarraGif.url,
    videoUrl: "",
    arquivoDownloadUrl: hiperPunhoBarraGif.url,
    seriesPadrao: "",
    repeticoesPadrao: "",
    duracaoPadrao: "",
    descansoPadrao: "",
    tags: [],
    publicado: true,
  },
  {
    id: "ex-hiperextensao-punho-halteres",
    nome: "Hiperextensão de punho com halteres",
    slug: "hiperextensao-de-punho-com-halteres",
    categoria: "antebraco",
    grupoMuscularPrincipal: "Antebraço",
    gruposSecundarios: [],
    descricao: "",
    nivel: "",
    equipamento: "Halteres",
    local: "Ambos",
    thumbnailUrl: hiperPunhoHalteresJpg.url,
    gifUrl: hiperPunhoHalteresGif.url,
    videoUrl: "",
    arquivoDownloadUrl: hiperPunhoHalteresGif.url,
    seriesPadrao: "",
    repeticoesPadrao: "",
    duracaoPadrao: "",
    descansoPadrao: "",
    tags: [],
    publicado: true,
  },
  {
    id: "ex-desvio-radial",
    nome: "Desvio radial",
    slug: "desvio-radial",
    categoria: "antebraco",
    grupoMuscularPrincipal: "Antebraço",
    gruposSecundarios: [],
    descricao: "",
    nivel: "",
    equipamento: "Halteres",
    local: "Ambos",
    thumbnailUrl: desvioRadialJpg.url,
    gifUrl: desvioRadialGif.url,
    videoUrl: "",
    arquivoDownloadUrl: desvioRadialGif.url,
    seriesPadrao: "",
    repeticoesPadrao: "",
    duracaoPadrao: "",
    descansoPadrao: "",
    tags: [],
    publicado: true,
  },
  {
    id: "ex-encolhimento-halteres",
    nome: "Encolhimento livre com halteres",
    slug: "encolhimento-livre-com-halteres",
    categoria: "trapezio",
    grupoMuscularPrincipal: "Trapézio",
    gruposSecundarios: [],
    descricao: "",
    nivel: "",
    equipamento: "Halteres",
    local: "Ambos",
    thumbnailUrl: encolhimentoHalteresJpg.url,
    gifUrl: encolhimentoHalteresGif.url,
    videoUrl: "",
    arquivoDownloadUrl: encolhimentoHalteresGif.url,
    seriesPadrao: "",
    repeticoesPadrao: "",
    duracaoPadrao: "",
    descansoPadrao: "",
    tags: [],
    publicado: true,
  },
  {
    id: "ex-encolhimento-maquina",
    nome: "Encolhimento na máquina",
    slug: "encolhimento-maquina",
    categoria: "trapezio",
    grupoMuscularPrincipal: "Trapézio",
    gruposSecundarios: [],
    descricao: "",
    nivel: "",
    equipamento: "Máquina",
    local: "Academia",
    thumbnailUrl: encolhimentoMaquinaJpg.url,
    gifUrl: encolhimentoMaquinaGif.url,
    videoUrl: "",
    arquivoDownloadUrl: encolhimentoMaquinaGif.url,
    seriesPadrao: "",
    repeticoesPadrao: "",
    duracaoPadrao: "",
    descansoPadrao: "",
    tags: [],
    publicado: true,
  },
];

export const getExercicio = (id: string) => exercicios.find((e) => e.id === id);
