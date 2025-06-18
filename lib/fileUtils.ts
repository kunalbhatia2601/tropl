import fs from 'fs'
import path from 'path'
import { writeFile, mkdir } from 'fs/promises'
import { createWorker } from 'tesseract.js'

export class FileUtils {
  static async ensureUploadDir(): Promise<string> {
    const uploadDir = path.join(process.cwd(), 'uploads')
    try {
      await mkdir(uploadDir, { recursive: true })
      await mkdir(path.join(uploadDir, 'resumes'), { recursive: true })
      await mkdir(path.join(uploadDir, 'documents'), { recursive: true })
    } catch (error) {
      console.error('Error creating upload directories:', error)
    }
    return uploadDir
  }

  static generateFileName(originalName: string): string {
    const ext = path.extname(originalName)
    const name = path.basename(originalName, ext)
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8)
    return `${name}-${timestamp}-${random}${ext}`
  }

  static async saveFile(
    file: File,
    subDir: string = 'documents'
  ): Promise<{ fileName: string; filePath: string; fileSize: number }> {
    const uploadDir = await this.ensureUploadDir()
    const targetDir = path.join(uploadDir, subDir)
    
    const fileName = this.generateFileName(file.name)
    const filePath = path.join(targetDir, fileName)
    
    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(filePath, buffer)
    
    return {
      fileName,
      filePath: path.relative(process.cwd(), filePath),
      fileSize: buffer.length,
    }
  }

  static deleteFile(filePath: string): boolean {
    try {
      const fullPath = path.join(process.cwd(), filePath)
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath)
        return true
      }
      return false
    } catch (error) {
      console.error('Error deleting file:', error)
      return false
    }
  }

  static getFileExtension(fileName: string): string {
    return path.extname(fileName).toLowerCase()
  }

  static isValidFileType(fileName: string, allowedTypes: string[]): boolean {
    const ext = this.getFileExtension(fileName)
    return allowedTypes.includes(ext)
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  static async extractTextFromImage(imagePath: string): Promise<string> {
    try {
      const worker = await createWorker('eng')
      const { data: { text } } = await worker.recognize(imagePath)
      await worker.terminate()
      return text
    } catch (error) {
      console.error('OCR extraction failed:', error)
      return ''
    }
  }

  static async extractTextFromPDF(pdfPath: string): Promise<string> {
    // This would require a PDF parsing library like pdf-parse
    // For now, return empty string as fallback
    return ''
  }

  static async extractTextFromFile(filePath: string, mimeType: string): Promise<string> {
    try {
      if (mimeType.startsWith('image/')) {
        return await this.extractTextFromImage(filePath)
      } else if (mimeType === 'application/pdf') {
        return await this.extractTextFromPDF(filePath)
      }
      return ''
    } catch (error) {
      console.error('Text extraction failed:', error)
      return ''
    }
  }
}

export const ALLOWED_FILE_TYPES = {
  RESUME: ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png'],
  IMAGE: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  DOCUMENT: ['.pdf', '.doc', '.docx', '.txt', '.xls', '.xlsx', '.ppt', '.pptx'],
}

export const MAX_FILE_SIZE = {
  RESUME: 5 * 1024 * 1024, // 5MB
  IMAGE: 2 * 1024 * 1024,  // 2MB  
  DOCUMENT: 10 * 1024 * 1024, // 10MB
}
