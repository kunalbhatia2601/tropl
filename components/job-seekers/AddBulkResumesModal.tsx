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
import { useState } from "react";

interface AddBulkResumesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddBulkResumesModal({ open, onOpenChange }: AddBulkResumesModalProps) {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Bulk Resumes</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Upload className="h-12 w-12 text-gray-400" />
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Drag and drop your files here, or click to select files
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: PDF, DOC, DOCX, ZIP
                  </p>
                </div>
                <Input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.zip"
                  onChange={handleFileChange}
                  className="hidden"
                  id="bulk-upload"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("bulk-upload")?.click()}
                >
                  Select Files
                </Button>
              </div>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Selected Files</h4>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                    >
                      <div className="flex items-center space-x-2">
                        <File className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-400 hover:text-red-500"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700"
            disabled={files.length === 0}
          >
            Upload {files.length} {files.length === 1 ? "File" : "Files"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 