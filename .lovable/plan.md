# Proteção simples dos treinos sem banco de dados

## Objetivo
Deixar o cronograma confiável e fácil de recuperar, sem login, mensalidade ou armazenamento externo.

## O que será feito
- Manter o salvamento automático no aparelho e mostrar claramente quando o treino foi salvo.
- Criar uma cópia de segurança automática local para recuperar a última versão válida se os dados principais forem corrompidos.
- Reunir em “Meu treino” ações simples para baixar uma cópia e restaurar uma cópia.
- Fazer o arquivo de backup incluir toda a semana, séries, repetições, duração, descanso, observações e progresso.
- Pedir confirmação antes de substituir o treino atual por um arquivo, evitando perdas acidentais.
- Explicar, em linguagem simples, que cada navegador tem dados separados e que a cópia permite trocar de aparelho.

## Detalhes técnicos
- Persistência local versionada e validada antes de carregar ou restaurar.
- Backup secundário no próprio navegador, sem envio para servidores.
- Importação compatível com os arquivos de cronograma já existentes.
- Validação após recarregar a página e em telas de celular e computador.
