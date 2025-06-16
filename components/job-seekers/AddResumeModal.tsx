import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useState } from "react";

interface AddResumeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddResumeModal({ open, onOpenChange }: AddResumeModalProps) {
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  // Experiences state
  const [experiences, setExperiences] = useState([
    { client: "", startMonth: "", startYear: "", endMonth: "", endYear: "", present: false }
  ]);
  // Education state
  const [education, setEducation] = useState([
    { degree: "", year: "" }
  ]);
  // Reference details state
  const [references, setReferences] = useState([
    { name: "", designation: "", email: "", phone: "" }
  ]);
  // Other documents state
  const [otherDocs, setOtherDocs] = useState([
    { type: "", name: "", file: null as File | null }
  ]);

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  // Experience handlers
  const addExperience = () => setExperiences([...experiences, { client: "", startMonth: "", startYear: "", endMonth: "", endYear: "", present: false }]);
  const removeExperience = (idx: number) => setExperiences(experiences.filter((_, i) => i !== idx));
  const updateExperience = (idx: number, field: string, value: any) => {
    setExperiences(experiences.map((exp, i) => i === idx ? { ...exp, [field]: value } : exp));
  };

  // Education handlers
  const addEducation = () => setEducation([...education, { degree: "", year: "" }]);
  const removeEducation = (idx: number) => setEducation(education.filter((_, i) => i !== idx));
  const updateEducation = (idx: number, field: string, value: any) => {
    setEducation(education.map((edu, i) => i === idx ? { ...edu, [field]: value } : edu));
  };

  // Reference handlers
  const addReference = () => setReferences([...references, { name: "", designation: "", email: "", phone: "" }]);
  const removeReference = (idx: number) => setReferences(references.filter((_, i) => i !== idx));
  const updateReference = (idx: number, field: string, value: any) => {
    setReferences(references.map((ref, i) => i === idx ? { ...ref, [field]: value } : ref));
  };

  // Other document handlers
  const addOtherDoc = () => setOtherDocs([...otherDocs, { type: "", name: "", file: null }]);
  const removeOtherDoc = (idx: number) => setOtherDocs(otherDocs.filter((_, i) => i !== idx));
  const updateOtherDoc = (idx: number, field: string, value: any) => {
    setOtherDocs(otherDocs.map((doc, i) => i === idx ? { ...doc, [field]: value } : doc));
  };

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const years = Array.from({ length: 50 }, (_, i) => `${new Date().getFullYear() - i}`);

  // Add state and city options
  const stateOptions = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Puducherry", "Jammu and Kashmir", "Ladakh"
  ];
  const cityOptions = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Resume</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Documents - moved to top */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Documents</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="resume">Resume</Label>
                <Input id="resume" type="file" accept=".pdf,.doc,.docx" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="idDoc">ID Document</Label>
                <Input id="idDoc" type="file" accept=".pdf,.jpg,.jpeg,.png" />
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name<span className="text-red-500">*</span></Label>
                <Input id="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="middleName">Middle Name</Label>
                <Input id="middleName" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name<span className="text-red-500">*</span></Label>
                <Input id="lastName" required />
              </div>
              <div className="space-y-2 col-span-1">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" />
              </div>
              <div className="space-y-2 col-span-1">
                <Label htmlFor="gender">Gender</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select defaultValue="India">
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {stateOptions.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Enter city" />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email<span className="text-red-500">*</span></Label>
                <Input id="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Contact Number<span className="text-red-500">*</span></Label>
                <Input id="phone" type="tel" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input id="linkedin" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input id="github" />
              </div>
            </div>
          </div>

          {/* Employer Info - moved to end */}
          <div className="space-y-4 mt-8">
            <h3 className="text-lg font-medium">Job Seeker's Employer Info</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employerName">Employer Name</Label>
                <Input id="employerName" placeholder="Employer Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recruiterName">Recruiter Name</Label>
                <Input id="recruiterName" placeholder="Recruiter Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recruiterEmail">Recruiter E-mail</Label>
                <Input id="recruiterEmail" placeholder="Recruiter E-mail" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recruiterContact">Recruiter Contact Number</Label>
                <Input id="recruiterContact" placeholder="Recruiter Contact Number" />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Professional Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title<span className="text-red-500">*</span></Label>
                <Input id="jobTitle" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Expected Salary</Label>
                <Input id="salary" type="number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="noticePeriod">Notice Period</Label>
                <Input id="noticePeriod" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input id="experience" type="number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="relocate">Willing to Relocate</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Technical Skills<span className="text-red-500">*</span></h3>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  placeholder="Add a skill"
                />
                <Button onClick={addSkill}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              {/* Validation message for required skills */}
              {skills.length === 0 && (
                <div className="text-red-500 text-xs mt-1">Please add at least one technical skill.</div>
              )}
            </div>
          </div>

          {/* ID Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">ID Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="aadhaar">Aadhaar Number</Label>
                <Input id="aadhaar" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pan">PAN Number</Label>
                <Input id="pan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="uan">UAN Number</Label>
                <Input id="uan" />
              </div>
            </div>
          </div>

          {/* Client Details/Experiences */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">Client Details / Experiences
              <Button type="button" size="icon" variant="ghost" onClick={addExperience} className="ml-2"><Plus className="h-4 w-4" /></Button>
            </h3>
            {experiences.map((exp, idx) => (
              <div key={idx} className="grid grid-cols-6 gap-4 items-end border p-3 rounded-md relative">
                <div className="col-span-2 space-y-2">
                  <Label>Client Name</Label>
                  <Input value={exp.client} onChange={e => updateExperience(idx, 'client', e.target.value)} placeholder="Client Name" />
                </div>
                <div className="space-y-2">
                  <Label>Start Month</Label>
                  <Select value={exp.startMonth} onValueChange={val => updateExperience(idx, 'startMonth', val)}>
                    <SelectTrigger><SelectValue placeholder="Month" /></SelectTrigger>
                    <SelectContent>
                      {months.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Start Year</Label>
                  <Select value={exp.startYear} onValueChange={val => updateExperience(idx, 'startYear', val)}>
                    <SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger>
                    <SelectContent>
                      {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>End Month</Label>
                  <Select value={exp.endMonth} onValueChange={val => updateExperience(idx, 'endMonth', val)} disabled={exp.present}>
                    <SelectTrigger><SelectValue placeholder="Month" /></SelectTrigger>
                    <SelectContent>
                      {months.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>End Year</Label>
                  <Select value={exp.endYear} onValueChange={val => updateExperience(idx, 'endYear', val)} disabled={exp.present}>
                    <SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger>
                    <SelectContent>
                      {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={exp.present} onChange={e => updateExperience(idx, 'present', e.target.checked)} id={`present-${idx}`} />
                  <Label htmlFor={`present-${idx}`}>Present</Label>
                </div>
                <Button type="button" size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => removeExperience(idx)}><X className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>

          {/* Education Entries */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">Education / Certificates
              <Button type="button" size="icon" variant="ghost" onClick={addEducation} className="ml-2"><Plus className="h-4 w-4" /></Button>
            </h3>
            {education.map((edu, idx) => (
              <div key={idx} className="grid grid-cols-6 gap-4 items-end border p-3 rounded-md relative">
                <div className="col-span-4 space-y-2">
                  <Label>Degree / Course</Label>
                  <Input value={edu.degree} onChange={e => updateEducation(idx, 'degree', e.target.value)} placeholder="Degree or Course" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Year</Label>
                  <Select value={edu.year} onValueChange={val => updateEducation(idx, 'year', val)}>
                    <SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger>
                    <SelectContent>
                      {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="button" size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => removeEducation(idx)}><X className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>

          {/* Reference Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">Reference Details
              <Button type="button" size="icon" variant="ghost" onClick={addReference} className="ml-2"><Plus className="h-4 w-4" /></Button>
            </h3>
            {references.map((ref, idx) => (
              <div key={idx} className="grid grid-cols-4 gap-4 items-end border p-3 rounded-md relative">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={ref.name} onChange={e => updateReference(idx, 'name', e.target.value)} placeholder="Name" />
                </div>
                <div className="space-y-2">
                  <Label>Designation</Label>
                  <Input value={ref.designation} onChange={e => updateReference(idx, 'designation', e.target.value)} placeholder="Designation" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={ref.email} onChange={e => updateReference(idx, 'email', e.target.value)} placeholder="Email" />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input value={ref.phone} onChange={e => updateReference(idx, 'phone', e.target.value)} placeholder="Phone Number" />
                </div>
                <Button type="button" size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => removeReference(idx)}><X className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>

          {/* Other Documents */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">Other Documents
              <Button type="button" size="icon" variant="ghost" onClick={addOtherDoc} className="ml-2"><Plus className="h-4 w-4" /></Button>
            </h3>
            {otherDocs.map((doc, idx) => (
              <div key={idx} className="grid grid-cols-4 gap-4 items-end border p-3 rounded-md relative">
                <div className="space-y-2">
                  <Label>Document Type</Label>
                  <Select value={doc.type} onValueChange={val => updateOtherDoc(idx, 'type', val)}>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Skill Matrix">Skill Matrix</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {doc.type === 'Others' && (
                  <div className="space-y-2">
                    <Label>Document Name</Label>
                    <Input value={doc.name} onChange={e => updateOtherDoc(idx, 'name', e.target.value)} placeholder="Document Name" />
                  </div>
                )}
                <div className="space-y-2 col-span-2">
                  <Label>Upload File</Label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <Button type="button" variant="outline" size="sm" asChild>
                      <span>+ Select File</span>
                    </Button>
                    <input
                      type="file"
                      className="hidden"
                      onChange={e => updateOtherDoc(idx, 'file', e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                    />
                    {doc.file && <span className="text-xs text-gray-600 ml-2">{doc.file.name}</span>}
                  </label>
                </div>
                <Button type="button" size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => removeOtherDoc(idx)}><X className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            Save Resume
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 