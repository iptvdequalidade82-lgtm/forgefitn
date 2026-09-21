# Organizar a biblioteca de receitas e alimentação

## Objetivo

Transformar a aba **Receitas** em uma biblioteca prática, reunindo as receitas reais, cardápios e guias enviados, sem misturar conteúdos diferentes nem inventar informações ausentes.

## O que será feito

- Extrair e revisar títulos, ingredientes, preparo, rendimento e tempo apenas quando essas informações estiverem nos PDFs.
- Substituir as receitas de exemplo pelas receitas reais e identificar a coleção de origem de cada uma.
- Organizar a página em três áreas claras: **Receitas**, **Cardápios** e **Guias para emagrecer**.
- Melhorar busca e filtros por refeição, categoria, coleção e tempo de preparo.
- Criar uma leitura interna organizada para cada receita, com ingredientes, preparo e acesso ao livro original.
- Exibir os cardápios e guias como materiais de apoio, com descrição objetiva e opção de abrir ou baixar o PDF completo.
- Manter oculto qualquer arquivo incompleto; o PDF “300 Receitas Anabólicas” só será publicado se realmente contiver as receitas.
- Ajustar a página para leitura simples por pessoas de qualquer idade, com textos claros, botões evidentes e bom uso no celular.

## Organização proposta

```text
Receitas
├── Buscar e filtrar
├── Todas as receitas
├── Café da manhã
├── Refeições para congelar
├── Fit
└── Low carb

Cardápios
└── Comer fora sem sair da dieta

Guias para emagrecer
├── Emagrecimento sem dietas
└── Dominando a fome
```

## Detalhes técnicos

- Os PDFs continuarão servidos pelos arquivos já associados ao projeto.
- O catálogo estruturado ficará nos dados locais do aplicativo, sem banco de dados.
- A extração terá validações para evitar títulos, ingredientes ou passos quebrados por páginas em duas colunas.
- A página manterá favoritos e a opção de adicionar uma receita ao planejamento semanal.
- Serão conferidos funcionamento, conteúdo visível e navegação em telas de celular e computador.