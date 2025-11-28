import axios from "axios";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODELS = [
    "google/gemini-2.0-flash-lite-preview-02-05:free", // Free model first
    "google/gemini-2.0-flash-001", // Paid/Standard model second
];

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

    // Trim key to avoid copy-paste whitespace issues
    const apiKey = OPENROUTER_API_KEY.trim();

    // Debug log to verify key presence and format (masked)
    console.log(`[Server] Using API Key: ${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)} (Length: ${apiKey.length})`);

    const prompt = `
Você é um especialista em análise linguística e jurídica. Sua tarefa é analisar o corpus de textos fornecido abaixo, que contém documentos escritos por um advogado.
Seu objetivo é identificar o estilo de escrita deste advogado para criar um perfil de estilo e um conjunto de instruções personalizadas para uma IA (Jus IA).

Corpus:
${corpus}

---
Instruções:
1. Analise detalhadamente o estilo: tom, vocabulário, estrutura, uso de citações, formalidade, etc.
2. Gere um resumo em texto corrido que descreva "Seu estilo de escrita".
   - **Importante**: Inclua elogios genuínos sobre a clareza, persuasão ou técnica do advogado.
   - Detalhe especificamente sobre: uso de formalidade, complexidade das frases, tecnicidade, uso de citações, foco em fatos e fundamentação.
3. Avalie as seguintes dimensões de 0 a 100:
   - Formalidade
   - Complexidade das frases
   - Densidade técnica
   - Uso de citações
   - Foco em fatos
   - Foco em fundamentação
4. Liste bullets com observações práticas sobre o estilo.
5. Crie um conjunto de **"Instruções do seu estilo de escrita"** (antigo System Prompt) para configurar uma IA.
   - Este texto deve ser detalhado e estabelecer regras claras.
   - Defina a **quantidade de texto** típica (conciso vs. detalhado).
   - Defina o **nível de formalidade** e o **tom de fala** (ex: combativo, técnico, conciliador).
   - Defina o **sentimento** da escrita.
   - Inclua exemplos de como estruturar os argumentos baseados no estilo analisado.
   - **CRÍTICO**: O texto deste campo ("system_prompt") deve ser APENAS TEXTO PURO. NÃO USE MARKDOWN, negrito, itálico ou listas formatadas neste campo específico.

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

    let lastError: any;

    for (const model of MODELS) {
        try {
            console.log(`[Server] Attempting analysis with model: ${model}`);

            const response = await axios.post(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    model: model,
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
                        "Authorization": `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                        "HTTP-Referer": "https://jus-ia-style-gen.vercel.app",
                        "X-Title": "Jus IA Style Gen",
                    },
                    timeout: 60000, // 60s timeout
                }
            );

            const content = response.data.choices[0].message.content;

            // Parse JSON safely
            try {
                return JSON.parse(content);
            } catch (e) {
                console.error(`[Server] Failed to parse JSON from ${model}:`, content);
                throw new Error(`Invalid JSON response from ${model}`);
            }

        } catch (error) {
            console.error(`[Server] Error with model ${model}:`, error instanceof Error ? error.message : String(error));
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error(`[Server] API Response:`, JSON.stringify(error.response.data));
                    // If 401, it's likely a key issue, so we might want to stop trying other models if the key is invalid for all
                    if (error.response.status === 401) {
                        throw new Error("Erro 401: Chave de API inválida ou não autorizada. Verifique se sua chave OpenRouter está correta e se você tem créditos/permissão para usar este modelo.");
                    }
                }
            }
            lastError = error;
            // Continue to next model
        }
    }

    // If we get here, all models failed
    throw lastError || new Error("Falha na análise. Verifique sua chave de API e tente novamente.");
}
