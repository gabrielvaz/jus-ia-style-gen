import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FileUpload } from "@/components/ui/FileUpload";
import { ArrowRight, AlertCircle, FileText, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadStepProps {
    onAnalyze: (data: { type: "text" | "files"; content: string | File[] }) => void;
}

type Mode = "text" | "files";

export function UploadStep({ onAnalyze }: UploadStepProps) {
    const [mode, setMode] = useState<Mode>("text");
    const [text, setText] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleFilesSelected = (selectedFiles: File[]) => {
        setFiles(selectedFiles);
        setError(null);
    };

    const handleAnalyze = () => {
        setError(null);

        if (mode === "text") {
            if (text.length < 5000) {
                setError(`O texto precisa ter pelo menos 5000 caracteres. Atual: ${text.length}`);
                return;
            }
            onAnalyze({ type: "text", content: text });
        } else {
            if (files.length === 0) {
                setError("Por favor, selecione pelo menos um arquivo.");
                return;
            }
            if (files.length > 5) {
                setError("Por favor, selecione no máximo 5 arquivos.");
                return;
            }
            onAnalyze({ type: "files", content: files });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-2xl mx-auto">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-neutral-900">Envie seus documentos</h2>
                <p className="text-neutral-500">
                    Para uma análise precisa, precisamos de uma amostra significativa do seu estilo de escrita.
                </p>
            </div>

            <Card className="w-full space-y-6">
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
                    <div className="space-y-2">
                        <textarea
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value);
                                setError(null);
                            }}
                            placeholder="Cole aqui um texto de sua autoria (petição, artigo, etc.). Mínimo de 5000 caracteres."
                            className="w-full h-64 p-4 rounded-lg border border-neutral-200 focus:border-primary focus:ring-1 focus:ring-primary resize-none text-sm"
                        />
                        <div className="flex justify-between text-xs text-neutral-500">
                            <span>Mínimo: 5000 caracteres</span>
                            <span className={cn(text.length < 5000 ? "text-orange-500" : "text-green-600")}>
                                Atual: {text.length}
                            </span>
                        </div>
                    </div>
                ) : (
                    <FileUpload onFilesSelected={handleFilesSelected} maxFiles={5} />
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
                        disabled={mode === "text" ? text.length < 50 : files.length === 0}
                        className="w-full md:w-auto"
                    >
                        Analisar estilo de escrita <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>
            </Card>
        </div>
    );
}
