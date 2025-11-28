"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FileUpload } from "@/components/ui/FileUpload";
import { ArrowRight, AlertCircle, FileText, Upload, ChevronLeft, Sparkles } from "lucide-react";
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

    const [step, setStep] = useState<"selection" | "input">("selection");
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

    const handleSelection = (selectedMode: Mode) => {
        setMode(selectedMode);
        setStep("input");
    };

    return (
        <main className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <button
                        onClick={() => step === "input" ? setStep("selection") : router.push("/")}
                        className="inline-flex items-center text-neutral-500 hover:text-neutral-900 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
                    </button>
                </div>

                {step === "selection" ? (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center space-y-4">
                            <h1 className="text-4xl font-bold text-neutral-900">Como funciona</h1>
                            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                                Vamos analisar seu estilo de escrita para criar um perfil único.
                                <br />
                                Depois, você poderá aplicar esse estilo diretamente no Jus IA.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <button
                                onClick={() => handleSelection("text")}
                                className="group relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl border border-neutral-200 hover:border-primary/50 transition-all text-left space-y-4"
                            >
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <FileText className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900">Colar Texto</h3>
                                <p className="text-neutral-500">
                                    Copie e cole um trecho de uma peça ou documento que você já escreveu.
                                    Ideal para análises rápidas.
                                </p>
                                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                                    <ArrowRight className="w-6 h-6" />
                                </div>
                            </button>

                            <button
                                onClick={() => handleSelection("files")}
                                className="group relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl border border-neutral-200 hover:border-primary/50 transition-all text-left space-y-4"
                            >
                                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Upload className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900">Upload de Arquivos</h3>
                                <p className="text-neutral-500">
                                    Envie de 1 a 5 documentos (PDF, DOCX) para uma análise mais profunda e completa do seu estilo.
                                </p>
                                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                                    <ArrowRight className="w-6 h-6" />
                                </div>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="text-center space-y-2 mb-8">
                            <h2 className="text-3xl font-bold text-neutral-900">
                                {mode === "text" ? "Cole um texto que represente seu estilo" : "Envie seus documentos"}
                            </h2>
                            <p className="text-neutral-500">
                                {mode === "text"
                                    ? "Cole um texto de sua autoria para analisarmos."
                                    : "Selecione os arquivos que melhor representam seu estilo."}
                            </p>
                        </div>

                        <Card className="w-full space-y-6 p-6">
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

                                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
                                            <div className="p-1 bg-blue-100 rounded-full text-blue-600 mt-0.5">
                                                <Sparkles className="w-4 h-4" />
                                            </div>
                                            <div className="text-sm text-blue-800">
                                                <p className="font-semibold mb-1">Dica para melhores resultados</p>
                                                <p>
                                                    Envie textos que representem bem seu estilo, como <span className="font-medium">Petições Iniciais, Contratos ou Pareceres Jurídicos</span> escritos por você.
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-xs text-neutral-500 text-right">
                                            Mínimo: 1000 • Recomendado: 3000+ • Ideal: 5000+
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <FileUpload onFilesSelected={setUploadedFiles} maxFiles={5} />
                                    <p className="text-neutral-500 text-center text-sm">
                                        Para melhores resultados, envie documentos que representem bem seu estilo, como:
                                        <br />
                                        <span className="font-medium text-neutral-700">Petições Iniciais, Contratos ou Pareceres Jurídicos</span> escritos por você.
                                    </p>
                                </div>
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
                )}
            </div>
        </main>
    );
}
