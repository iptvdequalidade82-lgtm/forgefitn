export type FocoTreino = {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  variacoes: {
    nome: string;
    exercicioIds: string[];
  }[];
};

export const focosTreino: FocoTreino[] = [
  {
    id: "peito",
    nome: "Peitoral",
    categoria: "peito",
    descricao: "Duas combinações completas para trabalhar o peitoral.",
    variacoes: [
      {
        nome: "Opção 1 — barras e máquina",
        exercicioIds: [
          "ex-supino-inclinado-com-barra-no-banco",
          "ex-supino-reto-com-barra",
          "ex-crucifixo-no-cross-polia-alta",
          "ex-voador-na-maquina",
        ],
      },
      {
        nome: "Opção 2 — halteres e polia",
        exercicioIds: [
          "ex-supino-inclinado-com-halteres",
          "ex-supino-reto-com-halteres",
          "ex-crucifixo-baixo-no-cross-em-pe",
          "ex-crucifixo-inclinado-no-banco-com-halteres",
        ],
      },
    ],
  },
  {
    id: "triceps",
    nome: "Tríceps",
    categoria: "triceps",
    descricao: "Variações com barra, polia, banco e halteres.",
    variacoes: [
      {
        nome: "Opção 1 — polia e barra",
        exercicioIds: [
          "ex-triceps-extensao-de-cotovelo-unilateral-na-polia",
          "ex-triceps-testa-com-barra",
          "ex-triceps-frances-bilateral-no-cross",
          "ex-triceps-no-banco",
        ],
      },
      {
        nome: "Opção 2 — halteres e máquina",
        exercicioIds: [
          "ex-triceps-com-halteres-no-banco-reto",
          "ex-kick-back-na-polia",
          "ex-triceps-patada-com-halteres-em-pe",
          "ex-mergulho-na-maquina",
        ],
      },
    ],
  },
  {
    id: "costas",
    nome: "Costas",
    categoria: "costas",
    descricao: "Puxadas e remadas para um treino completo de costas.",
    variacoes: [
      {
        nome: "Opção 1 — puxadas e remadas",
        exercicioIds: [
          "ex-remada-curvada-com-barra",
          "ex-remada-baixa-pulley-pegada-aberta-supinada",
          "ex-pulley-pegada-aberta",
          "ex-remada-unilateral-apoio-banco",
        ],
      },
      {
        nome: "Opção 2 — variações no cabo",
        exercicioIds: [
          "ex-pulley-pegada-aberta-pronada",
          "ex-remada-baixa-unilateral-no-cross",
          "ex-remada-cavalinho-pegada-aberta",
          "ex-pull-over-na-polia-com-corda",
        ],
      },
    ],
  },
  {
    id: "biceps",
    nome: "Bíceps",
    categoria: "biceps",
    descricao: "Duas sequências com barra, banco, halteres e polia.",
    variacoes: [
      {
        nome: "Opção 1 — barra e halteres",
        exercicioIds: [
          "ex-rosca-no-scort",
          "ex-rosca-direta-barra-w",
          "ex-rosca-alternada-pegada-neutra",
          "ex-rosca-dierata-pegada-invertida-barra-w",
        ],
      },
      {
        nome: "Opção 2 — banco e polia",
        exercicioIds: [
          "ex-rosca-direta-no-cross-barra-w",
          "ex-rosca-no-banco-scort-barra-w",
          "ex-rosca-concentrada",
          "ex-biceps-polia-alta-dupla",
        ],
      },
    ],
  },
  {
    id: "pernas",
    nome: "Pernas",
    categoria: "pernas",
    descricao: "Quadríceps e posterior em duas opções equilibradas.",
    variacoes: [
      {
        nome: "Opção 1 — treino completo",
        exercicioIds: [
          "ex-agachamento-livre-com-barra",
          "ex-leg-press",
          "ex-cadeira-extensora",
          "ex-passada-com-halteres",
          "ex-mesa-flexora",
          "ex-stiff-com-barra",
        ],
      },
      {
        nome: "Opção 2 — variações unilaterais",
        exercicioIds: [
          "ex-agachamento-no-banco",
          "ex-agachamento-bulgaro-com-halteres",
          "ex-cadeira-flexora",
          "ex-mesa-flexora-unilateral",
          "ex-stiff-com-halteres",
          "ex-leg-press-pes-afastados",
        ],
      },
    ],
  },
  {
    id: "gluteos",
    nome: "Glúteos",
    categoria: "gluteos",
    descricao: "Movimentos de extensão, elevação e abdução de quadril.",
    variacoes: [
      {
        nome: "Opção 1 — academia",
        exercicioIds: [
          "ex-abducao-de-quadril-em-pe",
          "ex-elevacao-pelvica-livre",
          "ex-stiff-com-barra",
          "ex-extensao-de-quadril-em-pe-na-polia",
        ],
      },
      {
        nome: "Opção 2 — halteres e peso corporal",
        exercicioIds: [
          "ex-elevacao-pelvica-livre",
          "ex-extensao-de-quadril-em-pe",
          "ex-stiff-com-halteres",
          "ex-extensao-de-quadril-em-pe-joelhos-flexionados",
        ],
      },
    ],
  },
  {
    id: "ombros",
    nome: "Ombros",
    categoria: "ombros",
    descricao: "Desenvolvimentos e elevações para o ombro completo.",
    variacoes: [
      {
        nome: "Opção 1 — halteres e barra",
        exercicioIds: [
          "ex-desenvolvimento-com-halteres",
          "ex-elevacao-lateral-com-halteres",
          "ex-elevacao-frontal-com-barra",
          "ex-voador-invertido",
        ],
      },
      {
        nome: "Opção 2 — máquina e polia",
        exercicioIds: [
          "ex-desenvolvimento-na-maquina",
          "ex-elevacao-lateral-unilateral-no-cross",
          "ex-remada-alta-com-barra-no-cross",
          "ex-crucifixo-inverso-no-cross-em-pe",
        ],
      },
    ],
  },
];
