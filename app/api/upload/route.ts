import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth, AuthenticatedRequest } from '@/lib/middleware'
import { FileUtils, ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/lib/fileUtils'
import { createApiResponse } from '@/lib/validations'

// Apply authentication middleware and export as POST
export const POST = withAuth(async (request: AuthenticatedRequest) => {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const uploadType = formData.get('uploadType') as string || 'RESUME'

    if (!files || files.length === 0) {
      return NextResponse.json(
        createApiResponse(false, null, '', 'No files provided'),
        { status: 400 }
      )
    }

    const userId = request.user!.userId
    const uploadedFiles = []

    for (const file of files) {
      // Validate file type
      const allowedTypes = uploadType === 'RESUME' ? ALLOWED_FILE_TYPES.RESUME : ALLOWED_FILE_TYPES.DOCUMENT
      if (!FileUtils.isValidFileType(file.name, allowedTypes)) {
        return NextResponse.json(
          createApiResponse(false, null, '', `Invalid file type for ${file.name}. Allowed types: ${allowedTypes.join(', ')}`),
          { status: 400 }
        )
      }

      // Validate file size
      const maxSize = uploadType === 'RESUME' ? MAX_FILE_SIZE.RESUME : MAX_FILE_SIZE.DOCUMENT
      if (file.size > maxSize) {
        return NextResponse.json(
          createApiResponse(false, null, '', `File ${file.name} is too large. Maximum size: ${FileUtils.formatFileSize(maxSize)}`),
          { status: 400 }
        )
      }

      try {
        // Save file to disk
        const { fileName, filePath, fileSize } = await FileUtils.saveFile(file, uploadType.toLowerCase())

        // Save file record to database
        const resumeFile = await prisma.resumeFile.create({
          data: {
            originalName: file.name,
            fileName,
            filePath,
            fileSize,
            mimeType: file.type,
            uploadedBy: userId,
            status: 'PROCESSING',
          },
        })

        // Background task: Extract text from file
        FileUtils.extractTextFromFile(filePath, file.type)
          .then(async (extractedText) => {
            await prisma.resumeFile.update({
              where: { id: resumeFile.id },
              data: {
                extractedText,
                status: 'COMPLETED',
              },
            })
          })
          .catch(async (error) => {
            console.error('Text extraction failed:', error)
            await prisma.resumeFile.update({
              where: { id: resumeFile.id },
              data: {
                status: 'FAILED',
              },
            })
          })

        uploadedFiles.push({
          id: resumeFile.id,
          originalName: file.name,
          fileName,
          fileSize,
          mimeType: file.type,
          status: 'PROCESSING',
          uploadedAt: resumeFile.createdAt,
        })
      } catch (error) {
        console.error('File upload error:', error)
        return NextResponse.json(
          createApiResponse(false, null, '', `Failed to upload ${file.name}`),
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      createApiResponse(true, { files: uploadedFiles }, 'Files uploaded successfully'),
      { status: 201 }
    )
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      createApiResponse(false, null, '', 'Internal server error'),
      { status: 500 }
    )
  }
})
