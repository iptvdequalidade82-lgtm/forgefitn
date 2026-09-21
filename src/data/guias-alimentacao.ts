import cardapioPdf from "@/assets/materiais/cardapio-comer-fora.pdf.asset.json";
import cardapioCapa from "@/assets/materiais/cardapio-comer-fora-capa.jpg.asset.json";
import emagrecimentoPdf from "@/assets/materiais/emagrecimento-sem-dietas.pdf.asset.json";
import emagrecimentoCapa from "@/assets/materiais/emagrecimento-sem-dietas-capa.jpg.asset.json";
import fomePdf from "@/assets/materiais/guia-dominando-a-fome.pdf.asset.json";
import fomeCapa from "@/assets/materiais/guia-dominando-a-fome-capa.jpg.asset.json";

export type GuiaAlimentacao = {
  id: string;
  titulo: string;
  tipo: "Cardápio" | "Guia";
  descricao: string;
  topicos: string[];
  paginas: number;
  capaUrl: string;
  arquivoUrl: string;
};

export const guiasAlimentacao: GuiaAlimentacao[] = [
  {
    id: "guia-comer-fora",
    titulo: "Como comer fora sem sair da dieta",
    tipo: "Cardápio",
    descricao:
      "Orientações práticas para planejar refeições fora de casa e fazer escolhas mais conscientes.",
    topicos: ["Hidratação", "Planejamento", "Proteínas", "Escolhas conscientes"],
    paginas: 8,
    capaUrl: cardapioCapa.url,
    arquivoUrl: cardapioPdf.url,
  },
  {
    id: "guia-emagrecimento-sem-dietas",
    titulo: "Emagrecimento sem dietas",
    tipo: "Guia",
    descricao:
      "Material de apoio sobre hábitos, organização alimentar e ferramentas para uma rotina mais equilibrada.",
    topicos: ["Hábitos", "Lista de compras", "Modelo de cardápio", "16 receitas"],
    paginas: 75,
    capaUrl: emagrecimentoCapa.url,
    arquivoUrl: emagrecimentoPdf.url,
  },
  {
    id: "guia-dominando-a-fome",
    titulo: "Guia prático: Dominando a fome",
    tipo: "Guia",
    descricao:
      "Leitura sobre sinais de fome, saciedade, alimentação emocional e comportamento alimentar.",
    topicos: ["Fome física", "Fome emocional", "Saciedade", "Comportamento alimentar"],
    paginas: 72,
    capaUrl: fomeCapa.url,
    arquivoUrl: fomePdf.url,
  },
];