// Polyfill DOMMatrix for pdf-parse
if (typeof global.DOMMatrix === 'undefined') {
    // @ts-ignore
    global.DOMMatrix = class DOMMatrix { };
}

import mammoth from "mammoth";

export async function extractText(fileBuffer: Buffer, fileType: string): Promise<string> {
    if (fileType === "application/pdf") {
        // @ts-ignore
        const pdf = require("pdf-parse");
        const data = await pdf(fileBuffer);
        return data.text;
    } else if (
        fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        fileType === "application/msword"
    ) {
        const result = await mammoth.extractRawText({ buffer: fileBuffer });
        return result.value;
    } else if (fileType === "text/plain") {
        return fileBuffer.toString("utf-8");
    } else {
        throw new Error(`Unsupported file type: ${fileType}`);
    }
}
