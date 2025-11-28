"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FileUpload } from "@/components/ui/FileUpload";
import { ArrowRight, AlertCircle, FileText, Upload, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAnalysis } from "@/context/AnalysisContext";
import Link from "next/link";

type Mode = "text" | "files";

export default function CreateProfilePage() {
    const router = useRouter();
    const {
        inputText,
        setInputText,
        uploadedFiles,
        setUploadedFiles,
        setIsAnalyzing
    } = useAnalysis();

    const [mode, setMode] = useState<Mode>("text");
    const [error, setError] = useState<string | null>(null);

    const getQualityLevel = (length: number) => {
        if (length < 1000) return { label: "Insuficiente", color: "bg-red-500", width: "20%" };
        if (length < 3000) return { label: "Bom", color: "bg-yellow-500", width: "60%" };
        return { label: "Excelente", color: "bg-green-500", width: "100%" };
    };

    const quality = getQualityLevel(inputText.length);

    const handleAnalyze = () => {
        setError(null);

        if (mode === "text") {
            if (inputText.length < 1000) {
                setError(`O texto precisa ter pelo menos 1000 caracteres. Atual: ${inputText.length}`);
                return;
            }
            setIsAnalyzing(true);
            router.push("/analyzing");
        } else {
            if (uploadedFiles.length === 0) {
                setError("Por favor, selecione pelo menos um arquivo.");
                return;
            }
            if (uploadedFiles.length > 5) {
                setError("Por favor, selecione no máximo 5 arquivos.");
                return;
            }
            setIsAnalyzing(true);
            router.push("/analyzing");
        }
    };

    return (
        <main className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center text-neutral-500 hover:text-neutral-900 transition-colors">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
                    </Link>
                </div>

                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-3xl font-bold text-neutral-900">Envie seus documentos</h1>
                    <p className="text-neutral-500">
                        Para uma análise precisa, precisamos de uma amostra significativa do seu estilo de escrita.
                    </p>
                </div>

                <Card className="w-full space-y-6 p-6">
                    <div className="flex p-1 bg-neutral-100 rounded-lg">
                        <button
                            onClick={() => setMode("text")}
                            className={cn(
                                "flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-md transition-all",
                                mode === "text"
                                    ? "bg-white text-neutral-900 shadow-sm"
                                    : "text-neutral-500 hover:text-neutral-900"
                            )}
                        >
                            <FileText className="w-4 h-4 mr-2" />
                            Colar Texto
                        </button>
                        <button
                            onClick={() => setMode("files")}
                            className={cn(
                                "flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-md transition-all",
                                mode === "files"
                                    ? "bg-white text-neutral-900 shadow-sm"
                                    : "text-neutral-500 hover:text-neutral-900"
                            )}
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload de Arquivo
                        </button>
                    </div>

                    {mode === "text" ? (
                        <div className="space-y-4">
                            <div className="relative">
                                <textarea
                                    value={inputText}
                                    onChange={(e) => {
                                        setInputText(e.target.value);
                                        setError(null);
                                    }}
                                    placeholder="Cole aqui um texto de sua autoria (petição, artigo, etc.). Recomendamos pelo menos 3000 caracteres para um melhor resultado."
                                    className="w-full h-96 p-4 rounded-lg border border-neutral-200 focus:border-primary focus:ring-1 focus:ring-primary resize-none text-sm font-mono"
                                />
                                <div className="absolute bottom-4 right-4 text-xs text-neutral-400 bg-white/80 px-2 py-1 rounded">
                                    {inputText.length} caracteres
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-600">Qualidade da amostra:</span>
                                    <span className={cn("font-medium",
                                        quality.label === "Insuficiente" ? "text-red-600" :
                                            quality.label === "Bom" ? "text-yellow-600" : "text-green-600"
                                    )}>
                                        {quality.label}
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                                    <div
                                        className={cn("h-full transition-all duration-500", quality.color)}
                                        style={{ width: `${Math.min((inputText.length / 5000) * 100, 100)}%` }}
                                    />
                                </div>
                                <p className="text-xs text-neutral-500">
                                    Mínimo: 1000 • Recomendado: 3000+ • Ideal: 5000+
                                </p>
                            </div>
                        </div>
                    ) : (
                        <FileUpload onFilesSelected={setUploadedFiles} maxFiles={5} />
                    )}

                    {error && (
                        <div className="flex items-center p-3 text-sm text-error bg-red-50 rounded-lg">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            {error}
                        </div>
                    )}

                    <div className="flex justify-end pt-4">
                        <Button
                            onClick={handleAnalyze}
                            disabled={mode === "text" ? inputText.length < 50 : uploadedFiles.length === 0}
                            className="w-full md:w-auto"
                        >
                            Analisar estilo de escrita <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </Card>
            </div>
        </main>
    );
}
