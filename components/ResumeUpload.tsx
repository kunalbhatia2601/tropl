'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadProgress: number;
  status: 'uploading' | 'completed' | 'error';
}

interface ResumeUploadProps {
  onUploadComplete: (files: UploadedFile[]) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
}

export function ResumeUpload({ 
  onUploadComplete, 
  maxFiles = 5, 
  acceptedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'image/jpeg', 'image/jpg', 'image/png'] 
}: ResumeUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileTypeLabel = (type: string) => {
    if (type.includes('pdf')) return 'PDF';
    if (type.includes('word') || type.includes('document')) return 'DOC';
    if (type.includes('text')) return 'TXT';
    if (type.includes('image')) return 'IMG';
    return 'FILE';
  };
  const uploadToAPI = async (file: File, uploadedFile: UploadedFile) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const result = await response.json();
      
      setFiles(prev => prev.map(f => 
        f.id === uploadedFile.id 
          ? { 
              ...f, 
              uploadProgress: 100, 
              status: 'completed',
              extractedData: result.extractedData,
              fileName: result.fileName
            }
          : f
      ));

      return result;
    } catch (error) {
      console.error('Upload error:', error);
      setFiles(prev => prev.map(f => 
        f.id === uploadedFile.id 
          ? { ...f, status: 'error' }
          : f
      ));
      throw error;
    }
  };
  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    
    if (files.length + fileArray.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const uploadFiles: UploadedFile[] = fileArray.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadProgress: 0,
      status: 'uploading' as const
    }));

    setFiles(prev => [...prev, ...uploadFiles]);

    // Upload each file to the API
    uploadFiles.forEach(async (uploadedFile) => {
      const actualFile = fileArray.find(f => f.name === uploadedFile.name);
      if (actualFile) {
        try {
          await uploadToAPI(actualFile, uploadedFile);
        } catch (error) {
          console.error('Upload failed for file:', uploadedFile.name, error);
        }
      }
    });
  }, [files.length, maxFiles]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles) {
      handleFiles(droppedFiles);
    }
  }, [handleFiles]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File input changed', e.target.files); // Debug log
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const triggerFileSelect = () => {
    console.log('Button clicked, triggering file input'); // Debug log
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    triggerFileSelect();
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleSubmit = () => {
    const completedFiles = files.filter(f => f.status === 'completed');
    if (completedFiles.length > 0) {
      onUploadComplete(completedFiles);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Upload Resume</span>
          </CardTitle>
          <CardDescription>
            Upload your resume in PDF, DOC, TXT, or image format (max {maxFiles} files)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              isDragOver 
                ? 'border-primary bg-primary/10' 
                : 'border-gray-300 hover:border-primary/60'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onClick={triggerFileSelect}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG (max 10MB each)
            </p>
            <input
              type="file"
              multiple
              accept={acceptedTypes.join(',')}
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <Button 
              type="button" 
              onClick={handleButtonClick}
              className="bg-primary hover:bg-primary/90"
            >
              Select Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {files.map((file) => (
                <div key={file.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      {file.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : file.status === 'error' ? (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      ) : (
                        <FileText className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {getFileTypeLabel(file.type)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </span>
                      </div>
                    </div>
                    
                    {file.status === 'uploading' && (
                      <div className="space-y-1">
                        <Progress value={file.uploadProgress} className="h-2" />
                        <p className="text-xs text-gray-500">
                          Uploading... {Math.round(file.uploadProgress)}%
                        </p>
                      </div>
                    )}
                    
                    {file.status === 'completed' && (
                      <p className="text-xs text-green-600">Upload completed</p>
                    )}
                    
                    {file.status === 'error' && (
                      <p className="text-xs text-red-600">Upload failed</p>
                    )}
                  </div>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFile(file.id)}
                    className="flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {files.some(f => f.status === 'completed') && (
              <div className="mt-6">
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Resume uploaded successfully! Our AI is processing your information.
                  </AlertDescription>
                </Alert>
                
                <Button 
                  onClick={handleSubmit}
                  className="w-full mt-4 bg-primary hover:bg-primary/90"
                >
                  Continue to Profile Information
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}