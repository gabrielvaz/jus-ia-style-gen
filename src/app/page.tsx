"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { JusIALogo } from "@/components/JusIALogo";
import { ArrowRight, FileText, Sparkles, Zap, Scale } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl w-full space-y-12 z-10 text-center">
        <div className="flex justify-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <JusIALogo />
        </div>

        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Nova funcionalidade Jus IA
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 tracking-tight">
            Descubra seu <span className="text-primary">DNA Jurídico</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Nossa IA analisa profundamente seus documentos para identificar sua assinatura estilística única.
            Com isso, o Jus IA poderá escrever peças que soam exatamente como você, reduzindo drasticamente o número de iterações e revisões.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <Card className="p-6 text-left hover:shadow-lg transition-shadow border-primary/10">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Análise Profunda</h3>
            <p className="text-neutral-500 text-sm">
              Identificamos padrões de vocabulário, estrutura e argumentação em seus textos.
            </p>
          </Card>
          <Card className="p-6 text-left hover:shadow-lg transition-shadow border-primary/10">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
              <Scale className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Identidade Estilística</h3>
            <p className="text-neutral-500 text-sm">
              Mapeamos sua formalidade, tom e técnica para criar um perfil exclusivo.
            </p>
          </Card>
          <Card className="p-6 text-left hover:shadow-lg transition-shadow border-primary/10">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Menos Revisão</h3>
            <p className="text-neutral-500 text-sm">
              O Jus IA aprende a escrever como você, entregando minutas prontas para uso.
            </p>
          </Card>
        </div>

        <div className="pt-8 animate-in fade-in zoom-in duration-1000 delay-300">
          <Button
            size="lg"
            className="text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
            onClick={() => router.push("/create")}
          >
            Criar meu Perfil de Estilo <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="mt-4 text-sm text-neutral-400">
            Análise 100% segura e privada. Seus dados não são compartilhados.
          </p>
        </div>
      </div>
    </main>
  );
}
