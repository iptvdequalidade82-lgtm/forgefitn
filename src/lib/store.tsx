import * as React from "react";

export const STORAGE_KEY = "forgefit:v1";
export const STORAGE_BACKUP_KEY = "forgefit:v1:backup";

export type SituacaoSalvamento = "carregando" | "salvo" | "indisponivel";

export type ItemCronograma = {
  uid: string;
  exercicioId: string;
  series: string;
  repeticoes: string;
  duracao: string;
  descanso: string;
  observacao: string;
  concluido: boolean;
};

export type RefeicaoPlanejada = {
  uid: string;
  receitaId: string;
  refeicao: string;
};

export type DiaCronograma = {
  itens: ItemCronograma[];
  refeicoes: RefeicaoPlanejada[];
  concluido: boolean;
};

export type ForgeState = {
  version: number;
  cronograma: Record<number, DiaCronograma>;
  favoritos: { exercicios: string[]; receitas: string[]; planilhas: string[] };
  desafio: { concluidos: number[]; ultimoDia: number };
  prefs: { reduceMotion: boolean };
};

export type ForgeBackup = {
  aplicativo: "FORGEFIT";
  versaoBackup: 1;
  criadoEm: string;
  dados: ForgeState;
};

export const DIAS = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];
export const DIAS_CURTOS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

function diaVazio(): DiaCronograma {
  return { itens: [], refeicoes: [], concluido: false };
}

export function estadoInicial(): ForgeState {
  const cronograma: Record<number, DiaCronograma> = {};
  for (let d = 1; d <= 7; d++) cronograma[d] = diaVazio();
  return {
    version: 1,
    cronograma,
    favoritos: { exercicios: [], receitas: [], planilhas: [] },
    desafio: { concluidos: [], ultimoDia: 1 },
    prefs: { reduceMotion: false },
  };
}

export function normalizar(raw: unknown): ForgeState {
  const base = estadoInicial();
  if (!raw || typeof raw !== "object") return base;
  const s = raw as Partial<ForgeState>;
  const out = estadoInicial();
  if (s.cronograma && typeof s.cronograma === "object") {
    for (let d = 1; d <= 7; d++) {
      const dia = (s.cronograma as Record<number, DiaCronograma>)[d];
      if (dia && Array.isArray(dia.itens)) {
        out.cronograma[d] = {
          itens: dia.itens.map((i) => ({
            uid: i.uid ?? crypto.randomUUID(),
            exercicioId: String(i.exercicioId ?? ""),
            series: String(i.series ?? ""),
            repeticoes: String(i.repeticoes ?? ""),
            duracao: String(i.duracao ?? ""),
            descanso: String(i.descanso ?? ""),
            observacao: String(i.observacao ?? ""),
            concluido: Boolean(i.concluido),
          })),
          refeicoes: Array.isArray(dia.refeicoes) ? dia.refeicoes : [],
          concluido: Boolean(dia.concluido),
        };
      }
    }
  }
  if (s.favoritos) {
    out.favoritos = {
      exercicios: s.favoritos.exercicios ?? [],
      receitas: s.favoritos.receitas ?? [],
      planilhas: s.favoritos.planilhas ?? [],
    };
  }
  if (s.desafio) {
    out.desafio = {
      concluidos: (s.desafio.concluidos ?? []).filter(
        (n: number) => Number.isInteger(n) && n >= 1 && n <= 24,
      ),
      ultimoDia: s.desafio.ultimoDia ?? 1,
    };
  }
  if (s.prefs) out.prefs = { reduceMotion: Boolean(s.prefs.reduceMotion) };
  return out;
}

function possuiCronograma(raw: unknown): boolean {
  if (!raw || typeof raw !== "object") return false;
  const valor = raw as Record<string, unknown>;
  return Boolean(valor["cronograma"] && typeof valor["cronograma"] === "object");
}

export function criarBackup(state: ForgeState): ForgeBackup {
  return {
    aplicativo: "FORGEFIT",
    versaoBackup: 1,
    criadoEm: new Date().toISOString(),
    dados: state,
  };
}

export function lerBackup(raw: unknown): ForgeState | null {
  if (!raw || typeof raw !== "object") return null;
  const valor = raw as Record<string, unknown>;
  const candidato = valor["dados"] ?? valor["state"] ?? raw;
  if (possuiCronograma(candidato)) return normalizar(candidato);

  const cronograma = valor["cronograma"];
  if (cronograma && typeof cronograma === "object") {
    return normalizar({ cronograma });
  }
  return null;
}

type Ctx = {
  state: ForgeState;
  hidratado: boolean;
  situacaoSalvamento: SituacaoSalvamento;
  ultimoSalvamento: Date | null;
  setState: React.Dispatch<React.SetStateAction<ForgeState>>;
  toggleFavorito: (tipo: keyof ForgeState["favoritos"], id: string) => void;
  isFavorito: (tipo: keyof ForgeState["favoritos"], id: string) => boolean;
  adicionarAoDia: (dia: number, item: Omit<ItemCronograma, "uid" | "concluido">) => void;
  atualizarItem: (dia: number, uid: string, patch: Partial<ItemCronograma>) => void;
  removerItem: (dia: number, uid: string) => void;
  moverItem: (dia: number, uid: string, delta: number) => void;
  reordenarItens: (dia: number, from: number, to: number) => void;
  limparDia: (dia: number) => void;
  copiarDia: (origem: number, destino: number) => void;
  duplicarSemana: (origem: number) => void;
  marcarDiaConcluido: (dia: number, valor: boolean) => void;
  adicionarRefeicao: (dia: number, receitaId: string, refeicao: string) => void;
  removerRefeicao: (dia: number, uid: string) => void;
  toggleDesafio: (dia: number) => void;
  resetar: () => void;
  importar: (data: unknown) => boolean;
};

const ForgeContext = React.createContext<Ctx | null>(null);

export function ForgeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<ForgeState>(estadoInicial);
  const [hidratado, setHidratado] = React.useState(false);
  const [situacaoSalvamento, setSituacaoSalvamento] =
    React.useState<SituacaoSalvamento>("carregando");
  const [ultimoSalvamento, setUltimoSalvamento] = React.useState<Date | null>(null);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const restaurado = lerBackup(JSON.parse(raw));
        if (restaurado) setState(restaurado);
      }
    } catch {
      try {
        const reserva = localStorage.getItem(STORAGE_BACKUP_KEY);
        if (reserva) {
          const restaurado = lerBackup(JSON.parse(reserva));
          if (restaurado) setState(restaurado);
        }
      } catch {
        /* usa o estado inicial quando as duas cópias estão corrompidas */
      }
    }
    setHidratado(true);
  }, []);

  React.useEffect(() => {
    if (!hidratado) return;
    try {
      const atual = JSON.stringify(state);
      localStorage.setItem(STORAGE_BACKUP_KEY, atual);
      localStorage.setItem(STORAGE_KEY, atual);
      setSituacaoSalvamento("salvo");
      setUltimoSalvamento(new Date());
    } catch {
      setSituacaoSalvamento("indisponivel");
    }
  }, [state, hidratado]);

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset["reduceMotion"] = String(state.prefs.reduceMotion);
  }, [state.prefs.reduceMotion]);

  const value = React.useMemo<Ctx>(() => {
    const mutarDia = (dia: number, fn: (d: DiaCronograma) => DiaCronograma) =>
      setState((s) => ({
        ...s,
        cronograma: { ...s.cronograma, [dia]: fn(s.cronograma[dia] ?? diaVazio()) },
      }));

    return {
      state,
      hidratado,
      situacaoSalvamento,
      ultimoSalvamento,
      setState,
      toggleFavorito: (tipo, id) =>
        setState((s) => {
          const lista = s.favoritos[tipo];
          return {
            ...s,
            favoritos: {
              ...s.favoritos,
              [tipo]: lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id],
            },
          };
        }),
      isFavorito: (tipo, id) => state.favoritos[tipo].includes(id),
      adicionarAoDia: (dia, item) =>
        mutarDia(dia, (d) => ({
          ...d,
          itens: [...d.itens, { ...item, uid: crypto.randomUUID(), concluido: false }],
        })),
      atualizarItem: (dia, uid, patch) =>
        mutarDia(dia, (d) => ({
          ...d,
          itens: d.itens.map((i) => (i.uid === uid ? { ...i, ...patch } : i)),
        })),
      removerItem: (dia, uid) =>
        mutarDia(dia, (d) => ({ ...d, itens: d.itens.filter((i) => i.uid !== uid) })),
      moverItem: (dia, uid, delta) =>
        mutarDia(dia, (d) => {
          const idx = d.itens.findIndex((i) => i.uid === uid);
          const alvo = idx + delta;
          if (idx < 0 || alvo < 0 || alvo >= d.itens.length) return d;
          const itens = [...d.itens];
          const [m] = itens.splice(idx, 1);
          if (!m) return d;
          itens.splice(alvo, 0, m);
          return { ...d, itens };
        }),
      reordenarItens: (dia, from, to) =>
        mutarDia(dia, (d) => {
          if (from === to || from < 0 || to < 0 || from >= d.itens.length) return d;
          const itens = [...d.itens];
          const [m] = itens.splice(from, 1);
          if (!m) return d;
          itens.splice(Math.min(to, itens.length), 0, m);
          return { ...d, itens };
        }),
      limparDia: (dia) => mutarDia(dia, () => diaVazio()),
      copiarDia: (origem, destino) =>
        setState((s) => {
          const src = s.cronograma[origem] ?? diaVazio();
          return {
            ...s,
            cronograma: {
              ...s.cronograma,
              [destino]: {
                itens: src.itens.map((i) => ({
                  ...i,
                  uid: crypto.randomUUID(),
                  concluido: false,
                })),
                refeicoes: src.refeicoes.map((r) => ({ ...r, uid: crypto.randomUUID() })),
                concluido: false,
              },
            },
          };
        }),
      duplicarSemana: (origem) =>
        setState((s) => {
          const src = s.cronograma[origem] ?? diaVazio();
          const cronograma: Record<number, DiaCronograma> = {};
          for (let d = 1; d <= 7; d++) {
            cronograma[d] = {
              itens: src.itens.map((i) => ({
                ...i,
                uid: crypto.randomUUID(),
                concluido: false,
              })),
              refeicoes: src.refeicoes.map((r) => ({ ...r, uid: crypto.randomUUID() })),
              concluido: false,
            };
          }
          return { ...s, cronograma };
        }),
      marcarDiaConcluido: (dia, valor) =>
        mutarDia(dia, (d) => ({
          ...d,
          concluido: valor,
          itens: d.itens.map((i) => ({ ...i, concluido: valor ? true : i.concluido })),
        })),
      adicionarRefeicao: (dia, receitaId, refeicao) =>
        mutarDia(dia, (d) => ({
          ...d,
          refeicoes: [...d.refeicoes, { uid: crypto.randomUUID(), receitaId, refeicao }],
        })),
      removerRefeicao: (dia, uid) =>
        mutarDia(dia, (d) => ({
          ...d,
          refeicoes: d.refeicoes.filter((r) => r.uid !== uid),
        })),
      toggleDesafio: (dia) =>
        setState((s) => {
          const has = s.desafio.concluidos.includes(dia);
          return {
            ...s,
            desafio: {
              concluidos: has
                ? s.desafio.concluidos.filter((d) => d !== dia)
                : [...s.desafio.concluidos, dia].sort((a, b) => a - b),
              ultimoDia: dia,
            },
          };
        }),
      resetar: () => {
        try {
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem(STORAGE_BACKUP_KEY);
        } catch {
          /* ignora */
        }
        setState(estadoInicial());
      },
      importar: (data) => {
        try {
          const parsed = lerBackup(data);
          if (!parsed) return false;
          setState(parsed);
          return true;
        } catch {
          return false;
        }
      },
    };
  }, [state, hidratado, situacaoSalvamento, ultimoSalvamento]);

  return <ForgeContext.Provider value={value}>{children}</ForgeContext.Provider>;
}

export function useForge() {
  const ctx = React.useContext(ForgeContext);
  if (!ctx) throw new Error("useForge deve ser usado dentro de ForgeProvider");
  return ctx;
}
