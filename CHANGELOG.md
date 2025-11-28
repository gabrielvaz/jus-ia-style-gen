# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [0.1.0] - 2025-01-28

### 🎉 Lançamento Inicial

Primeira versão funcional do Gerador de Perfil de Estilo para o Jus IA.

### ✨ Adicionado

#### Core Features
- **Wizard de 4 etapas**: Landing → Upload → Processing → Results
- **Upload de documentos**: Suporte para PDF, DOCX e TXT (1-5 arquivos)
- **Análise via LLM**: Integração com OpenRouter API usando Grok 4.1 Fast
- **Perfil visual**: Gráficos de radar e barras mostrando dimensões do estilo
- **System Prompt personalizado**: Geração automática de prompt para Jus IA
- **Integração Jus IA**: Botão "Testar no Jus IA" que abre conversa com prompt pré-preenchido

#### Componentes UI
- `LandingStep`: Tela inicial com explicação e CTA
- `UploadStep`: Upload com drag-and-drop e opção de texto direto
- `ProcessingStep`: Loading animado durante análise
- `ResultStep`: Exibição de resultados com gráficos e prompt
- `JusIALogo`: Componente com logo oficial do Jus IA
- Componentes base: `Button`, `Card`, `Input`, `ProgressBar`

#### API & Backend
- Endpoint `/api/analyze-style`: Processa documentos ou texto
- Extração de texto de PDF, DOCX e TXT
- Cliente OpenRouter com prompts otimizados
- Validação de arquivos e tipos suportados
- Tratamento de erros robusto

#### Design System
- Implementação completa do Farol Design System
- Tokens de cores definidos em CSS custom properties
- Sistema de espaçamento 8pt
- Tipografia com fonte Inter
- Componentes responsivos mobile-first

#### Documentação
- `README.md`: Documentação completa do projeto
- `CLAUDE.md`: Guia para desenvolvimento com Claude Code
- `JUS_IA_INTEGRATION.md`: Documentação técnica de integração
- `url-jus-ia.md`: Especificação da URL do Jus IA
- `specs.md`: Especificações completas do produto
- `CHANGELOG.md`: Este arquivo

### 🔧 Tecnologias

- **Framework**: Next.js 16.0.5 (App Router)
- **React**: 19.2.0 (com React Compiler)
- **TypeScript**: 5 (modo strict)
- **Styling**: Tailwind CSS 4
- **LLM**: OpenRouter API (Grok 4.1 Fast Free)
- **Document Processing**: pdf-parse, mammoth
- **Charts**: Recharts
- **Icons**: Lucide React

### 🐛 Correções

- **pdf-parse ESM import**: Resolvido com importação dinâmica para compatibilidade com Turbopack
- **Validação de arquivos**: Adicionado suporte para múltiplos MIME types de DOCX

### 📝 Notas Técnicas

#### Compatibilidade
- Node.js 20+ requerido
- Testado em Chrome, Firefox, Safari
- Suporte mobile completo

#### Limitações Conhecidas
- URLs do Jus IA limitadas a ~2000 caracteres para compatibilidade
- Importação pdf-parse usa dynamic import devido a problemas ESM/CommonJS

#### Variáveis de Ambiente
```env
OPENROUTER_API_KEY=sk-or-v1-...
```

### 🎨 Design Highlights

- **Cores primárias**:
  - Verde Farol: `#007A5F`
  - Azul secundário: `#0052CC`
- **Tipografia**: Inter family via next/font/google
- **Breakpoints**: 480px, 768px, 1024px, 1440px
- **Espaçamento**: Sistema 8pt (4, 8, 16, 24, 32, 40, 64px)

### 📊 Dimensões Analisadas

O sistema analisa as seguintes dimensões de estilo (0-100):
1. **Formalidade**: Tom formal vs. coloquial
2. **Complexidade de frases**: Estruturas simples vs. complexas
3. **Densidade técnica**: Uso de termos técnicos jurídicos
4. **Uso de citações**: Frequência de jurisprudência e doutrina
5. **Foco em fatos**: Ênfase na narrativa factual
6. **Foco em fundamentação**: Ênfase em argumentação legal

### 🔮 Roadmap Futuro

Funcionalidades planejadas para próximas versões:
- [ ] Histórico de análises do usuário
- [ ] Comparação entre múltiplos perfis
- [ ] Export de relatórios em PDF
- [ ] Mais formatos de documento (ODT, RTF)
- [ ] Análise incremental (adicionar docs a perfil existente)
- [ ] Autenticação e perfis persistentes
- [ ] Dashboard com métricas agregadas
- [ ] API pública para integração

### 🙏 Créditos

- **Desenvolvido por**: Gabriel Vaz ([@gabrielvaz](https://github.com/gabrielvaz))
- **Equipe**: Jus IA / Jusbrasil
- **LLM Provider**: OpenRouter
- **Framework**: Next.js by Vercel

---

## Formato do Changelog

### Tipos de mudanças
- `✨ Adicionado` - para novas funcionalidades
- `🔧 Modificado` - para mudanças em funcionalidades existentes
- `❌ Depreciado` - para funcionalidades que serão removidas
- `🗑️ Removido` - para funcionalidades removidas
- `🐛 Correções` - para correções de bugs
- `🔒 Segurança` - para correções de vulnerabilidades

---

[0.1.0]: https://github.com/gabrielvaz/jus-ia-style-gen/releases/tag/v0.1.0
