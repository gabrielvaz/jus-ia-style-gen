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
                alert("Ocorreu um erro na análise. Tente novamente.");
                router.push("/create");
            }
        };

        analyze();

        return () => clearInterval(interval);
    }, [inputText, uploadedFiles, isAnalyzing, router, setAnalysisResult]);

    return (
        <main className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-2">
                        Analisando seu estilo
                    </h2>
                    <p className="text-neutral-500">
                        Nossa IA está processando suas informações para criar um perfil único.
                    </p>
                </div>

                <Card className="p-8 space-y-6">
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-neutral-100 rounded-full"></div>
                            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                            <div className="absolute inset-0 flex items-center justify-center font-bold text-primary text-sm">
                                {Math.min((currentStep + 1) * 20, 99)}%
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {STEPS.map((step, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "flex items-center gap-3 transition-all duration-500",
                                    index > currentStep ? "opacity-30" : "opacity-100"
                                )}
                            >
                                {index < currentStep ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                ) : index === currentStep ? (
                                    <Loader2 className="w-5 h-5 text-primary animate-spin flex-shrink-0" />
                                ) : (
                                    <div className="w-5 h-5 rounded-full border-2 border-neutral-200 flex-shrink-0" />
                                )}
                                <span className={cn(
                                    "text-sm font-medium",
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
