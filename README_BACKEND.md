# Recruitment Platform Backend

A comprehensive backend API for a recruitment platform built with Next.js, Prisma, and MongoDB.

## Features

- **Authentication**: OTP-based login via email/SMS
- **User Management**: Support for Recruiters, Candidates, and Admins
- **Job Management**: Create, update, and manage job postings
- **Application Tracking**: Track job applications through different stages
- **Interview Scheduling**: Schedule and manage interviews
- **File Upload**: Resume and document upload with OCR support
- **Client & Vendor Management**: Manage clients and vendors
- **Dashboard Analytics**: Recruitment metrics and statistics

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: MongoDB with Prisma ORM
- **Authentication**: JWT tokens with OTP verification
- **File Upload**: Multer with Tesseract.js for OCR
- **Email**: Nodemailer for OTP and notifications
- **Validation**: Zod for request validation
- **TypeScript**: Full type safety

## Prerequisites

- Node.js 18+ 
- MongoDB instance (local or cloud)
- SMTP server for email (Gmail, SendGrid, etc.)

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd recruitment-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env` and update with your values:
   ```env
   # Database
   DATABASE_URL="mongodb://localhost:27017/recruitment_platform"
   # Or for MongoDB Atlas:
   # DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/recruitment_platform"
   
   # Authentication
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here-change-in-production
   JWT_SECRET=your-jwt-secret-key-here-change-in-production
   
   # Email Configuration (for OTP)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   
   # File Upload
   UPLOAD_DIR=./uploads
   MAX_FILE_SIZE=5242880  # 5MB in bytes
   
   # App Configuration
   NODE_ENV=development
   PORT=3000
   ```

4. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

5. **Push database schema** (MongoDB doesn't need migrations)
   ```bash
   npx prisma db push
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

## API Documentation

### Authentication

#### POST `/api/auth/login`
Send OTP to email/phone for login
```json
{
  "contact": "user@example.com",
  "method": "email"
}
```

#### POST `/api/auth/verify-otp`
Verify OTP and get authentication token
```json
{
  "contact": "user@example.com",
  "otp": "123456",
  "method": "email"
}
```

#### GET `/api/auth/me`
Get current user information (requires authentication)

### Candidates

#### GET `/api/candidates`
List all candidates with pagination and filtering
- Query params: `page`, `limit`, `query`, `filters`

#### POST `/api/candidates`
Create candidate profile (authenticated)
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "jobTitle": "Software Engineer",
  "experience": 5,
  "skills": ["JavaScript", "React", "Node.js"],
  "location": "New York, NY",
  "availability": "AVAILABLE"
}
```

#### GET `/api/candidates/[id]`
Get candidate by ID

#### PUT `/api/candidates/[id]`
Update candidate profile

#### DELETE `/api/candidates/[id]`
Delete candidate profile

### Jobs

#### GET `/api/jobs`
List all jobs with pagination and filtering

#### POST `/api/jobs`
Create new job (Recruiters/Admins only)
```json
{
  "title": "Senior React Developer",
  "description": "We are looking for...",
  "requirements": ["React", "TypeScript", "5+ years experience"],
  "location": "Remote",
  "jobType": "FULL_TIME",
  "experienceLevel": "SENIOR_LEVEL",
  "minSalary": 80000,
  "maxSalary": 120000,
  "clientId": "client_id_here"
}
```

### Clients

#### GET `/api/clients`
List all clients

#### POST `/api/clients`
Create new client (Recruiters/Admins only)
```json
{
  "name": "Tech Corp Inc",
  "contactPerson": "Jane Smith",
  "email": "jane@techcorp.com",
  "phone": "+1-555-0123",
  "industry": "Technology"
}
```

### Vendors

#### GET `/api/vendors`
List all vendors

#### POST `/api/vendors`
Create new vendor (Recruiters/Admins only)
```json
{
  "name": "Recruitment Solutions",
  "contactPerson": "Bob Johnson",
  "email": "bob@recruitmentsolutions.com",
  "specialization": ["IT", "Engineering", "Sales"]
}
```

### File Upload

#### POST `/api/upload`
Upload resume or document files
```json
{
  "file": "multipart/form-data",
  "uploadType": "RESUME"
}
```

### Job Applications

#### GET `/api/applications`
List job applications

#### POST `/api/applications`
Apply for a job
```json
{
  "jobId": "job_id_here",
  "coverLetter": "I am interested in this position..."
}
```

### Interviews

#### GET `/api/interviews`
List interviews

#### POST `/api/interviews`
Schedule an interview
```json
{
  "jobId": "job_id_here",
  "candidateId": "candidate_id_here",
  "title": "Technical Interview",
  "scheduledAt": "2025-06-20T10:00:00Z",
  "type": "VIDEO",
  "meetingLink": "https://meet.google.com/abc-def-ghi"
}
```

### Dashboard

#### GET `/api/dashboard/stats`
Get recruitment statistics (Recruiters/Admins only)

## Database Schema

The application uses MongoDB with the following main collections:

- **users**: User accounts with authentication
- **recruiters**: Recruiter profiles
- **candidates**: Candidate profiles with skills and experience
- **clients**: Client companies
- **vendors**: Recruitment vendors
- **jobs**: Job postings
- **job_applications**: Job applications with status tracking
- **interviews**: Interview scheduling and feedback
- **resume_files**: Uploaded resume files with OCR text

## Authentication & Authorization

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### User Roles:
- **CANDIDATE**: Can create profile, apply for jobs, manage applications
- **RECRUITER**: Can create jobs, manage candidates, schedule interviews
- **ADMIN**: Full access to all features

## File Upload

The API supports file uploads for resumes and documents:
- Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG
- Maximum file size: 5MB
- OCR text extraction for image files
- Files stored in `/uploads` directory

## Error Handling

All API endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "data": null
}
```

HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

## Development

### Running Tests
```bash
npm test
```

### Database Management
```bash
# View database in Prisma Studio
npx prisma studio

# Reset database (be careful!)
npx prisma db push --reset
```

### Code Quality
```bash
# Run linting
npm run lint

# Run type checking
npm run type-check
```

## Deployment

### Environment Setup
1. Set up MongoDB database (MongoDB Atlas recommended)
2. Configure SMTP server for emails
3. Set up file storage (local or cloud)
4. Update environment variables for production

### Build & Deploy
```bash
# Build for production
npm run build

# Start production server
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and add tests
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please contact the development team or create an issue in the repository.
