import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, MapPin, Calendar, DollarSign, Eye } from 'lucide-react';
import Link from 'next/link';

interface CandidateCardProps {
  candidate: {
    id: string;
    name: string;
    email: string;
    experience: string;
    location: string;
    expectedSalary: string;
    aiScore: number;
    matchPercentage: number;
    skills: string[];
    appliedDate: string;
    resumeUrl?: string;
    videoUrl?: string;
    isShortlisted?: boolean;
  };
  onShortlist?: (candidateId: string) => void;
  onNotify?: (candidateId: string) => void;
}

export function CandidateCard({ candidate, onShortlist, onNotify }: CandidateCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMatchColor = (match: number) => {
    if (match >= 80) return 'bg-green-100 text-green-800';
    if (match >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{candidate.name}</CardTitle>
              <CardDescription className="flex items-center space-x-4 text-sm">
                <span>{candidate.email}</span>
                <span className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {candidate.location}
                </span>
              </CardDescription>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <Badge className={getMatchColor(candidate.matchPercentage)}>
              {candidate.matchPercentage}% Match
            </Badge>
            {candidate.isShortlisted && (
              <Badge className="bg-primary/10 text-primary">
                Shortlisted
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Star className={`h-4 w-4 ${getScoreColor(candidate.aiScore)}`} />
            <span className="text-sm">
              AI Score: <span className={`font-semibold ${getScoreColor(candidate.aiScore)}`}>
                {candidate.aiScore}/100
              </span>
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">{candidate.expectedSalary}</span>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Experience:</span> {candidate.experience}
          </p>
          <div className="flex flex-wrap gap-1">
            {candidate.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{candidate.skills.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            <span>Applied {candidate.appliedDate}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {candidate.videoUrl && (
              <Button size="sm" variant="outline" className="text-xs">
                <Eye className="h-3 w-3 mr-1" />
                Video
              </Button>
            )}
            
            <Link href={`/recruiter/candidates/${candidate.id}`}>
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-xs">
                View Details
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex space-x-2 pt-2">
          {!candidate.isShortlisted && onShortlist && (
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={() => onShortlist(candidate.id)}
            >
              Shortlist
            </Button>
          )}
          
          {onNotify && (
            <Button 
              size="sm" 
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={() => onNotify(candidate.id)}
            >
              Notify with JD
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}