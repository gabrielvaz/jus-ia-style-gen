import { NextRequest, NextResponse } from "next/server";
import { extractText } from "@/lib/text-extractor";
import { analyzeWritingStyle } from "@/lib/openrouter";

export async function POST(req: NextRequest) {
    try {
        let corpus = "";
        const contentType = req.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
            const body = await req.json();
            if (!body.text || typeof body.text !== "string") {
                return NextResponse.json(
                    { error: "Invalid text input" },
                    { status: 400 }
                );
            }
            corpus = body.text;
        } else if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();
            const files = formData.getAll("files") as File[];

            if (!files || files.length === 0) {
                return NextResponse.json(
                    { error: "No files uploaded" },
                    { status: 400 }
                );
            }

            if (files.length > 5) {
                return NextResponse.json(
                    { error: "Too many files (max 5)" },
                    { status: 400 }
                );
            }

            for (const file of files) {
                try {
                    const buffer = Buffer.from(await file.arrayBuffer());
                    const text = await extractText(buffer, file.type);
                    corpus += `\n--- DOCUMENTO: ${file.name} ---\n${text}\n`;
                } catch (error) {
                    console.error(`Error processing file ${file.name}:`, error);
                    return NextResponse.json(
                        { error: `Error processing file ${file.name}` },
                        { status: 500 }
                    );
                }
            }
        } else {
            return NextResponse.json(
                { error: "Unsupported content type" },
                { status: 415 }
            );
        }

        if (!corpus.trim()) {
            return NextResponse.json(
                { error: "No text content found to analyze" },
                { status: 400 }
            );
        }

        const analysis = await analyzeWritingStyle(corpus);

        return NextResponse.json(analysis);
    } catch (error) {
        console.error("Error in /api/analyze-style:", error);
        return NextResponse.json(
            { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
