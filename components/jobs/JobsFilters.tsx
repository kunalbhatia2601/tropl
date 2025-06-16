import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function JobsFilters() {
  return (
    <div className="flex flex-col md:flex-row gap-4 flex-1">
      <div className="flex-1">
        <Input placeholder="Search Title/Client ID/Job Code" />
      </div>
      <Select defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="open">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="open">OPEN</SelectItem>
          <SelectItem value="closed">CLOSED</SelectItem>
          <SelectItem value="on-hold">ON HOLD</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select VMS" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="vms1">VMS 1</SelectItem>
          <SelectItem value="vms2">VMS 2</SelectItem>
          <SelectItem value="vms3">VMS 3</SelectItem>
        </SelectContent>
      </Select>
      <Button className="flex items-center mr-4">
        <Search className="w-4 h-4 mr-2" />
        Search
      </Button>
    </div>
  );
} 