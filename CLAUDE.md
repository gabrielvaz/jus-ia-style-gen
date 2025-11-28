# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an experimental landing page for **Jus IA** (legal AI platform) that analyzes a lawyer's writing style from uploaded documents and generates a personalized system prompt. The application uses LLMs via OpenRouter API to create writing style profiles.

**Core functionality:**
1. Upload 1-5 legal documents (PDF, DOCX, TXT)
2. Analyze writing style using LLM via OpenRouter
3. Generate visual profile of writing characteristics
4. Create a custom system prompt for personalizing Jus IA

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
# or with eslint directly
npx eslint .
```

## Environment Configuration

Required environment variables (create `.env.local`):

```
OPENROUTER_API_KEY=sk-or-v1-...
```

**OpenRouter Configuration:**
- API Key is already provided in specs.md
- Recommended model: `x-ai/grok-4.1-fast:free`
- API calls should be made from server-side API routes only

## Tech Stack

- **Framework:** Next.js 16.0.5 (App Router with TypeScript)
- **React:** 19.2.0 with React Compiler enabled (`reactCompiler: true` in next.config.ts)
- **Styling:** Tailwind CSS v4 (using @tailwindcss/postcss)
- **TypeScript:** Strict mode enabled with target ES2017
- **Path Aliases:** `@/*` maps to `./src/*`

### Key Dependencies

**Document Processing:**
- `pdf-parse` (^2.4.5) - PDF text extraction
- `mammoth` (^1.11.0) - DOCX text extraction

**API & HTTP:**
- `axios` (^1.13.2) - HTTP client for OpenRouter API calls

**UI & Charts:**
- `recharts` (^3.5.0) - Data visualization for style profiles
- `lucide-react` (^0.555.0) - Icon library
- `clsx` (^2.1.1) + `tailwind-merge` (^3.4.0) - Utility for conditional classes

## Architecture Notes

### Design System (Farol)

The application follows the **Farol Design System** detailed in specs.md:

**Colors:**
- Primary: `#007A5F` (verde Farol) for main CTAs
- Secondary: `#0052CC` for links
- Neutrals: `#1D1D1D` (text), `#4A4A4A` (body), `#8A8A8A` (secondary text)
- Error/Success: `#D93025` / `#34A853`

**Typography:**
- Font: Inter (loaded via next/font/google in layout.tsx)
- Scales: Display (32px/semibold), H2 (24px), H3 (20px), Body (16px)
- 8pt spacing system defined in globals.css:
  - `--spacing-tight: 4px`
  - `--spacing-xs: 8px`
  - `--spacing-sm: 16px`
  - `--spacing-md: 24px`
  - `--spacing-lg: 32px`
  - `--spacing-xl: 40px`
  - `--spacing-xxl: 64px`

**Components:**
- Buttons: 8px border-radius, 12px/20px padding
- Inputs: 44px height, 8px border-radius
- Cards: 12px border-radius, subtle shadow
- Container: max-width 1200px

**Design tokens in globals.css:**
All Farol colors are defined as CSS custom properties using Tailwind v4's `@theme` directive

### Application Flow (Wizard-style)

**Screen 1 - Landing:**
- Headline: "Faça o Jus IA escrever com o seu estilo"
- Explanation of value proposition
- CTA to begin upload process

**Screen 2 - Upload:**
- Drag-and-drop + file selector
- Accept 1-5 files (.pdf, .docx, .txt)
- File list with remove option
- Validation before proceeding

**Screen 3 - Processing:**
- Loading state with progress indicator
- Explanation of what's happening (analyzing style)

**Screen 4 - Results:**
- **Block 1:** Text summary of writing style
- **Block 2:** Visual charts (radar/bar charts) showing dimensions
- **Block 3:** Generated system prompt (copyable textarea)

### API Architecture

**Endpoint:** `POST /api/analyze-style`

**Input:** File uploads (1-5 documents via FormData)

**Processing:**
1. Extract text from each file using `extractText()`:
   - PDF: `pdf-parse` library
   - DOCX: `mammoth` library
   - TXT: Buffer.toString('utf-8')
2. Concatenate into single corpus with document separators: `\n--- DOCUMENTO: {filename} ---\n{text}\n`
3. Call `analyzeWritingStyle(corpus)` which:
   - Sends request to `https://openrouter.ai/api/v1/chat/completions`
   - Uses model `x-ai/grok-4.1-fast:free`
   - Includes `response_format: { type: "json_object" }` for structured output
   - Returns parsed `AnalysisResult` TypeScript interface
4. Return structured JSON to client

**Expected API Response Format:**
```json
{
  "summary": "string - resumo em texto corrido do estilo de escrita",
  "dimensions": {
    "formalidade": 0-100,
    "complexidade_frases": 0-100,
    "densidade_tecnica": 0-100,
    "uso_citacoes": 0-100,
    "foco_fatos": 0-100,
    "foco_fundamentacao": 0-100
  },
  "bullets": [
    "string - bullet explicando um aspecto do estilo",
    "..."
  ],
  "system_prompt": "string - prompt completo para ser usado como System Prompt do Jus IA"
}
```

### File Organization

**Current structure:**
- `src/app/` - Next.js App Router pages and layouts
  - `src/app/page.tsx` - Main page (currently default Next.js template)
  - `src/app/layout.tsx` - Root layout with Inter font configuration
  - `src/app/globals.css` - Global styles with Farol design tokens
- `src/app/api/` - API routes
  - `src/app/api/analyze-style/route.ts` - Main API endpoint for style analysis
- `src/components/` - React components
  - `src/components/ui/` - Reusable UI components (Button, Card, Input, ProgressBar)
- `src/lib/` - Utilities and services
  - `src/lib/openrouter.ts` - OpenRouter API client with `analyzeWritingStyle()` function
  - `src/lib/text-extractor.ts` - Document text extraction (PDF, DOCX, TXT)
  - `src/lib/utils.ts` - Utility functions

**Key implementation details:**
- Text extraction uses `pdf-parse` for PDF, `mammoth` for DOCX, native Buffer for TXT
- OpenRouter client configured with `x-ai/grok-4.1-fast:free` model
- API uses `response_format: { type: "json_object" }` to ensure structured JSON responses
- All document processing happens server-side in the API route

## Important Implementation Notes

- **No mocked functionality:** All features must call real OpenRouter LLM, even if using cheap/free models
- **Server-side API calls:** Never expose OpenRouter API key to client - use Next.js API routes
- **Document extraction:** Must handle PDF, DOCX, TXT extraction server-side using the `extractText()` function in `src/lib/text-extractor.ts`
- **Structured LLM responses:** The OpenRouter API call uses `response_format: { type: "json_object" }` to ensure JSON-only responses. The prompt explicitly instructs the LLM to return only valid JSON without markdown or additional text.
- **Mobile-first responsive:** Follow Farol design system breakpoints (480px, 768px, 1024px, 1440px)
- **Portuguese content:** All UI text, prompts, and generated content should be in Brazilian Portuguese
- **System prompt quality:** Generated prompt must be detailed enough to actually replicate writing style
- **Error handling:** The API route includes validation for file count (1-5), file types, and text extraction errors
- **Corpus format:** Multiple documents are concatenated with separator format: `\n--- DOCUMENTO: {filename} ---\n{text}\n`

## Current Development State

**Implemented:**
- ✅ Next.js project structure with TypeScript
- ✅ Tailwind CSS v4 with Farol design system tokens
- ✅ OpenRouter API integration (`src/lib/openrouter.ts`)
- ✅ Document text extraction for PDF, DOCX, TXT (`src/lib/text-extractor.ts`)
- ✅ API endpoint `/api/analyze-style` with full processing pipeline
- ✅ Basic UI components (Button, Card, Input, ProgressBar)
- ✅ Environment configuration setup

**To be implemented:**
- ⚠️ Main page UI (`src/app/page.tsx` - currently default Next.js template)
- ⚠️ File upload component with drag-and-drop
- ⚠️ Wizard-style navigation between screens
- ⚠️ Loading/processing screen with progress indicator
- ⚠️ Results display with charts (using Recharts)
- ⚠️ Copyable system prompt textarea

**When implementing the frontend:**
1. Replace the default `page.tsx` with the wizard flow
2. Use the existing UI components in `src/components/ui/`
3. Call the `/api/analyze-style` endpoint with FormData containing files
4. Display results using Recharts for the radar/bar charts
5. Ensure all text is in Brazilian Portuguese
6. Add "Testar no Jus IA" button that sends the generated system prompt to Jus IA (see integration details below)

## Integration with Jus IA

### Sending System Prompt to Jus IA

The application should provide a CTA button that allows users to test their generated system prompt directly in Jus IA by creating a new conversation with the prompt pre-filled.

**URL Format:**
```
https://ia.jusbrasil.com.br/conversa?q={URL_ENCODED_PROMPT}
```

**URL Encoding Rules:**
- Spaces: Use `+` or `%20`
- Line breaks: Use `%0A`
- Special characters: URL-encode using standard percent-encoding
  - `ç` → `%C3%A7`
  - `ê` → `%C3%AA`
  - `ã` → `%C3%A3`
  - `ó` → `%C3%B3`
  - etc.

**Example Implementation:**

```typescript
function sendToJusIA(systemPrompt: string) {
  // URL encode the system prompt
  const encodedPrompt = encodeURIComponent(systemPrompt);

  // Construct the Jus IA URL
  const jusIAUrl = `https://ia.jusbrasil.com.br/conversa?q=${encodedPrompt}`;

  // Open in new tab
  window.open(jusIAUrl, '_blank');
}
```

**UI Implementation:**
- Add a prominent button in the results screen (Screen 4) labeled "Testar no Jus IA" or "Usar este prompt no Jus IA"
- Place it near the copyable system prompt textarea
- Button should use primary color (`var(--color-primary)`) to stand out
- On click, open the Jus IA URL in a new tab with the system prompt pre-filled

**User Flow:**
1. User sees generated system prompt in results
2. User clicks "Testar no Jus IA" button
3. New tab opens with Jus IA conversation
4. System prompt is pre-filled in the message input
5. User can immediately start using Jus IA with their personalized writing style

## Related Documentation

See `specs.md` for complete product specification in Portuguese, including:
- Full user flow details
- Detailed design system specifications
- LLM prompt engineering requirements
- Complete API contract definition
