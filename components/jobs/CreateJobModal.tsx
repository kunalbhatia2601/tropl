import { useState } from "react";
import { ArrowLeft, Clipboard, Upload, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface CreateJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateJobModal({ open, onOpenChange }: CreateJobModalProps) {
  const [step, setStep] = useState(1);
  const [creationMethod, setCreationMethod] = useState<"paste" | "upload" | "manual" | null>(null);

  const steps = [
    { number: 1, title: "Job Description" },
    { number: 2, title: "Job Details" },
    { number: 3, title: "Share" },
  ];

  const renderStep1 = () => (
    <div className="space-y-6">
      {!creationMethod ? (
        <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 cursor-pointer hover:bg-gray-50" onClick={() => setCreationMethod("paste")}>
            <div className="flex flex-col items-center text-center space-y-2">
              <Clipboard className="w-8 h-8 text-blue-600" />
              <h3 className="font-medium">Paste Job Description</h3>
              <p className="text-sm text-gray-500">Copy and paste job description from any source</p>
            </div>
          </Card>
          <Card className="p-4 cursor-pointer hover:bg-gray-50" onClick={() => setCreationMethod("upload")}>
            <div className="flex flex-col items-center text-center space-y-2">
              <Upload className="w-8 h-8 text-blue-600" />
              <h3 className="font-medium">Upload Description Document</h3>
              <p className="text-sm text-gray-500">Upload a document containing job description</p>
            </div>
          </Card>
          <Card className="p-4 cursor-pointer hover:bg-gray-50" onClick={() => {
            setCreationMethod("manual");
            setStep(2);
          }}>
            <div className="flex flex-col items-center text-center space-y-2">
              <Edit className="w-8 h-8 text-blue-600" />
              <h3 className="font-medium">Skip & Fill Manually</h3>
              <p className="text-sm text-gray-500">Enter job details manually</p>
            </div>
          </Card>
        </div>
        <div className="flex justify-end">
          <Button 
            onClick={() => setStep(2)} 
            disabled={!creationMethod || creationMethod === "manual"}
          >
            Continue
          </Button>
        </div>
        </>
      ) : (
        <>
          {creationMethod === "paste" && (
            <div className="space-y-4">
              <Textarea
                placeholder="Paste job description here..."
                className="min-h-[200px]"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setCreationMethod(null)}>Back</Button>
                <Button onClick={() => setStep(2)}>Continue</Button>
              </div>
            </div>
          )}

          {creationMethod === "upload" && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Input
                  type="file"
                  className="hidden"
                  id="jobDescription"
                />
                <Label
                  htmlFor="jobDescription"
                  className="cursor-pointer text-blue-600 hover:text-blue-700"
                >
                  Click to upload or drag and drop
                </Label>
                <p className="text-sm text-gray-500 mt-2">
                  PDF, DOC, DOCX up to 10MB
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setCreationMethod(null)}>Back</Button>
                <Button onClick={() => setStep(2)}>Continue</Button>
              </div>
            </div>
          )}

          {creationMethod === "manual" && (
            <div className="flex justify-end">
              <Button onClick={() => setStep(2)}>Continue</Button>
            </div>
          )}
        </>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Job Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="jobCode">Job Code</Label>
            <Input id="jobCode" placeholder="Auto-generated" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientJobId">Client Job ID</Label>
            <Input id="clientJobId" placeholder="Enter client job ID" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title*</Label>
          <Input id="jobTitle" placeholder="Enter job title" />
        </div>
        <div className="space-y-2">
          <Label>Customer Type*</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select customer type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="direct">Direct</SelectItem>
              <SelectItem value="vendor">Vendor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Employment Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select employment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full Time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="part-time">Part Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Job Type</Label>
          <RadioGroup defaultValue="remote" className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="remote" id="remote" />
              <Label htmlFor="remote">Remote</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="onsite" id="onsite" />
              <Label htmlFor="onsite">On Site</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hybrid" id="hybrid" />
              <Label htmlFor="hybrid">Hybrid</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Client & Vendor Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Client*</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="client1">Client 1</SelectItem>
                <SelectItem value="client2">Client 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>End Client</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select end client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="endclient1">End Client 1</SelectItem>
                <SelectItem value="endclient2">End Client 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Organization Manager</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select manager" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manager1">Manager 1</SelectItem>
                <SelectItem value="manager2">Manager 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Recruiter</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select recruiter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recruiter1">Recruiter 1</SelectItem>
                <SelectItem value="recruiter2">Recruiter 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Pay Rate Details</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Bill Rate (INR)</Label>
            <Input type="number" placeholder="Enter bill rate" />
          </div>
          <div className="space-y-2">
            <Label>Vendor Pay Rate (C2C)</Label>
            <Input type="number" placeholder="Enter vendor pay rate" />
          </div>
          <div className="space-y-2">
            <Label>Candidate Pay Rate</Label>
            <Input type="number" placeholder="Enter candidate pay rate" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Bill Rate Frequency</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Vendor Pay Frequency</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Candidate Pay Frequency</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Location</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>City*</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>State*</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maharashtra">Maharashtra</SelectItem>
                <SelectItem value="karnataka">Karnataka</SelectItem>
                <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Country*</Label>
            <Select defaultValue="india">
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="usa">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Skills</h3>
        <div className="space-y-2">
          <Label>Primary Skills*</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select primary skills" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="node">Node.js</SelectItem>
              <SelectItem value="python">Python</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Skills</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select skills" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="java">Java</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="link" className="p-0">
          Upload Job Description
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Job Description</h3>
        <Textarea
          placeholder="Enter detailed job description..."
          className="min-h-[200px]"
        />
      </div>

      <div className="flex justify-end">
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => {
            setStep(1);
            setCreationMethod(null);
          }}>Back</Button>
          <Button onClick={() => setStep(3)}>Continue</Button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Share Job</h3>
        <div className="space-y-2">
          <Label>Share with Vendors</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select vendors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vendor1">Vendor 1</SelectItem>
              <SelectItem value="vendor2">Vendor 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Share with Recruiters</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select recruiters" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recruiter1">Recruiter 1</SelectItem>
              <SelectItem value="recruiter2">Recruiter 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
          <Button 
            onClick={() => {
              // Handle form submission
              onOpenChange(false);
            }}
            className="bg-green-600 hover:bg-green-700"
          >
            Create New Job
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-4">
            {step > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setStep(step - 1)}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <DialogTitle>New Job</DialogTitle>
          </div>
          <div className="flex justify-between mt-4">
            {steps.map((s) => (
              <div
                key={s.number}
                className={`flex items-center ${
                  s.number !== steps.length ? "flex-1" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= s.number
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {s.number}
                </div>
                <div
                  className={`ml-2 text-sm ${
                    step >= s.number ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {s.title}
                </div>
                {s.number !== steps.length && (
                  <div className="flex-1 h-0.5 bg-gray-200 ml-2" />
                )}
              </div>
            ))}
          </div>
        </DialogHeader>

        <div className="mt-6">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </DialogContent>
    </Dialog>
  );
} 