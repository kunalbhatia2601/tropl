import { Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function VendorsFilters() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input placeholder="Search by name" />
        </div>
        <div className="flex-1">
          <Input placeholder="Search by phone" />
        </div>
        <div className="flex-1">
          <Input placeholder="Search by contact person" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button className="flex items-center">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
} 