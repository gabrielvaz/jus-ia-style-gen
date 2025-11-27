Você é um agente de IA desenvolvedor(a) full-stack especializado(a) em criar protótipos funcionais de produtos digitais usando LLMs via API do OpenRouter.

Sua tarefa é criar **um protótipo completo e funcional** (front + back) de uma **landing page experimental** para o Jus IA, com o objetivo de:

1. Permitir que o usuário (advogado) faça upload de **1 a 5 documentos** escritos por ele.
2. Usar um LLM via **API do OpenRouter** para:
   - Entender o **estilo de escrita** desse advogado.
   - Gerar um **perfil visual** desse estilo (com gráficos simples na interface).
   - Gerar um **prompt de sistema** que será usado depois para personalizar o Jus IA para esse usuário.
3. Entregar uma experiência completa de ponta a ponta: do upload ao resultado, tudo navegável em browser.

---

### 1. Setup técnico do sistema

Defina e implemente o sistema com as seguintes características:

- **Stack sugerida (padrão, salvo se você tiver motivo forte para outra):**
  - Front-end: framework moderno baseado em React (por exemplo, Next.js com TypeScript).
  - Back-end: API em Node.js/TypeScript dentro do próprio framework (ex.: rotas /api do Next).
  - Estilização: CSS moderno (Tailwind ou CSS Modules) com visual limpo e neutro, sem firulas.
  - Gráficos: pode usar uma biblioteca simples (por exemplo, Chart.js, Recharts ou similar).

- **Integração com OpenRouter:**
  - Usar a API do OpenRouter para chamar um LLM adequado a análise de texto e geração de prompts.
  - A chave de API deve ser lida de uma variável de ambiente, por exemplo: `OPENROUTER_API_KEY`.
  - Encapsular a chamada ao LLM em uma função clara, por exemplo: `analyzeWritingStyle(corpus: string): Promise<AnalysisResult>`.

- **Upload e processamento de arquivos:**
  - Aceitar **1 a 5 documentos**.
  - Tipos suportados: `.pdf`, `.docx`, `.txt`.
  - Extrair o texto de cada arquivo no back-end:
    - PDF: usar uma lib padrão de extração de texto.
    - DOCX: usar lib de leitura de docx.
    - TXT: leitura direta do conteúdo.
  - Concatenar os textos em um único `corpus` com separadores entre documentos (para o LLM entender que são textos distintos, mas do mesmo autor).

- **Estrutura geral do projeto:**
  - Código organizado com pastas claras para páginas, componentes, serviços de API e integrações com OpenRouter.
  - Incluir um `README.md` explicando:
    - Como rodar o projeto localmente.
    - Quais variáveis de ambiente são necessárias.
    - Como configurar a chave do OpenRouter.

---

### 2. Fluxo da experiência do usuário e telas

Implemente o fluxo como um pequeno “wizard” dentro de uma landing page experimental.

#### Tela 1 – Landing / Introdução

Objetivo: explicar o valor da ferramenta e incentivar o upload dos documentos.

Elementos obrigatórios:

- Título claro, orientado ao advogado, por exemplo:
  - “Faça o Jus IA escrever com o seu estilo”.
- Subtítulo explicando em 1–2 frases:
  - Ex.: “Envie de 1 a 5 documentos que você já escreveu e nós vamos analisar seu estilo de escrita para personalizar o Jus IA para você.”
- Bloco de explicação em 3 bullets simples:
  1. Você faz o upload de peças ou documentos já escritos.
  2. O sistema analisa seu tom, estrutura, vocabulário e forma de argumentar.
  3. Você recebe um **perfil visual do seu estilo** + um **prompt de sistema** pronto para configurar o Jus IA.
- CTA principal:
  - Botão: “Começar” que leva para a etapa de upload (pode ser na mesma página, com scroll ou navegação de etapas).

#### Tela 2 – Upload de documentos

Objetivo: coletar material suficiente para o LLM aprender o estilo.

Elementos obrigatórios:

- Título da etapa: “Envie seus documentos”.
- Instruções curtas:
  - “Envie de 1 a 5 documentos que você escreveu (petições, pareceres, contratos, etc.).”
  - “Formatos aceitos: PDF, DOCX, TXT.”
- Componente de upload:
  - Área de arrastar e soltar + botão “Selecionar arquivos”.
  - Lista dos arquivos selecionados, com:
    - Nome do arquivo.
    - Tamanho aproximado.
    - Opção de remover arquivo.
- Restrições:
  - Bloquear o botão de avanço se:
    - Há 0 arquivos.
    - Há mais de 5 arquivos.
  - Validar tipos de arquivo antes de enviar.
- Ações:
  - Botão “Analisar estilo de escrita”:
    - Ao clicar, enviar os arquivos para a API.
    - Exibir um estado de carregamento e seguir para a próxima etapa.

#### Tela 3 – Processamento / Loading

Objetivo: dar feedback enquanto o LLM analisa o estilo.

Elementos obrigatórios:

- Mensagem de estado:
  - “Estamos analisando seu estilo de escrita…”
- Texto explicativo do que está acontecendo:
  - “Estamos lendo seus documentos, identificando padrão de vocabulário, tom, estrutura das peças e forma de argumentar, para criar um perfil de escrita e um prompt de sistema personalizado.”
- Indicador visual de progresso:
  - Pode ser um spinner, barra de progresso falsa ou steps animados.
- Essa tela deve desaparecer assim que a resposta da API com a análise estiver pronta, redirecionando para a Tela 4.

#### Tela 4 – Resultado: Perfil de Estilo + Prompt de Sistema

Objetivo: apresentar de forma clara e acionável o que o sistema aprendeu e o prompt final.

Divida a tela em três blocos principais.

**Bloco 1 – Resumo textual do estilo**

- Título: “Resumo do seu estilo de escrita”.
- Parágrafo curto resumindo o estilo, por exemplo:
  - “Você escreve com tom altamente formal, frases longas, forte uso de citações de jurisprudência e estrutura consistente em três partes: relato dos fatos, fundamentação e pedidos.”
- Lista de 4 a 6 itens descrevendo dimensões do estilo, por exemplo:
  - Tom: mais formal ↔ mais coloquial.
  - Objetividade vs detalhamento.
  - Densidade de termos técnicos.
  - Frequência de citações (jurisprudência, artigos de lei, doutrina).
  - Estrutura típica das peças (uso de tópicos, seções, títulos).
  - Postura argumentativa (mais combativo, mais conciliador, mais explicativo etc.).
- Esses textos são gerados pelo LLM com base no corpus.

**Bloco 2 – Visualizações gráficas**

- Título: “Visualização do seu perfil”.
- Renderizar 1 ou 2 gráficos simples (pode ser um gráfico de radar ou barras) com eixos como:
  - Formalidade (0–100).
  - Complexidade das frases.
  - Densidade técnica.
  - Foco em fundamentação vs narrativa de fatos.
  - Uso de citações externas.
- Os valores devem vir da resposta da API em formato estruturado (por exemplo, um JSON com campos numéricos para cada dimensão).
- A ideia não é ter cientificidade perfeita, mas um **espelho visual intuitivo** do estilo.

**Bloco 3 – Prompt de sistema para personalizar o Jus IA**

- Título: “Prompt de sistema para o Jus IA escrever como você”.
- Campo de texto somente leitura (textarea) com o prompt completo gerado pelo LLM.
- Botão “Copiar prompt”.
- O prompt deve:
  - Ser escrito em português.
  - Assumir que será usado como **System Prompt** do Jus IA.
  - Descrever explicitamente:
    - Como o modelo deve escrever (tom, estrutura, nível de formalidade, uso de citações etc.).
    - O que deve evitar (ex.: evitar jargão excessivo, evitar redundância, evitar simplificações demais).
    - Exemplos de instruções, por exemplo:
      - “Mantenha o tom [formalidade X], organize as peças em [estrutura Y], use citações de jurisprudência quando pertinente, seguindo o padrão observado nos textos do usuário.”
  - Incluir uma seção do tipo:
    - “Regra fixa: nunca contradiga o estilo base deste usuário, a menos que ele explicitamente peça para mudar o tom.”

Opcional, mas desejável:

- Pequeno texto abaixo do prompt:
  - “Use este prompt como configuração de sistema do Jus IA para este usuário. No futuro, essa etapa será integrada automaticamente ao perfil da conta.”

---

### 3. Contrato de API e formato da resposta do LLM

Implemente uma rota de API (por exemplo, `POST /api/analyze-style`) que:

1. Recebe os arquivos enviados.
2. Extrai o texto e monta um `corpus` único.
3. Faz uma chamada ao OpenRouter com um prompt de análise de estilo.
4. Retorna um JSON no seguinte formato (exemplo de contrato):

```json
{
  "summary": "string – resumo em texto corrido do estilo de escrita",
  "dimensions": {
    "formalidade": 0,
    "complexidade_frases": 0,
    "densidade_tecnica": 0,
    "uso_citacoes": 0,
    "foco_fatos": 0,
    "foco_fundamentacao": 0
  },
  "bullets": [
    "string – bullet explicando um aspecto do estilo",
    "string – outro aspecto"
  ],
  "system_prompt": "string – prompt completo para ser usado como System Prompt do Jus IA"
}

Instruções para o prompt que você (agente) enviará ao LLM via OpenRouter:
	•	Passar o corpus completo.
	•	Pedir explicitamente:
	•	Uma análise detalhada do estilo de escrita.
	•	Um resumo em texto corrido.
	•	Um conjunto de dimensões com valores entre 0–100 (ou 0–10) que possam ser mapeadas em gráficos.
	•	Uma lista de bullets com observações práticas.
	•	Um system_prompt pronto, no formato de instruções para outro LLM.

Garanta que a resposta do LLM seja estritamente estruturada em JSON, sem texto solto fora do JSON.

⸻

4. O que você deve entregar

Ao final, entregue:
	1.	O código completo do protótipo (front + back), pronto para rodar localmente.
	2.	Um README.md com:
	•	Como instalar dependências.
	•	Como configurar OPENROUTER_API_KEY.
	•	Como rodar o projeto (ex.: npm install / npm run dev).
	3.	Instruções rápidas na própria landing page explicando:
	•	O que é esse experimento.
	•	Que o objetivo é criar um perfil de escrita para personalizar o Jus IA.
	4.	Certifique-se de que:
	•	O fluxo é navegável ponta a ponta.
	•	Não há etapas “mockadas” sem funcionalidade real (deve chamar de fato o LLM via OpenRouter, ainda que com um modelo barato).

Chave de API do OpenRouter:
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

Use o modelo: x-ai/grok-4.1-fast:free

Use esse estilo no frontend: # Farol Design System – Folha de Estilo

## Paleta de Cores

| Token                 | Hex      | Uso principal                                |
|-----------------------|----------|----------------------------------------------|
| `--color-primary`     | #007A5F  | Botões principais, destaques (verde Farol)   |
| `--color-primary-50`  | #E6F4EF  | Fundo de estados leves do primário           |
| `--color-secondary`   | #0052CC  | Links, ações secundárias                     |
| `--color-neutral-900` | #1D1D1D  | Títulos, texto forte                         |
| `--color-neutral-700` | #4A4A4A  | Texto padrão                                 |
| `--color-neutral-500` | #8A8A8A  | Texto secundário, placeholders               |
| `--color-neutral-200` | #E5E5E5  | Bordas, divisores                            |
| `--color-neutral-50`  | #FAFAFA  | Fundo neutro, cards                          |
| `--color-error`       | #D93025  | Alertas e estados de erro                    |
| `--color-success`     | #34A853  | Mensagens de sucesso                         |

---

## Tipografia

- **Fonte primária**: `Inter`, `sans-serif`

### Escalas
- Display / H1: `32px` / `semibold`
- H2: `24px` / `semibold`
- H3: `20px` / `medium`
- Body: `16px` / `regular`
- Small: `14px` / `regular`
- Caption: `12px` / `regular`

### Cor do texto
- Primário: `var(--color-neutral-900)`
- Secundário: `var(--color-neutral-700)`
- Placeholder: `var(--color-neutral-500)`

---

## Espaçamento & Grid

- **Spacing scale (8pt system)**:
  - `4px` – tight
  - `8px` – xs
  - `16px` – sm
  - `24px` – md
  - `32px` – lg
  - `40px` – xl
  - `64px` – xxl

- **Container width**: Máximo `1200px` (centralizado)

---

## Componentes

### Botões

**Primário**
- Fundo: `var(--color-primary)`
- Texto: branco
- Raio: `8px`
- Padding: `12px 20px`
- Hover: `darken(--color-primary, 8%)`
- Disabled: `var(--color-neutral-200)`

**Secundário**
- Fundo: branco
- Borda: `1px solid var(--color-neutral-200)`
- Texto: `var(--color-neutral-900)`
- Hover: fundo `var(--color-neutral-50)`

---

### Inputs & Busca

- Altura: `44px`
- Padding: `12px`
- Borda: `1px solid var(--color-neutral-200)`
- Raio: `8px`
- Placeholder: `var(--color-neutral-500)`
- Estado ativo: `1px solid var(--color-primary)`

---

### Cards

- Fundo: branco
- Raio: `12px`
- Borda: `1px solid var(--color-neutral-200)`
- Sombra leve: `0 1px 3px rgba(0,0,0,0.08)`
- Padding interno: `16px – 24px`

---

### Tabelas / Histórico

- Linha divisória: `1px solid var(--color-neutral-200)`
- Alternância de linhas: `var(--color-neutral-50)`
- Texto de data: `small, var(--color-neutral-500)`

---

### Tags / Status

- **Ativo**: fundo `var(--color-primary-50)`, texto `var(--color-primary)`
- **Erro**: fundo `#FCE8E6`, texto `var(--color-error)`
- **Neutro**: fundo `var(--color-neutral-50)`, texto `var(--color-neutral-700)`

---

## Responsividade

- **Mobile first**: breakpoints em `480px`, `768px`, `1024px`, `1440px`
- Navegação e cards colapsam em colunas únicas no mobile
- Inputs e botões em largura total no mobile