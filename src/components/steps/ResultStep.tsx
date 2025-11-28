import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AnalysisResult } from "@/lib/openrouter";
import { Check, Copy, RefreshCw } from "lucide-react";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from "recharts";

interface ResultStepProps {
    result: AnalysisResult;
    onRestart: () => void;
}

export function ResultStep({ result, onRestart }: ResultStepProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(result.system_prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const chartData = [
        { subject: "Formalidade", A: result.dimensions.formalidade, fullMark: 100 },
        { subject: "Complexidade", A: result.dimensions.complexidade_frases, fullMark: 100 },
        { subject: "Técnica", A: result.dimensions.densidade_tecnica, fullMark: 100 },
        { subject: "Citações", A: result.dimensions.uso_citacoes, fullMark: 100 },
        { subject: "Fatos", A: result.dimensions.foco_fatos, fullMark: 100 },
        { subject: "Fundamentação", A: result.dimensions.foco_fundamentacao, fullMark: 100 },
    ];

    return (
        <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-5xl mx-auto pb-12">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-neutral-900">Seu Perfil de Estilo</h2>
                <p className="text-neutral-500">
                    Veja abaixo a análise detalhada e o prompt personalizado para o Jus IA.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Bloco 1: Resumo Textual */}
                <Card className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-neutral-900 mb-3">Resumo do Estilo</h3>
                        <p className="text-neutral-700 leading-relaxed">{result.summary}</p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-3">
                            Principais Características
                        </h4>
                        <ul className="space-y-2">
                            {result.bullets.map((bullet, index) => (
                                <li key={index} className="flex items-start text-neutral-700 text-sm">
                                    <span className="mr-2 text-primary">•</span>
                                    {bullet}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>

                {/* Bloco 2: Gráfico */}
                <Card className="flex flex-col items-center justify-center min-h-[400px]">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-6 w-full text-left">
                        Visualização do Perfil
                    </h3>
                    <div className="w-full h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                <PolarGrid stroke="#E5E5E5" />
                                <PolarAngleAxis
                                    dataKey="subject"
                                    tick={{ fill: "#4A4A4A", fontSize: 12 }}
                                />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Estilo"
                                    dataKey="A"
                                    stroke="#007A5F"
                                    fill="#007A5F"
                                    fillOpacity={0.3}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Bloco 3: System Prompt */}
            <Card className="space-y-4 bg-neutral-50 border-primary-50">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-neutral-900">
                        Prompt de Sistema para o Jus IA
                    </h3>
                    <div className="flex gap-2">
                        <Button onClick={handleCopy} variant="secondary" className="gap-2">
                            {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                            {copied ? "Copiado!" : "Copiar"}
                        </Button>
                        <Button
                            onClick={() => {
                                const encodedPrompt = encodeURIComponent(result.system_prompt);
                                window.open(`https://ia.jusbrasil.com.br/conversa?q=${encodedPrompt}`, "_blank");
                            }}
                            className="gap-2 bg-primary text-white hover:bg-[#00664F]"
                        >
                            Testar no Jus IA
                        </Button>
                    </div>
                </div>

                <div className="relative">
                    <textarea
                        readOnly
                        value={result.system_prompt}
                        className="w-full h-64 p-4 rounded-lg border border-neutral-200 bg-white font-mono text-sm text-neutral-700 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <p className="text-sm text-neutral-500">
                    Use este prompt como configuração de sistema do Jus IA. No futuro, essa etapa será integrada automaticamente ao perfil da conta.
                </p>
            </Card>

            <div className="flex justify-center pt-8">
                <Button onClick={onRestart} variant="secondary" className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Analisar novos documentos
                </Button>
            </div>
        </div>
    );
}
