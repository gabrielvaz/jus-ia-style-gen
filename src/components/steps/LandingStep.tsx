import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowRight, FileText, BarChart, Terminal } from "lucide-react";

interface LandingStepProps {
    onStart: () => void;
}

export function LandingStep({ onStart }: LandingStepProps) {
    return (
        <div className="flex flex-col items-center justify-center space-y-8 w-full">
            <div className="text-center space-y-4 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
                    Faça o Jus IA escrever com o seu estilo
                </h1>
                <p className="text-lg text-neutral-700">
                    Envie de 1 a 5 documentos que você já escreveu e nós vamos analisar seu estilo de escrita para personalizar o Jus IA para você.
                </p>
            </div>

            <Card className="w-full max-w-4xl grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 bg-primary-50 rounded-full text-primary">
                        <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-neutral-900">1. Upload</h3>
                    <p className="text-sm text-neutral-500">
                        Você faz o upload de peças ou documentos já escritos por você.
                    </p>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 bg-primary-50 rounded-full text-primary">
                        <BarChart className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-neutral-900">2. Análise</h3>
                    <p className="text-sm text-neutral-500">
                        O sistema analisa seu tom, estrutura, vocabulário e forma de argumentar.
                    </p>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 bg-primary-50 rounded-full text-primary">
                        <Terminal className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-neutral-900">3. Resultado</h3>
                    <p className="text-sm text-neutral-500">
                        Você recebe um perfil visual do seu estilo e um prompt de sistema pronto.
                    </p>
                </div>
            </Card>

            <Button onClick={onStart} className="text-lg px-8 py-6">
                Começar <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
        </div>
    );
}
