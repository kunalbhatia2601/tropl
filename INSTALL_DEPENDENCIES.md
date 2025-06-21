# Install the required packages for resume processing

# Google Generative AI for resume parsing (supports PDF natively)
npm install @google/generative-ai

# Word document parsing library
npm install mammoth

# Make sure you have your Google AI API key set in .env.local:
# GOOGLE_AI_API_KEY=your_api_key_here

# Note: PDF files are now handled natively by Gemini AI, no additional PDF parsing library needed