export type Categoria = {
  id: string;
  nome: string;
  slug: string;
  /** Emoji/ícone temporário — substituível quando os conteúdos reais chegarem */
  icone: string;
  exemplo?: boolean;
};

export const categorias: Categoria[] = [
  { id: "c1", nome: "Bíceps", slug: "biceps", icone: "💪" },
  { id: "c2", nome: "Tríceps", slug: "triceps", icone: "🦾" },
  { id: "c3", nome: "Peito", slug: "peito", icone: "🎯" },
  { id: "c4", nome: "Costas", slug: "costas", icone: "🔺" },
  { id: "c5", nome: "Ombros", slug: "ombros", icone: "🏋️" },
  { id: "c6", nome: "Abdômen", slug: "abdomen", icone: "🔥" },
  { id: "c7", nome: "Pernas", slug: "pernas", icone: "🦵" },
  { id: "c8", nome: "Glúteos", slug: "gluteos", icone: "🍑" },
  { id: "c9", nome: "Panturrilhas", slug: "panturrilhas", icone: "👟" },
  { id: "c10", nome: "Corpo todo", slug: "corpo-todo", icone: "⚡" },
  { id: "c11", nome: "Antebraço", slug: "antebraco", icone: "🤝" },
  { id: "c12", nome: "Trapézio", slug: "trapezio", icone: "🛡️" },
  { id: "c13", nome: "Lombar", slug: "lombar", icone: "🧱" },
];

export const niveis = ["Iniciante", "Intermediário", "Avançado"] as const;
export const locais = ["Casa", "Academia", "Ambos"] as const;
