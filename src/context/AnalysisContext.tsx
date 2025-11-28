"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { AnalysisResult } from "@/lib/openrouter";

interface AnalysisContextType {
    inputText: string;
    setInputText: (text: string) => void;
    uploadedFiles: File[];
    setUploadedFiles: (files: File[]) => void;
    analysisResult: AnalysisResult | null;
    setAnalysisResult: (result: AnalysisResult | null) => void;
    isAnalyzing: boolean;
    setIsAnalyzing: (isAnalyzing: boolean) => void;
    reset: () => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: ReactNode }) {
    const [inputText, setInputText] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const reset = () => {
        setInputText("");
        setUploadedFiles([]);
        setAnalysisResult(null);
        setIsAnalyzing(false);
    };

    return (
        <AnalysisContext.Provider
            value={{
                inputText,
                setInputText,
                uploadedFiles,
                setUploadedFiles,
                analysisResult,
                setAnalysisResult,
                isAnalyzing,
                setIsAnalyzing,
                reset,
            }}
        >
            {children}
        </AnalysisContext.Provider>
    );
}

export function useAnalysis() {
    const context = useContext(AnalysisContext);
    if (context === undefined) {
        throw new Error("useAnalysis must be used within an AnalysisProvider");
    }
    return context;
}
