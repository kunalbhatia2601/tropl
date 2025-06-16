import { useState } from "react";
import { X } from "lucide-react";
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

interface AddClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddClientModal({ open, onOpenChange }: AddClientModalProps) {
  const [step, setStep] = useState(1);

  const steps = [
    { number: 1, title: "Client Information" },
    { number: 2, title: "Contact Details" },
    { number: 3, title: "Document Upload" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>

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
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name*</Label>
                  <Input id="clientName" placeholder="Enter client name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gstin">GSTIN</Label>
                  <Input id="gstin" placeholder="Enter GSTIN" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address1">Address 1</Label>
                <Input id="address1" placeholder="Enter address line 1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address2">Address 2</Label>
                <Input id="address2" placeholder="Enter address line 2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
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
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Enter city" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input id="pincode" placeholder="Enter pincode" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input id="contactPerson" placeholder="Enter contact person name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Enter phone number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alternatePhone">Alternate Phone</Label>
                  <Input id="alternatePhone" placeholder="Enter alternate phone" />
                </div>
              </div>
            </div>
          )}

{step === 3 && (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="documents">Upload Documents</Label>

      <div className="relative">
        <Input
          id="documents"
          type="file"
          multiple
          className="hidden"
        />
        <label
          htmlFor="documents"
          className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-100 transition"
        >
          <div className="text-gray-500">
            Drag and drop files here or <span className="text-blue-600 underline">click to upload</span>
          </div>
        </label>
      </div>
    </div>
  </div>
)}

        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button
            variant="outline"
            onClick={() => {
              if (step > 1) {
                setStep(step - 1);
              } else {
                onOpenChange(false);
              }
            }}
          >
            {step === 1 ? "Cancel" : "Previous"}
          </Button>
          <Button
            onClick={() => {
              if (step < steps.length) {
                setStep(step + 1);
              } else {
                // Handle form submission
                onOpenChange(false);
              }
            }}
          >
            {step === steps.length ? "Save" : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 