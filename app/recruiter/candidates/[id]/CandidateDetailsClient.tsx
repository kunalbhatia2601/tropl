'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, Star, MapPin, DollarSign, Calendar, Phone, Mail, 
  FileText, Video, Download, Eye, MessageSquare, Clock, CheckCircle 
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface CandidateDetailsClientProps {
  candidateId: string;
}

export default function CandidateDetailsClient({ candidateId }: CandidateDetailsClientProps) {
  const router = useRouter();

  // Mock candidate data - would be fetched based on ID
  const [candidate] = useState({
    id: candidateId,
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    experience: '5+ years in consulting',
    expectedSalary: '$120k - $150k',
    aiScore: 92,
    matchPercentage: 88,
    skills: ['Strategy', 'Data Analysis', 'Project Management', 'McKinsey', 'Excel', 'PowerPoint'],
    appliedDate: '2024-01-08',
    resumeUrl: '#',
    videoUrl: '#',
    summary: 'Experienced management consultant with a strong background in strategy development and data-driven decision making. Proven track record of leading cross-functional teams and delivering high-impact solutions for Fortune 500 clients.',
    education: [
      { degree: 'MBA', school: 'Harvard Business School', year: '2019' },
      { degree: 'BS Economics', school: 'MIT', year: '2015' }
    ],
    workHistory: [
      {
        company: 'McKinsey & Company',
        role: 'Senior Associate',
        duration: '2020 - Present',
        description: 'Led strategic initiatives for Fortune 500 clients across healthcare and technology sectors'
      },
      {
        company: 'Bain & Company',
        role: 'Associate Consultant',
        duration: '2019 - 2020',
        description: 'Conducted market research and competitive analysis for private equity clients'
      }
    ],
    interviewStatus: 'completed',
    interviewScore: 88,
    interviewFeedback: 'Excellent communication skills and strong analytical thinking. Shows great potential for senior consulting roles.'
  });

  const [recruiterNotes, setRecruiterNotes] = useState('');
  const [recruiterRating, setRecruiterRating] = useState('');
  const [interviewScheduled, setInterviewScheduled] = useState(false);

  const handleSaveNotes = () => {
    console.log('Saving notes:', recruiterNotes);
    // TODO: connect to API
  };

  const handleScheduleInterview = () => {
    setInterviewScheduled(true);
    console.log('Scheduling interview for candidate:', candidateId);
    // TODO: connect to API
  };

  const handleShortlist = () => {
    console.log('Shortlisting candidate:', candidateId);
    // TODO: connect to API
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Candidates
          </Button>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-semibold">
                  {candidate.name.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{candidate.name}</h1>
                <p className="text-gray-600">{candidate.experience}</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {candidate.location}
                  </span>
                  <span className="flex items-center text-sm text-gray-500">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {candidate.expectedSalary}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Badge className="bg-blue-100 text-blue-800">
                {candidate.matchPercentage}% Match
              </Badge>
              <Badge className={getStatusColor(candidate.interviewStatus)}>
                Interview {candidate.interviewStatus}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI & Interview Scores */}
            <Card>
              <CardHeader>
                <CardTitle>Assessment Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">AI Profile Score</span>
                      <span className={`text-2xl font-bold ${getScoreColor(candidate.aiScore)}`}>
                        {candidate.aiScore}/100
                      </span>
                    </div>
                    <Progress value={candidate.aiScore} className="mb-2" />
                    <p className="text-xs text-gray-600">
                      Based on resume analysis and skill matching
                    </p>
                  </div>
                  
                  {candidate.interviewScore && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Interview Score</span>
                        <span className={`text-2xl font-bold ${getScoreColor(candidate.interviewScore)}`}>
                          {candidate.interviewScore}/100
                        </span>
                      </div>
                      <Progress value={candidate.interviewScore} className="mb-2" />
                      <p className="text-xs text-gray-600">
                        AI-powered interview assessment
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Professional Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{candidate.summary}</p>
              </CardContent>
            </Card>

            {/* Work Experience */}
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidate.workHistory.map((job: any, index: number) => (
                    <div key={index} className="border-l-2 border-blue-200 pl-4">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900">{job.role}</h4>
                        <span className="text-sm text-gray-500">{job.duration}</span>
                      </div>
                      <p className="text-blue-600 font-medium mb-2">{job.company}</p>
                      <p className="text-gray-600 text-sm">{job.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {candidate.education.map((edu: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                        <p className="text-gray-600">{edu.school}</p>
                      </div>
                      <span className="text-sm text-gray-500">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interview Feedback */}
            {candidate.interviewFeedback && (
              <Card>
                <CardHeader>
                  <CardTitle>AI Interview Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-900 italic">"{candidate.interviewFeedback}"</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Actions & Info */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{candidate.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{candidate.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Applied {candidate.appliedDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Documents & Media */}
            <Card>
              <CardHeader>
                <CardTitle>Documents & Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View Resume
                  <Download className="h-4 w-4 ml-auto" />
                </Button>
                
                {candidate.videoUrl && (
                  <Button variant="outline" className="w-full justify-start">
                    <Video className="h-4 w-4 mr-2" />
                    Watch Interview
                    <Eye className="h-4 w-4 ml-auto" />
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleShortlist}
                >
                  <Star className="h-4 w-4 mr-2" />
                  Add to Shortlist
                </Button>
                
                {!interviewScheduled ? (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleScheduleInterview}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Schedule 1-on-1 Interview
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Interview Scheduled
                  </Button>
                )}
                
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Recruiter Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Recruiter Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="rating">Your Rating</Label>
                  <Select value={recruiterRating} onValueChange={setRecruiterRating}>
                    <SelectTrigger>
                      <SelectValue placeholder="Rate this candidate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="average">Average</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add your notes about this candidate..."
                    value={recruiterNotes}
                    onChange={(e) => setRecruiterNotes(e.target.value)}
                    rows={4}
                  />
                </div>
                
                <Button 
                  onClick={handleSaveNotes}
                  className="w-full"
                  disabled={!recruiterNotes.trim()}
                >
                  Save Assessment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
