'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, X, DollarSign, MapPin, Clock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface JobDescription {
  title: string;
  description: string;
  keywords: string[];
  location: string;
  salaryRange: string;
  experience: string;
  jobType: string;
  department: string;
}

interface JDFormProps {
  onSubmit: (jd: JobDescription) => void;
  isLoading?: boolean;
}

export function JDForm({ onSubmit, isLoading = false }: JDFormProps) {
  const [formData, setFormData] = useState<JobDescription>({
    title: '',
    description: '',
    keywords: [],
    location: '',
    salaryRange: '',
    experience: '',
    jobType: 'Full-time',
    department: ''
  });
  
  const [newKeyword, setNewKeyword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field: keyof JobDescription, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.keywords.includes(newKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()]
      }));
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setShowSuccess(true);
    
    // Reset form after successful submission
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        title: '',
        description: '',
        keywords: [],
        location: '',
        salaryRange: '',
        experience: '',
        jobType: 'Full-time',
        department: ''
      });
    }, 2000);
  };

  const suggestedKeywords = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Project Management',
    'Consulting', 'Strategy', 'Data Analysis', 'Communication', 'Leadership'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Create Job Description</span>
        </CardTitle>
        <CardDescription>
          Define your role requirements to find the perfect candidates
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <FileText className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Job description created successfully! AI matching is now active.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Job Title*</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Senior Consultant"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                placeholder="e.g., Strategy & Operations"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Job Description*</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the role, responsibilities, and requirements..."
              rows={6}
              required
              className="resize-none"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="location" className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Location*</span>
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., New York, NY"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="salaryRange" className="flex items-center space-x-1">
                <DollarSign className="h-4 w-4" />
                <span>Salary Range</span>
              </Label>
              <Input
                id="salaryRange"
                value={formData.salaryRange}
                onChange={(e) => handleInputChange('salaryRange', e.target.value)}
                placeholder="e.g., $80k - $120k"
              />
            </div>
            
            <div>
              <Label htmlFor="experience" className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Experience*</span>
              </Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                placeholder="e.g., 3-5 years"
                required
              />
            </div>
          </div>

          <div>
            <Label>Skills & Keywords*</Label>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={handleKeywordKeyPress}
                  placeholder="Add required skills..."
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  onClick={addKeyword}
                  disabled={!newKeyword.trim()}
                  className="px-4"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {formData.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.keywords.map((keyword, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="flex items-center space-x-1"
                    >
                      <span>{keyword}</span>
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              
              <div>
                <p className="text-sm text-gray-600 mb-2">Suggested keywords:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedKeywords
                    .filter(keyword => !formData.keywords.includes(keyword))
                    .map((keyword, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        keywords: [...prev.keywords, keyword]
                      }))}
                      className="text-xs bg-gray-100 hover:bg-primary/10 text-gray-700 hover:text-primary px-2 py-1 rounded transition-colors"
                    >
                      + {keyword}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading || !formData.title || !formData.description || !formData.location || !formData.experience || formData.keywords.length === 0}
          >
            {isLoading ? 'Creating Job Description...' : 'Create Job Description & Start Matching'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}