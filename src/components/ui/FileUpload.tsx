import { useCallback, useState } from "react";
import { Upload, X, FileText, File as FileIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

interface FileUploadProps {
    onFilesSelected: (files: File[]) => void;
    maxFiles?: number;
    accept?: string[];
}

export function FileUpload({
    onFilesSelected,
    maxFiles = 5,
    accept = [".pdf", ".docx", ".txt"],
}: FileUploadProps) {
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState<File[]>([]);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const validateFiles = (newFiles: File[]) => {
        const validFiles = newFiles.filter((file) => {
            const extension = "." + file.name.split(".").pop()?.toLowerCase();
            return accept.includes(extension);
        });
        return validFiles;
    };

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);

            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                const droppedFiles = Array.from(e.dataTransfer.files);
                const validFiles = validateFiles(droppedFiles);

                setFiles((prev) => {
                    const combined = [...prev, ...validFiles].slice(0, maxFiles);
                    onFilesSelected(combined);
                    return combined;
                });
            }
        },
        [maxFiles, onFilesSelected, accept]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files);
            const validFiles = validateFiles(selectedFiles);

            setFiles((prev) => {
                const combined = [...prev, ...validFiles].slice(0, maxFiles);
                onFilesSelected(combined);
                return combined;
            });
        }
    };

    const removeFile = (index: number) => {
        setFiles((prev) => {
            const newFiles = [...prev];
            newFiles.splice(index, 1);
            onFilesSelected(newFiles);
            return newFiles;
        });
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    };

    return (
        <div className="w-full space-y-4">
            <div
                className={cn(
                    "relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl transition-colors cursor-pointer",
                    dragActive
                        ? "border-primary bg-primary-50"
                        : "border-neutral-200 bg-neutral-50 hover:bg-neutral-100"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-upload")?.click()}
            >
                <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleChange}
                    accept={accept.join(",")}
                />

                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                    <div className="mb-4 p-3 rounded-full bg-white shadow-sm">
                        <Upload className="w-6 h-6 text-primary" />
                    </div>
                    <p className="mb-2 text-sm text-neutral-900 font-medium">
                        Clique para enviar ou arraste e solte
                    </p>
                    <p className="text-xs text-neutral-500">
                        PDF, DOCX ou TXT (máx. {maxFiles} arquivos)
                    </p>
                </div>
            </div>

            {files.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm font-medium text-neutral-700">
                        Arquivos selecionados ({files.length}/{maxFiles})
                    </p>
                    <div className="space-y-2">
                        {files.map((file, index) => (
                            <div
                                key={`${file.name}-${index}`}
                                className="flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg shadow-sm"
                            >
                                <div className="flex items-center space-x-3 overflow-hidden">
                                    <div className="flex-shrink-0 p-2 bg-neutral-50 rounded-md">
                                        {file.name.endsWith(".pdf") ? (
                                            <FileText className="w-5 h-5 text-red-500" />
                                        ) : (
                                            <FileIcon className="w-5 h-5 text-blue-500" />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-neutral-900 truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-neutral-500">
                                            {formatSize(file.size)}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFile(index)}
                                    className="p-1 text-neutral-400 hover:text-error transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
