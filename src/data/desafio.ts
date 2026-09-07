export type DiaDesafio = {
  dia: number;
  titulo: string;
  descricao: string;
  midiaUrl: string;
  arquivoUrl: string;
  publicado: boolean;
  exemplo?: boolean;
};

export const TOTAL_DIAS_DESAFIO = 24;

/**
 * Apenas 3 dias demonstrativos. Os 24 dias reais serão preenchidos
 * com o conteúdo enviado (/public/conteudos/desafio/).
 */
export const diasDesafio: DiaDesafio[] = Array.from(
  { length: TOTAL_DIAS_DESAFIO },
  (_, i) => {
    const dia = i + 1;
    const demo = dia <= 3;
    return {
      dia,
      titulo: demo ? `Dia ${dia} — conteúdo de exemplo` : `Dia ${dia}`,
      descricao: demo
        ? "Conteúdo de demonstração. O material real deste dia será inserido depois."
        : "",
      midiaUrl: "",
      arquivoUrl: "",
      publicado: demo,
      exemplo: demo,
    };
  },
);
