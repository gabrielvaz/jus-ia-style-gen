import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AnalysisProvider } from "@/context/AnalysisContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jus IA - Perfil de Estilo de Escrita",
  description: "Gere um perfil de estilo de escrita personalizado para o Jus IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AnalysisProvider>
          {children}
        </AnalysisProvider>
      </body>
    </html>
  );
}

