import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import mammoth from 'mammoth';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI || "");

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'image/jpeg',
      'image/jpg',
      'image/png'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = join(uploadsDir, fileName);
    
    await writeFile(filePath, buffer);

    // Process with Gemini AI
    let extractedData;
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      let prompt = '';
      let fileData = null;      
      
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        // For images and PDFs, send directly to Gemini AI
        const base64Data = buffer.toString('base64');
        fileData = {
          inlineData: {
            data: base64Data,
            mimeType: file.type
          }
        };
        prompt = `Extract all information from this resume ${file.type === 'application/pdf' ? 'PDF' : 'image'} and format it as JSON with the following structure:`;
      } else if (file.type === 'text/plain') {
        // For text files, read content directly
        const textContent = buffer.toString('utf-8');
        prompt = `Extract all information from this resume text and format it as JSON with the following structure:\n\nResume content:\n${textContent}\n\n`;
      } else if (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // For DOC/DOCX files, extract text using mammoth
        try {
          const result = await mammoth.extractRawText({ buffer });
          const textContent = result.value;
          prompt = `Extract all information from this resume text and format it as JSON with the following structure:\n\nResume content:\n${textContent}\n\n`;
        } catch (docError) {
          console.error('Document parsing error:', docError);
          return NextResponse.json({ 
            error: 'Failed to parse Word document. Please try converting to text or image format.' 
          }, { status: 400 });
        }
      } else {
        return NextResponse.json({ 
          error: 'Unsupported file type' 
        }, { status: 400 });
      }

      prompt += `
{
  "name": "Full Name",
  "email": "email@example.com",
  "phone": "phone number",
  "contactDetails": {
    "address": "address if available",
    "linkedin": "linkedin url if available",
    "github": "github url if available",
    "website": "personal website if available",
    "twitter": "twitter handle if available"
  },
  "socialLinks": ["array of social media links"],
  "experience": [
    {
      "company": "Company Name",
      "position": "Job Title",
      "tenure": "Duration (e.g., Jan 2020 - Dec 2022)",
      "description": "Job description",
      "skills": ["relevant skills used"]
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "link": "project url if available",
      "description": "project description",
      "skills": ["technologies used"]
    }
  ],
  "skills": ["array of all skills mentioned"],
  "education": [
    {
      "institution": "School/University Name",
      "degree": "Degree Name",
      "field": "Field of Study",
      "year": "Graduation Year",
      "score": "GPA/Percentage if mentioned"
    }
  ],
  "certifications": [
    {
      "name": "Certification Name",
      "issuer": "Issuing Organization",
      "date": "Date of Issue"
    }
  ],
  "summary": "A long summary of the resume, including key achievements and career highlights, techniques used, and any notable contributions."
}

Return only the JSON object, no additional text or formatting.`;

      const result = fileData 
        ? await model.generateContent([prompt, fileData])
        : await model.generateContent(prompt);

      const response = await result.response;
      let text = response.text();
      
      try {

        text = text.replace(/```json\n?|\n?```/g, '').trim();

        extractedData = JSON.parse(text);
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
        return NextResponse.json({ 
          error: 'Failed to parse AI response',
          rawResponse: text 
        }, { status: 500 });
      }

    } catch (aiError) {
      console.error('Gemini AI error:', aiError);
      return NextResponse.json({ 
        error: 'Failed to process resume with AI',
        details: aiError instanceof Error ? aiError.message : 'Unknown error'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      fileName: fileName,
      filePath: filePath,
      extractedData: extractedData
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Upload failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}