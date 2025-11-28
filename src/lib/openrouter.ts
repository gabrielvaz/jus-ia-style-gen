import axios from "axios";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "x-ai/grok-4.1-fast:free";

// Debug log (será removido após verificação)
if (typeof window === 'undefined') {
    console.log('[Server] OPENROUTER_API_KEY exists:', !!OPENROUTER_API_KEY);
}

export interface AnalysisResult {
    summary: string;
    dimensions: {
        formalidade: number;
        complexidade_frases: number;
        densidade_tecnica: number;
        uso_citacoes: number;
        foco_fatos: number;
        foco_fundamentacao: number;
    };
    bullets: string[];
    system_prompt: string;
}

export async function analyzeWritingStyle(corpus: string): Promise<AnalysisResult> {
    if (!OPENROUTER_API_KEY) {
        throw new Error("OPENROUTER_API_KEY is not configured");
    }

    const prompt = `
Você é um especialista em análise linguística e jurídica. Sua tarefa é analisar o corpus de textos fornecido abaixo, que contém documentos escritos por um advogado.
Seu objetivo é identificar o estilo de escrita deste advogado para criar um perfil de estilo e um prompt de sistema personalizado para uma IA (Jus IA).

Corpus:
${corpus}

---
Instruções:
1. Analise detalhadamente o estilo: tom, vocabulário, estrutura, uso de citações, formalidade, etc.
2. Gere um resumo em texto corrido.
3. Avalie as seguintes dimensões de 0 a 100:
   - Formalidade
   - Complexidade das frases
   - Densidade técnica
   - Uso de citações
   - Foco em fatos
   - Foco em fundamentação
4. Liste bullets com observações práticas sobre o estilo.
5. Crie um SYSTEM PROMPT completo, em português, para configurar uma IA para escrever EXATAMENTE como esse advogado. O prompt deve incluir regras fixas e exemplos de instruções baseados no estilo analisado.

Retorne APENAS um JSON válido com a seguinte estrutura, sem markdown ou texto adicional:
{
  "summary": "string",
  "dimensions": {
    "formalidade": number,
    "complexidade_frases": number,
    "densidade_tecnica": number,
    "uso_citacoes": number,
    "foco_fatos": number,
    "foco_fundamentacao": number
  },
  "bullets": ["string", "string"],
  "system_prompt": "string"
}
`;

    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: MODEL,
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                response_format: { type: "json_object" },
            },
            {
                headers: {
                    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://jus-ia-style-gen.vercel.app", // Placeholder
                    "X-Title": "Jus IA Style Gen",
                },
            }
        );

        const content = response.data.choices[0].message.content;

        // Parse JSON safely
        try {
            return JSON.parse(content);
        } catch (e) {
            console.error("Failed to parse JSON from LLM response:", content);
            // Fallback or retry logic could go here, but for prototype we throw
            throw new Error("Invalid JSON response from LLM");
        }
    } catch (error) {
        console.error("Error calling OpenRouter:", error);
        throw error;
    }
}
