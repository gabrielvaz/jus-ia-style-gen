"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAnalysis } from "@/context/AnalysisContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { JusIALogo } from "@/components/JusIALogo";
import { ArrowLeft, CheckCircle, ExternalLink, Sparkles } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
    const router = useRouter();
    const { analysisResult, reset } = useAnalysis();
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        if (!analysisResult) {
            router.push("/create");
        }
    }, [analysisResult, router]);

    if (!analysisResult) return null;

    const handleJusIA = () => {
        // Strip markdown (basic stripping for bold/italic/code)
        const cleanPrompt = analysisResult.system_prompt
            .replace(/\*\*/g, "")
            .replace(/\*/g, "")
            .replace(/`/g, "")
            .replace(/#/g, "");

        const encodedPrompt = encodeURIComponent(cleanPrompt);
        window.open(`https://ia.jusbrasil.com.br/conversa?q=${encodedPrompt}`, "_blank");
    };

    if (!showResults) {
        return (
            <main className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
                <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500 flex flex-col items-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full text-green-600 mb-4">
                        <CheckCircle className="w-12 h-12" />
                    </div>
                    <h1 className="text-4xl font-bold text-neutral-900">Perfil de estilo de escrita gerado com sucesso</h1>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                        Sua análise de estilo foi concluída. Descubra como a IA vê sua escrita.
                    </p>
                    <Button
                        onClick={() => setShowResults(true)}
                        className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                    >
                        Revelar meu Perfil <Sparkles className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </main>
        );
    }

    const chartData = [
        { subject: 'Formalidade', A: analysisResult.dimensions.formalidade, fullMark: 100 },
        { subject: 'Complexidade', A: analysisResult.dimensions.complexidade_frases, fullMark: 100 },
        { subject: 'Tecnicidade', A: analysisResult.dimensions.densidade_tecnica, fullMark: 100 },
        { subject: 'Citações', A: analysisResult.dimensions.uso_citacoes, fullMark: 100 },
        { subject: 'Fatos', A: analysisResult.dimensions.foco_fatos, fullMark: 100 },
        { subject: 'Fundamentação', A: analysisResult.dimensions.foco_fundamentacao, fullMark: 100 },
    ];

    return (
        <main className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <Button variant="ghost" onClick={() => { reset(); router.push("/"); }}>
                        <ArrowLeft className="mr-2 w-4 h-4" /> Início
                    </Button>
                    <div className="flex items-center gap-4">
                        <JusIALogo />
                        <div className="h-6 w-px bg-neutral-200" />
                        <h1 className="text-xl font-semibold text-neutral-900">Seu Perfil de Estilo</h1>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column: Visuals */}
                    <div className="space-y-8">
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-6">Dimensões do Estilo</h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                        <PolarGrid />
                                        <PolarAngleAxis dataKey="subject" />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                        <Radar
                                            name="Seu Estilo"
                                            dataKey="A"
                                            stroke="#8884d8"
                                            fill="#8884d8"
                                            fillOpacity={0.6}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="space-y-4 mt-8">
                                {chartData.map((item) => (
                                    <div key={item.subject} className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium text-neutral-700">{item.subject}</span>
                                            <span className="text-neutral-500">{item.A}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary/80 rounded-full"
                                                style={{ width: `${item.A}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Right Column: Summary & Action */}
                    <div className="space-y-8">
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Resumo da Análise</h3>
                            <p className="text-neutral-600 leading-relaxed whitespace-pre-wrap">
                                {analysisResult.summary}
                            </p>
                        </Card>

                        <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 p-8 rounded-2xl border border-primary/20 text-center space-y-6">
                            <h3 className="text-2xl font-bold text-neutral-900">Pronto para usar?</h3>
                            <p className="text-neutral-600">
                                Teste seu novo perfil agora mesmo em uma conversa real no Jus IA.
                            </p>
                            <Button
                                onClick={handleJusIA}
                                className="w-full text-lg py-6 shadow-lg hover:shadow-xl transition-all"
                            >
                                Testar no Jus IA <ExternalLink className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
