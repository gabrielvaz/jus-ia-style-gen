"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { JusIALogo } from "@/components/JusIALogo";
import { ArrowRight, FileText, Sparkles, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="mb-12">
          <JusIALogo />
        </div>

        <div className="text-center space-y-6 max-w-3xl mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900">
            Faça o Jus IA escrever <br />
            <span className="text-primary">exatamente como você</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
            Nossa IA analisa seus textos jurídicos, identifica seu tom, vocabulário e estrutura, e cria um perfil personalizado para você usar no Jus IA.
          </p>
          <div className="pt-4">
            <Link href="/create">
              <Button className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                Criar meu Perfil de Estilo <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl mb-16">
          <Card className="p-6 space-y-4 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-semibold">Análise Profunda</h3>
            <p className="text-neutral-500">
              Identificamos nuances como formalidade, uso de latim, tamanho de frases e estrutura argumentativa.
            </p>
          </Card>

          <Card className="p-6 space-y-4 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-semibold">Prompt Personalizado</h3>
            <p className="text-neutral-500">
              Geramos um comando de sistema (System Prompt) pronto para copiar e colar nas configurações do Jus IA.
            </p>
          </Card>

          <Card className="p-6 space-y-4 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-semibold">Integração Direta</h3>
            <p className="text-neutral-500">
              Teste seu novo estilo imediatamente com um link direto que abre uma conversa configurada no Jus IA.
            </p>
          </Card>
        </div>

        <div className="w-full max-w-4xl bg-white rounded-2xl p-8 shadow-sm border border-neutral-200">
          <h2 className="text-2xl font-bold mb-6 text-center">Como funciona</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-neutral-600 flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold">Envie seus textos</h4>
                  <p className="text-sm text-neutral-500">Cole uma petição ou faça upload de arquivos PDF/DOCX.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-neutral-600 flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold">Aguarde a análise</h4>
                  <p className="text-sm text-neutral-500">Nossa IA processa o conteúdo e extrai os padrões.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-neutral-600 flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold">Use no Jus IA</h4>
                  <p className="text-sm text-neutral-500">Copie o prompt gerado e comece a usar.</p>
                </div>
              </div>
            </div>
            <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-100">
              <div className="space-y-3 font-mono text-xs text-neutral-600">
                <div className="flex gap-2">
                  <span className="text-primary">User:</span>
                  <span>Escreva uma contestação sobre danos morais...</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-purple-600">Jus IA:</span>
                  <span>[Escrevendo com seu estilo: vocabulário culto, citações diretas de jurisprudência e tom assertivo...]</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
