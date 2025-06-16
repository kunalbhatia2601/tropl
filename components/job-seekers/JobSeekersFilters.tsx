import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Sparkles } from "lucide-react";

export function JobSeekersFilters() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Name/Email Search */}
        <div className="relative">
          <Input
            placeholder="Search name/email"
            className="pl-9 pr-8"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-7 w-7 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Job Title Search */}
        <div className="relative">
          <Input
            placeholder="Job title"
            className="pl-9 pr-8"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-7 w-7 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Skills Search */}
        <div className="relative">
          <Input
            placeholder="Skills"
            className="pl-9 pr-8"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-7 w-7 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Location Search */}
        <div className="relative">
          <Input
            placeholder="Location"
            className="pl-9 pr-16"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-8 top-1 h-7 w-7 text-gray-400 hover:text-gray-600"
            aria-label="Search by location"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-7 w-7 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
} 