import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Loader2 } from "lucide-react";

export function ProcessingStep() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) return prev;
                return prev + Math.random() * 10;
            });
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-xl mx-auto py-12">
            <Card className="w-full text-center space-y-8 py-12">
                <div className="relative flex justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    </div>
                    <div className="w-24 h-24 rounded-full border-4 border-primary-50" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-neutral-900">
                        Estamos analisando seu estilo de escrita...
                    </h2>
                    <p className="text-neutral-500 max-w-sm mx-auto">
                        Estamos lendo seus documentos, identificando padrão de vocabulário, tom, estrutura das peças e forma de argumentar.
                    </p>
                </div>

                <div className="max-w-xs mx-auto space-y-2">
                    <ProgressBar value={progress} />
                    <p className="text-xs text-neutral-400 text-right">{Math.round(progress)}%</p>
                </div>
            </Card>
        </div>
    );
}
