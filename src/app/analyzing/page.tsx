"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { useAnalysis } from "@/context/AnalysisContext";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";

const STEPS = [
    "Lendo seus documentos...",
    "Identificando padrão de vocabulário...",
    "Analisando tom e formalidade...",
    "Estruturando perfil de estilo...",
    "Gerando prompt personalizado..."
];

export default function ProcessingPage() {
    const router = useRouter();
    const { inputText, uploadedFiles, setAnalysisResult, isAnalyzing } = useAnalysis();
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (!isAnalyzing) {
            router.push("/create");
            return;
        }

        // Step animation
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
        }, 2500);

        // API Call
        const analyze = async () => {
            try {
                let response;
                if (inputText) {
                    response = await axios.post("/api/analyze-style", { text: inputText });
                } else {
                    const formData = new FormData();
                    uploadedFiles.forEach((file) => formData.append("files", file));
                    response = await axios.post("/api/analyze-style", formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    });
                }

                setAnalysisResult(response.data);
                // Wait a bit before redirecting to show completion
                setTimeout(() => router.push("/profile"), 1000);
            } catch (error) {
                console.error("Analysis failed:", error);
                setAnalysisResult(null);

                let errorMessage = "Ocorreu um erro desconhecido.";
                if (axios.isAxiosError(error)) {
                    errorMessage = error.response?.data?.details || error.response?.data?.error || error.message;
                } else if (error instanceof Error) {
                    errorMessage = error.message;
                } else {
                    errorMessage = String(error);
                }

                alert(`Erro na análise:\n\n${errorMessage}\n\nVerifique o console para mais detalhes.`);
                router.push("/create");
            }
        };

        analyze();

        return () => clearInterval(interval);
    }, [inputText, uploadedFiles, isAnalyzing, router, setAnalysisResult]);

    return (
        <main className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-2xl w-full space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-2">
                        Analisando seu estilo
                    </h2>
                    <p className="text-neutral-500">
                        Nossa IA está processando suas informações para criar um perfil único.
                    </p>
                </div>

                <Card className="p-8 space-y-8">
                    {/* Linear Progress Bar */}
                    <div className="w-full space-y-2">
                        <div className="flex justify-between text-sm font-medium text-neutral-500">
                            <span>Progresso</span>
                            <span>{Math.min((currentStep + 1) * 20, 100)}%</span>
                        </div>
                        <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
                            <div
                                className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${Math.min((currentStep + 1) * 20, 100)}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {STEPS.map((step, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "flex items-center gap-4 p-4 rounded-lg transition-all duration-500 border",
                                    index === currentStep
                                        ? "bg-primary/5 border-primary/20 shadow-sm"
                                        : "bg-transparent border-transparent opacity-50"
                                )}
                            >
                                {index < currentStep ? (
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    </div>
                                ) : index === currentStep ? (
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                                    </div>
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                                        <div className="w-3 h-3 rounded-full bg-neutral-300" />
                                    </div>
                                )}
                                <span className={cn(
                                    "text-lg font-medium",
                                    index === currentStep ? "text-neutral-900" : "text-neutral-500"
                                )}>
                                    {step}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </main>
    );
}
