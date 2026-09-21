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

const imagensPorSlug: Record<string, string> = {
  "salpicao-de-frango": "/images/receitas/salpicao-de-frango.webp",
};

const imagensPorCategoria = {
  assados: "/images/receitas/categoria-assados.webp",
  bebidas: "/images/receitas/categoria-bebidas.webp",
  bolos: "/images/receitas/categoria-bolos.webp",
  carnes: "/images/receitas/categoria-carnes.webp",
  frango: "/images/receitas/categoria-frango.webp",
  frutasIogurte: "/images/receitas/categoria-frutas-iogurte.webp",
  graos: "/images/receitas/categoria-graos.webp",
  legumes: "/images/receitas/categoria-legumes.webp",
  ovos: "/images/receitas/categoria-ovos.webp",
  panquecas: "/images/receitas/categoria-panquecas.webp",
  peixes: "/images/receitas/categoria-peixes.webp",
  saladas: "/images/receitas/categoria-saladas.webp",
  salgados: "/images/receitas/categoria-salgados.webp",
  sanduiches: "/images/receitas/categoria-sanduiches.webp",
  sobremesas: "/images/receitas/categoria-sobremesas.webp",
  sopas: "/images/receitas/categoria-sopas.webp",
} as const;

function imagemDaReceita(receita: Pick<Receita, "nome" | "slug" | "imagemUrl">) {
  const imagemExclusiva = imagensPorSlug[receita.slug];
  if (imagemExclusiva) return imagemExclusiva;
  if (receita.imagemUrl) return receita.imagemUrl;

  const nome = receita.nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");

  if (
    /bolo|brownie|cookie|biscoit|muffin|cupcake|broa|rabanada|pamonha|tareco|bolinho (de chuva|doce|de banana|de maca|de aveia)|pao de .*mel/.test(
      nome,
    )
  ) {
    return imagensPorCategoria.bolos;
  }

  if (
    /mousse|pudim|brigadeiro|trufa|sorvete|picole|beijinho|cajuzinho|pacoca|marzipa|suspiro|ganache|panna cotta|quindim|bombom|doce de|curd|leite condensado|creme de (chocolate|cacau)|nuvem de limao|arroz doce/.test(
      nome,
    )
  ) {
    return imagensPorCategoria.sobremesas;
  }

  if (/suco|smoothie|vitamina|shake|limonada|cha gelado|^cha |cafe gelado/.test(nome)) {
    return imagensPorCategoria.bebidas;
  }

  if (
    /^iogurte|salada de frutas|salada de duas frutas|^bowl de|^chia pudding|^papinha|^pure de banana|^banana com|^pasta de abacate|^creme de (abacate|mamao)/.test(
      nome,
    )
  ) {
    return imagensPorCategoria.frutasIogurte;
  }

  if (
    /\bsopa\b|\bcaldo\b|^creme de (cenoura|abobora|abobrinha|berinjela|alface|endivia|chuchu|couve-flor)|^creme frio/.test(
      nome,
    )
  ) {
    return imagensPorCategoria.sopas;
  }

  if (/salada/.test(nome)) return imagensPorCategoria.saladas;
  if (/omelete|\bovo\b|\bovos\b|fritada|poche|fortaia/.test(nome)) {
    return imagensPorCategoria.ovos;
  }

  if (
    /sanduiche|torrada|toast|tostex|wrap|bruschetta|croque monsieur|^pao\b|pao gratinado|pao de queijo|paozinho/.test(
      nome,
    )
  ) {
    return imagensPorCategoria.sanduiches;
  }

  if (/lasanha|pizza|torta|quiche|empadao|canelone|macarrao|nhoque|sufle/.test(nome)) {
    return imagensPorCategoria.assados;
  }

  if (/panqueca|panquequinha|crepioca|tapioca|aveioca|cuscuz|mingau/.test(nome)) {
    return imagensPorCategoria.panquecas;
  }

  if (
    /nugget|croquete|pastel|quibe|kibe|bolinho salgado|bolinho de aipim|espetinho|chips|enroladinho|empadinha/.test(
      nome,
    )
  ) {
    return imagensPorCategoria.salgados;
  }

  if (
    /arroz|feijoada|baiao|lentilha|grao[- ]de[- ]bico|farofa|tabule|ervilha|feijao|quinoa/.test(
      nome,
    )
  ) {
    return imagensPorCategoria.graos;
  }

  if (
    /peixe|salmao|atum|sardinha|camarao|cacao|truta|tilapia|bacalhau|polvo|anchova|saint peter|marisco|mexilhao|lula|moqueca/.test(
      nome,
    )
  ) {
    return imagensPorCategoria.peixes;
  }

  if (/frango|galinha|peru|fricasse/.test(nome)) return imagensPorCategoria.frango;

  if (
    /carne|bife|porco|lombo|bacon|presunto|linguica|salsicha|kafta|hamburguer|almondega|costela|moela|cordeiro|pernil/.test(
      nome,
    )
  ) {
    return imagensPorCategoria.carnes;
  }

  return imagensPorCategoria.legumes;
}

export const receitas: Receita[] = receitasGeradas.map((receita) => ({
  ...receita,
  imagemUrl: imagemDaReceita(receita),
  arquivoDownloadUrl: arquivosPorColecao[receita.colecao] ?? "",
}));

export const colecoesReceitas = Array.from(new Set(receitas.map((receita) => receita.colecao)));
