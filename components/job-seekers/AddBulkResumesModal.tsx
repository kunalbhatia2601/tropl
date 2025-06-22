import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, File, X } from "lucide-react";
import { useFileUpload } from "@/hooks/useFileUpload";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Eye } from "lucide-react";
import { useState } from "react";

interface ProcessedFile {
  file: File;
  status: "pending" | "processing" | "success" | "error";
  result?: any;
  error?: string;
}

interface AddBulkResumesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddBulkResumesModal({
  open,
  onOpenChange,
}: AddBulkResumesModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<ProcessedFile | null>(
    null
  );

  const { uploadMultipleFiles, uploadProgress } = useFileUpload();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
      // Initialize processed files array
      const newProcessedFiles = newFiles.map((file) => ({
        file,
        status: "pending" as const,
      }));
      setProcessedFiles((prev) => [...prev, ...newProcessedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setProcessedFiles(processedFiles.filter((_, i) => i !== index));
  };

  const handleBulkUpload = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);

    // Update all files to processing status
    setProcessedFiles((prev) =>
      prev.map((pf) => ({ ...pf, status: "processing" as const }))
    );

    try {
      const results = await uploadMultipleFiles(files);

      // Update processed files with results
      setProcessedFiles((prev) =>
        prev.map((pf, index) => ({
          ...pf,
          status: results[index]?.success ? "success" : "error",
          result: results[index]?.extractedData,
          error: results[index]?.error,
        }))
      );
    } catch (error) {
      console.error("Bulk upload error:", error);
      setProcessedFiles((prev) =>
        prev.map((pf) => ({
          ...pf,
          status: "error" as const,
          error: "Upload failed",
        }))
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const successCount = processedFiles.filter(
    (pf) => pf.status === "success"
  ).length;
  const errorCount = processedFiles.filter((pf) => pf.status === "error")
    .length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Bulk Resumes with AI Processing</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Upload Area */}
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Upload className="h-12 w-12 text-gray-400" />
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Drag and drop your files here, or click to select files
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG, ZIP
                  </p>
                  <p className="text-xs text-blue-600 mt-1 font-medium">
                    ✨ AI-powered resume parsing enabled
                  </p>
                </div>
                <Input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.zip"
                  onChange={handleFileChange}
                  className="hidden"
                  id="bulk-upload"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("bulk-upload")?.click()}
                  disabled={isProcessing}
                >
                  Select Files
                </Button>
              </div>
            </div>

            {/* Processing Status */}
            {isProcessing && (
              <Alert className="border-blue-200 bg-blue-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Processing {files.length} files concurrently with AI... This may take a few minutes.
                </AlertDescription>
              </Alert>
            )}

            {/* Real-time Progress Display */}
            {isProcessing && Object.keys(uploadProgress).length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Processing Progress:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {Object.entries(uploadProgress).map(([fileName, progress]) => (
                    <div key={fileName} className="space-y-1 p-2 bg-gray-50 rounded">
                      <div className="flex justify-between text-xs">
                        <span className="truncate max-w-[120px]">{fileName}</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-1" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results Summary */}
            {processedFiles.length > 0 &&
              !isProcessing &&
              (successCount > 0 || errorCount > 0) && (
                <Alert
                  className={
                    errorCount > 0
                      ? "border-yellow-200 bg-yellow-50"
                      : "border-green-200 bg-green-50"
                  }
                >
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Processing complete: {successCount} successful, {errorCount} failed
                  </AlertDescription>
                </Alert>
              )}

            {/* File List with Status */}
            {processedFiles.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Files ({processedFiles.length})</h4>
                  {files.length > 0 && !isProcessing && (
                    <Button
                      onClick={handleBulkUpload}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={isProcessing}
                    >
                      Process Concurrently with AI
                    </Button>
                  )}
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {processedFiles.map((processedFile, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="relative">
                          <File className="h-5 w-5 text-gray-400" />
                          {processedFile.status === "success" && (
                            <CheckCircle className="h-3 w-3 text-green-600 absolute -top-1 -right-1" />
                          )}
                          {processedFile.status === "error" && (
                            <AlertCircle className="h-3 w-3 text-red-600 absolute -top-1 -right-1" />
                          )}
                          {processedFile.status === "processing" && (
                            <div className="h-3 w-3 bg-blue-600 rounded-full absolute -top-1 -right-1 animate-pulse" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">
                            {processedFile.file.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {processedFile.status === "pending" &&
                              "Ready for processing"}
                            {processedFile.status === "processing" &&
                              "Processing with AI..."}
                            {processedFile.status === "success" &&
                              "Successfully processed"}
                            {processedFile.status === "error" &&
                              `Error: ${processedFile.error}`}
                          </div>

                          {/* Enhanced progress bar for individual file */}
                          {processedFile.status === "processing" &&
                            uploadProgress[processedFile.file.name] !== undefined && (
                              <div className="flex items-center gap-2 mt-1">
                                <Progress
                                  value={uploadProgress[processedFile.file.name]}
                                  className="h-1 flex-1"
                                />
                                <span className="text-xs text-gray-500 min-w-[30px]">
                                  {uploadProgress[processedFile.file.name]}%
                                </span>
                              </div>
                            )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {processedFile.status === "success" &&
                          processedFile.result && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setSelectedPreview(processedFile)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-red-500"
                          onClick={() => removeFile(index)}
                          disabled={isProcessing}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {successCount > 0
              ? `Close (${successCount} processed)`
              : "Cancel"}
          </Button>
          {successCount > 0 && (
            <Button className="bg-green-600 hover:bg-green-700">
              Save {successCount} Resume{successCount !== 1 ? "s" : ""}
            </Button>
          )}
        </div>
      </DialogContent>

      {/* Preview Dialog */}
      {selectedPreview && (
        <Dialog
          open={!!selectedPreview}
          onOpenChange={() => setSelectedPreview(null)}
        >
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Extracted Data Preview - {selectedPreview.file.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedPreview.result && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Name:</label>
                      <p className="text-sm text-gray-600">
                        {selectedPreview.result.name || "Not found"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email:</label>
                      <p className="text-sm text-gray-600">
                        {selectedPreview.result.email || "Not found"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone:</label>
                      <p className="text-sm text-gray-600">
                        {selectedPreview.result.phone || "Not found"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Experience:</label>
                      <p className="text-sm text-gray-600">
                        {selectedPreview.result.experience?.length || 0} entries
                      </p>
                    </div>
                  </div>

                  {selectedPreview.result.skills && (
                    <div>
                      <label className="text-sm font-medium">Skills:</label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedPreview.result.skills
                          .slice(0, 10)
                          .map((skill: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        {selectedPreview.result.skills.length > 10 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{selectedPreview.result.skills.length - 10} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedPreview.result.summary && (
                    <div>
                      <label className="text-sm font-medium">Summary:</label>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                        {selectedPreview.result.summary}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
}