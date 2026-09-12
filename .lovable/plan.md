# Fichas personalizadas interativas

## O que será construído
- Substituir a visualização em PDF da ficha personalizada por um montador dentro da tela **Planilhas**.
- Permitir escolher o foco do treino, começando por opções como peito, costas, braços, ombros, pernas e glúteos.
- Exibir duas variações prontas por grupo, baseadas no material enviado, com exercícios, séries, repetições e descanso visíveis.
- Permitir trocar exercícios por alternativas da mesma região antes de salvar.
- Escolher o dia da semana e adicionar o treino completo ao cronograma, com confirmação antes de substituir um dia que já tenha exercícios.
- Manter **Fichas de Treinos** como material em PDF e preservar o download original da ficha personalizada como opção secundária.

## Experiência
1. A pessoa toca em **Montar meu treino** na ficha personalizada.
2. Escolhe o grupo muscular e uma das variações.
3. Confere e ajusta os exercícios e parâmetros.
4. Seleciona o dia da semana.
5. Salva e pode iniciar o treino normalmente pelo cronograma.

## Detalhes técnicos
- Criar os modelos de treino em dados estruturados, vinculando-os aos exercícios reais já cadastrados.
- Criar um componente de montagem reutilizando os controles e o armazenamento local já existentes.
- Integrar diretamente com o cronograma atual, sem login ou banco de dados.
- Validar em celular e computador, incluindo abertura, troca de variação e aplicação no cronograma.
