import desafioInicioPdf from "@/assets/materiais/desafio-24-dias-inicio.pdf.asset.json";
import desafioInicioCapa from "@/assets/materiais/desafio-24-dias-inicio-capa.jpg.asset.json";
import desafioComoFuncionaPdf from "@/assets/materiais/desafio-24-dias-como-funciona.pdf.asset.json";
import desafioComoFuncionaCapa from "@/assets/materiais/desafio-24-dias-como-funciona-capa.jpg.asset.json";
import desafioPassosPdf from "@/assets/materiais/desafio-24-dias-siga-os-passos.pdf.asset.json";
import desafioPassosCapa from "@/assets/materiais/desafio-24-dias-siga-os-passos-capa.jpg.asset.json";
import emagrecimentoPdf from "@/assets/materiais/emagrecimento-sem-dietas.pdf.asset.json";
import emagrecimentoCapa from "@/assets/materiais/emagrecimento-sem-dietas-capa.jpg.asset.json";
import fomePdf from "@/assets/materiais/guia-dominando-a-fome.pdf.asset.json";
import fomeCapa from "@/assets/materiais/guia-dominando-a-fome-capa.jpg.asset.json";
import cardapioPdf from "@/assets/materiais/cardapio-comer-fora.pdf.asset.json";
import cardapioCapa from "@/assets/materiais/cardapio-comer-fora-capa.jpg.asset.json";
import receitas200Pdf from "@/assets/materiais/200-receitas-cafe-da-manha.pdf.asset.json";
import receitas200Capa from "@/assets/materiais/200-receitas-cafe-da-manha-capa.jpg.asset.json";
import receitas80Pdf from "@/assets/materiais/80-receitas-para-congelar.pdf.asset.json";
import receitas80Capa from "@/assets/materiais/80-receitas-para-congelar-capa.jpg.asset.json";

export type Material = {
  id: string;
  nome: string;
  categoria: "Desafio" | "Bônus" | "Cardápios" | "Receitas";
  paginas: number | null;
  capaUrl: string;
  arquivoUrl: string;
  arquivoTipo: "PDF";
  publicado: boolean;
};

export const materiais: Material[] = [
  {
    id: "mt-desafio-inicio",
    nome: "Desafio 24 Dias — Início",
    categoria: "Desafio",
    paginas: 27,
    capaUrl: desafioInicioCapa.url,
    arquivoUrl: desafioInicioPdf.url,
    arquivoTipo: "PDF",
    publicado: true,
  },
  {
    id: "mt-desafio-como-funciona",
    nome: "Desafio 24 Dias — Como Funciona",
    categoria: "Desafio",
    paginas: 14,
    capaUrl: desafioComoFuncionaCapa.url,
    arquivoUrl: desafioComoFuncionaPdf.url,
    arquivoTipo: "PDF",
    publicado: true,
  },
  {
    id: "mt-desafio-passos",
    nome: "Desafio 24 Dias — Siga os Passos",
    categoria: "Desafio",
    paginas: 2,
    capaUrl: desafioPassosCapa.url,
    arquivoUrl: desafioPassosPdf.url,
    arquivoTipo: "PDF",
    publicado: true,
  },
  {
    id: "mt-emagrecimento-sem-dietas",
    nome: "Emagrecimento Sem Dietas",
    categoria: "Bônus",
    paginas: 75,
    capaUrl: emagrecimentoCapa.url,
    arquivoUrl: emagrecimentoPdf.url,
    arquivoTipo: "PDF",
    publicado: true,
  },
  {
    id: "mt-dominando-a-fome",
    nome: "Guia Prático: Dominando a Fome",
    categoria: "Bônus",
    paginas: 72,
    capaUrl: fomeCapa.url,
    arquivoUrl: fomePdf.url,
    arquivoTipo: "PDF",
    publicado: true,
  },
  {
    id: "mt-cardapio-comer-fora",
    nome: "Cardápio para comer fora sem sair da dieta",
    categoria: "Cardápios",
    paginas: 8,
    capaUrl: cardapioCapa.url,
    arquivoUrl: cardapioPdf.url,
    arquivoTipo: "PDF",
    publicado: true,
  },
  {
    id: "mt-200-receitas-cafe",
    nome: "200 Receitas de Café da Manhã Nutritivas",
    categoria: "Receitas",
    paginas: 310,
    capaUrl: receitas200Capa.url,
    arquivoUrl: receitas200Pdf.url,
    arquivoTipo: "PDF",
    publicado: true,
  },
  {
    id: "mt-80-receitas-congelar",
    nome: "80 Receitas de Refeições Saudáveis para Congelar",
    categoria: "Receitas",
    paginas: 142,
    capaUrl: receitas80Capa.url,
    arquivoUrl: receitas80Pdf.url,
    arquivoTipo: "PDF",
    publicado: true,
  },
];

export const materiaisPorCategoria = (c: Material["categoria"]) =>
  materiais.filter((m) => m.publicado && m.categoria === c);
