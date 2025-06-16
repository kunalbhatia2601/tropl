'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  User, FileText, Star, Calendar, Settings, Download, Eye, Upload, 
  MapPin, DollarSign, Briefcase, Clock, CheckCircle, TrendingUp,
  Target, Award, MessageSquare, Bell, BookOpen, BarChart3
} from 'lucide-react';
import Link from 'next/link';

export default function CandidateDashboard() {
  const [candidate] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    experience: 'Mid Level (3-5 years)',
    expectedSalary: '$80,000 - $120,000',
    profileComplete: 95,
    lastLogin: '2024-01-10',
    memberSince: '2024-01-05',
    title: 'Business Analyst',
    skills: ['Data Analysis', 'Project Management', 'SQL', 'Excel', 'PowerBI']
  });

  const [resumes] = useState([
    {
      id: '1',
      name: 'John_Doe_Resume_2024.pdf',
      uploadDate: '2024-01-10',
      status: 'processed',
      aiScore: 85,
      matchJobs: 12,
      size: '2.4 MB'
    },
    {
      id: '2',
      name: 'John_Doe_Cover_Letter.pdf',
      uploadDate: '2024-01-08',
      status: 'processed',
      aiScore: 78,
      matchJobs: 8,
      size: '1.2 MB'
    }
  ]);

  const [interviews] = useState([
    {
      id: '1',
      jobTitle: 'Senior Business Analyst',
      company: 'McKinsey & Co',
      status: 'completed',
      score: 88,
      date: '2024-01-12',
      feedback: 'Strong analytical skills, excellent communication',
      matchPercentage: 92
    },
    {
      id: '2',
      jobTitle: 'Strategy Consultant',
      company: 'BCG',
      status: 'scheduled',
      date: '2024-01-15',
      interviewLink: 'https://meet.google.com/abc-def-ghi',
      matchPercentage: 87
    }
  ]);

  const [jobMatches] = useState([
    {
      id: '1',
      title: 'Senior Business Analyst',
      company: 'Deloitte',
      location: 'New York, NY',
      salary: '$90k - $130k',
      matchPercentage: 95,
      postedDate: '2 days ago',
      status: 'new'
    },
    {
      id: '2',
      title: 'Data Analyst',
      company: 'PwC',
      location: 'Boston, MA',
      salary: '$75k - $110k',
      matchPercentage: 89,
      postedDate: '1 week ago',
      status: 'applied'
    }
  ]);

  const [notifications] = useState([
    {
      id: '1',
      type: 'match',
      title: 'New Job Match Found!',
      message: 'You have a 95% match with "Senior Consultant" at Deloitte',
      date: '2024-01-10',
      isRead: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'interview',
      title: 'Interview Reminder',
      message: 'Your AI interview for BCG is scheduled for tomorrow at 2:00 PM',
      date: '2024-01-14',
      isRead: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'profile',
      title: 'Profile Update Suggestion',
      message: 'Add more skills to increase your match rate by 15%',
      date: '2024-01-13',
      isRead: true,
      priority: 'low'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-gray-100 text-gray-700';
      case 'scheduled': return 'bg-gray-200 text-gray-800';
      case 'processing': return 'bg-gray-100 text-gray-600';
      case 'applied': return 'bg-gray-200 text-gray-700';
      case 'new': return 'bg-gray-800 text-white';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getMatchColor = (match: number) => {
    return 'text-gray-700';
  };

  const getPriorityIcon = (priority: string) => {
    return <div className="w-2 h-2 bg-gray-400 rounded-full"></div>;
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {candidate.name}
              </h1>
              <p className="text-lg text-gray-600">
                Your career journey continues here - track progress and discover opportunities
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex space-x-3">
              <Link href="/candidate/upload-resume">
                <Button className="bg-gray-800 hover:bg-gray-900">
                  <Upload className="h-4 w-4 mr-2" />
                  Update Resume
                </Button>
              </Link>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Enhanced Profile Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="border shadow-sm">
              <CardHeader className="text-center pb-4">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarFallback className="bg-gray-600 text-white text-2xl font-bold">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{candidate.name}</CardTitle>
                <CardDescription className="text-gray-600 font-medium">{candidate.title}</CardDescription>
                <Badge className="bg-gray-100 text-gray-700 mt-2">
                  Active Candidate
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{candidate.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-gray-500" />
                    <span>{candidate.experience}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span>{candidate.expectedSalary}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>Member since {candidate.memberSince}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-gray-700">Profile Strength</span>
                    <span className="text-sm font-bold text-gray-700">{candidate.profileComplete}%</span>
                  </div>
                  <Progress value={candidate.profileComplete} className="h-3 mb-2" />
                  <p className="text-xs text-gray-600">
                    {candidate.profileComplete >= 90 ? 'Excellent profile!' : 'Add more details to improve visibility'}
                  </p>
                </div>

                <Button className="w-full mt-4 bg-gray-800 hover:bg-gray-900">
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-gray-600" />
                  <span>Your Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg border">
                    <div className="text-2xl font-bold text-gray-700">12</div>
                    <div className="text-xs text-gray-600">Job Matches</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg border">
                    <div className="text-2xl font-bold text-gray-700">2</div>
                    <div className="text-xs text-gray-600">Interviews</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg border">
                    <div className="text-2xl font-bold text-gray-700">85</div>
                    <div className="text-xs text-gray-600">AI Score</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg border">
                    <div className="text-2xl font-bold text-gray-700">3</div>
                    <div className="text-xs text-gray-600">Applications</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Overview */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Target className="h-5 w-5 text-gray-600" />
                  <span>Top Skills</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Manage Skills
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Notifications */}
            <Card className="border shadow-sm">
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span>Recent Updates</span>
                </CardTitle>
                <CardDescription>Stay informed about your applications and opportunities</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {notifications.slice(0, 3).map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                      {getPriorityIcon(notification.priority)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900">{notification.title}</h4>
                          {!notification.isRead && (
                            <Badge className="bg-gray-100 text-gray-700 text-xs">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Job Matches */}
            <Card className="border shadow-sm">
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-gray-600" />
                  <span>Recommended Jobs</span>
                </CardTitle>
                <CardDescription>AI-powered job matches based on your profile</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {jobMatches.map((job) => (
                    <div key={job.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{job.title}</h4>
                          <p className="text-gray-700 font-medium">{job.company}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {job.location}
                            </span>
                            <span className="flex items-center">
                              <DollarSign className="h-3 w-3 mr-1" />
                              {job.salary}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {job.postedDate}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getMatchColor(job.matchPercentage)} mb-1`}>
                            {job.matchPercentage}%
                          </div>
                          <p className="text-xs text-gray-600">Match</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(job.status)}>
                          {job.status === 'new' ? 'New Match' : 'Applied'}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          {job.status === 'new' && (
                            <Button size="sm" className="bg-gray-800 hover:bg-gray-900">
                              Apply Now
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Job Matches
                </Button>
              </CardContent>
            </Card>

            {/* Resume Management */}
            <Card className="border shadow-sm">
              <CardHeader className="bg-gray-50 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <span>Resume Management</span>
                  </CardTitle>
                  <CardDescription>Manage your documents and AI analysis results</CardDescription>
                </div>
                <Link href="/candidate/upload-resume">
                  <Button size="sm" className="bg-gray-800 hover:bg-gray-900">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {resumes.map((resume) => (
                    <div key={resume.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{resume.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>Uploaded {resume.uploadDate}</span>
                            <span>•</span>
                            <span>{resume.size}</span>
                            <span>•</span>
                            <span className="text-gray-700 font-medium">AI Score: {resume.aiScore}/100</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {resume.matchJobs} job matches found
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(resume.status)}>
                          {resume.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interview History */}
            <Card className="border shadow-sm">
              <CardHeader className="bg-gray-50 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-gray-600" />
                    <span>Interview Progress</span>
                  </CardTitle>
                  <CardDescription>Track your interview performance and feedback</CardDescription>
                </div>
                <Link href="/candidate/interview-status">
                  <Button size="sm" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {interviews.map((interview) => (
                    <div key={interview.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{interview.jobTitle}</h4>
                          <p className="text-gray-700 font-medium">{interview.company}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {interview.status === 'completed' 
                              ? `Completed on ${interview.date}` 
                              : `Scheduled for ${interview.date}`
                            }
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(interview.status)}>
                            {interview.status}
                          </Badge>
                          {interview.matchPercentage && (
                            <div className={`text-lg font-bold ${getMatchColor(interview.matchPercentage)} mt-1`}>
                              {interview.matchPercentage}% Match
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {interview.status === 'completed' && interview.score && (
                        <div className="bg-gray-50 p-3 rounded-lg mb-3 border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Interview Score</span>
                            <span className="text-lg font-bold text-gray-700">{interview.score}/100</span>
                          </div>
                          <Progress value={interview.score} className="mb-2" />
                          {interview.feedback && (
                            <p className="text-sm text-gray-600 italic">&quot;{interview.feedback}&quot;</p>
                          )}
                        </div>
                      )}
                      
                      {interview.status === 'scheduled' && (
                        <Button size="sm" className="bg-gray-800 hover:bg-gray-900">
                          <Calendar className="h-4 w-4 mr-2" />
                          Join Interview
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}