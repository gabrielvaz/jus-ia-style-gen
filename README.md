# Jus IA - Gerador de Perfil de Estilo de Escrita

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16.0.5-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2.0-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
</div>

<br />

<p align="center">
  Uma landing page experimental que analisa o estilo de escrita de advogados a partir de documentos enviados e gera um perfil personalizado para o Jus IA.
</p>

## 📋 Sobre o Projeto

O **Jus IA Style Gen** é uma ferramenta que permite que advogados façam upload de seus documentos jurídicos (petições, pareceres, contratos, etc.) e recebam:

1. **Análise detalhada** do seu estilo de escrita
2. **Perfil visual** com gráficos mostrando características como formalidade, complexidade, densidade técnica
3. **System Prompt personalizado** pronto para configurar o Jus IA para escrever com o estilo do usuário

## ✨ Funcionalidades

- 📄 **Upload de Documentos**: Suporta PDF, DOCX e TXT (1-5 arquivos)
- 🧠 **Análise com IA**: Usa LLM via OpenRouter API para análise profunda do estilo
- 📊 **Visualizações**: Gráficos interativos (radar/bar charts) com Recharts
- 🎯 **System Prompt**: Geração automática de prompt personalizado
- 🔗 **Integração Jus IA**: Botão direto para testar o prompt no Jus IA
- 📱 **Responsivo**: Interface adaptável para desktop e mobile
- 🎨 **Design System Farol**: Interface seguindo o design system do Jus IA

## 🚀 Tecnologias

### Core
- **[Next.js 16.0.5](https://nextjs.org/)** - Framework React com App Router
- **[React 19.2.0](https://react.dev/)** - Com React Compiler habilitado
- **[TypeScript 5](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Estilização (via @tailwindcss/postcss)

### Processamento de Documentos
- **[pdf-parse](https://www.npmjs.com/package/pdf-parse)** - Extração de texto de PDFs
- **[mammoth](https://www.npmjs.com/package/mammoth)** - Extração de texto de DOCX

### Integração com IA
- **[OpenRouter API](https://openrouter.ai/)** - Acesso a LLMs (usando Grok 4.1 Fast)
- **[Axios](https://axios-http.com/)** - Cliente HTTP para chamadas de API

### UI & Visualização
- **[Recharts](https://recharts.org/)** - Gráficos de perfil de estilo
- **[Lucide React](https://lucide.dev/)** - Ícones
- **[clsx](https://www.npmjs.com/package/clsx)** + **[tailwind-merge](https://www.npmjs.com/package/tailwind-merge)** - Utilitários de classes

## 📦 Instalação

### Pré-requisitos

- Node.js 20+
- npm ou yarn

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/gabrielvaz/jus-ia-style-gen.git
cd jus-ia-style-gen
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```env
OPENROUTER_API_KEY=sk-or-v1-...
```

> **Nota:** A chave de API está disponível no arquivo `specs.md` ou você pode obter a sua em [OpenRouter](https://openrouter.ai/)

4. **Execute o servidor de desenvolvimento**
```bash
npm run dev
```

5. **Abra no navegador**
```
http://localhost:3000
```

## 🎯 Como Usar

### Fluxo do Usuário

1. **Tela Inicial (Landing)**
   - Explicação da ferramenta
   - Botão "Começar"

2. **Upload de Documentos**
   - Arraste e solte ou selecione 1-5 arquivos
   - Formatos aceitos: `.pdf`, `.docx`, `.txt`
   - Validação automática

3. **Processamento**
   - Loading com indicador de progresso
   - Análise do estilo com LLM

4. **Resultados**
   - Resumo textual do estilo
   - Gráficos de perfil (formalidade, complexidade, etc.)
   - System prompt copiável
   - Botão "Testar no Jus IA"

### Integração com Jus IA

O botão "Testar no Jus IA" abre uma nova conversa com o system prompt pré-preenchido:

```typescript
const url = `https://ia.jusbrasil.com.br/conversa?q=${encodeURIComponent(systemPrompt)}`;
window.open(url, '_blank');
```

Mais detalhes em [url-jus-ia.md](./url-jus-ia.md)

## 📁 Estrutura do Projeto

```
jus-ia-style-gen/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/
│   │   │   └── analyze-style/    # Endpoint de análise
│   │   │       └── route.ts
│   │   ├── layout.tsx            # Layout raiz
│   │   ├── page.tsx              # Página principal
│   │   └── globals.css           # Estilos globais + design tokens
│   ├── components/               # Componentes React
│   │   ├── steps/                # Componentes de cada etapa
│   │   ├── ui/                   # Componentes UI reutilizáveis
│   │   └── JusIALogo.tsx         # Logo do Jus IA
│   └── lib/                      # Utilitários e serviços
│       ├── openrouter.ts         # Cliente OpenRouter API
│       ├── text-extractor.ts     # Extração de texto de documentos
│       └── utils.ts              # Funções utilitárias
├── .env.local                    # Variáveis de ambiente (não commitado)
├── CLAUDE.md                     # Guia para Claude Code
├── JUS_IA_INTEGRATION.md        # Docs de integração com Jus IA
├── url-jus-ia.md                # Docs sobre URL do Jus IA
├── specs.md                      # Especificações completas
├── next.config.ts                # Configuração do Next.js
├── tailwind.config.ts            # Configuração do Tailwind
├── tsconfig.json                 # Configuração do TypeScript
└── package.json                  # Dependências
```

## 🎨 Design System

O projeto segue o **Farol Design System** do Jus IA:

### Cores
```css
--color-primary: #007A5F        /* Verde Farol */
--color-secondary: #0052CC      /* Azul para links */
--color-neutral-900: #1D1D1D    /* Texto principal */
--color-neutral-700: #4A4A4A    /* Texto corpo */
--color-error: #D93025          /* Erros */
--color-success: #34A853        /* Sucesso */
```

### Tipografia
- **Fonte:** Inter (via next/font/google)
- **Escalas:** Display (32px), H2 (24px), H3 (20px), Body (16px)

### Espaçamento
Sistema de 8pt: 4px, 8px, 16px, 24px, 32px, 40px, 64px

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Produção
npm run build        # Build de produção
npm start           # Inicia servidor de produção

# Qualidade de Código
npm run lint        # Executa ESLint
npx eslint .        # ESLint direto
```

## 🌐 API

### POST `/api/analyze-style`

Analisa documentos e retorna perfil de estilo.

**Input (FormData):**
- `files`: 1-5 arquivos (PDF, DOCX ou TXT)

**OU**

**Input (JSON):**
```json
{
  "text": "Texto para análise..."
}
```

**Output (JSON):**
```json
{
  "summary": "Resumo do estilo...",
  "dimensions": {
    "formalidade": 85,
    "complexidade_frases": 72,
    "densidade_tecnica": 90,
    "uso_citacoes": 78,
    "foco_fatos": 65,
    "foco_fundamentacao": 88
  },
  "bullets": [
    "Observação sobre o estilo...",
    "Outra característica..."
  ],
  "system_prompt": "Você é um assistente jurídico..."
}
```

### Modelo LLM Usado
- **Modelo:** `x-ai/grok-4.1-fast:free`
- **Provider:** OpenRouter
- **Formato:** JSON estruturado

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Documentação Adicional

- **[CLAUDE.md](./CLAUDE.md)** - Guia para desenvolvimento com Claude Code
- **[specs.md](./specs.md)** - Especificações completas do produto (em português)
- **[JUS_IA_INTEGRATION.md](./JUS_IA_INTEGRATION.md)** - Documentação técnica de integração
- **[url-jus-ia.md](./url-jus-ia.md)** - Como funciona a URL do Jus IA
- **[CHANGELOG.md](./CHANGELOG.md)** - Histórico de versões

## 🐛 Issues Conhecidos

- **Importação pdf-parse:** Usando importação dinâmica para contornar problemas de compatibilidade ESM/CommonJS no Turbopack

## 🔮 Próximas Funcionalidades

- [ ] Histórico de análises
- [ ] Comparação entre múltiplos perfis
- [ ] Export de relatórios em PDF
- [ ] Suporte a mais formatos de documento
- [ ] Análise incremental (adicionar mais documentos ao perfil)
- [ ] Autenticação e perfis de usuário

## 📄 Licença

Este projeto é um experimento interno do Jus IA.

## 👥 Autores

- **Gabriel Vaz** - [@gabrielvaz](https://github.com/gabrielvaz)

## 🙏 Agradecimentos

- Equipe Jus IA
- OpenRouter pela API de LLMs
- Comunidade Next.js

---

<p align="center">
  Feito com ❤️ para advogados
</p>
