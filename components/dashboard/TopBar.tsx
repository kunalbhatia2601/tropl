import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useDashboard } from "@/context/DashboardContext";

const recruiters = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Mike Johnson" },
];

export function TopBar() {
  const { selectedRecruiter, setSelectedRecruiter, dateRange, setDateRange } = useDashboard();

  return (
    <div className="h-16 border-b px-4 flex items-center justify-between bg-white">
      {/* Left: Heading */}
      <h1 className="text-xl font-bold text-gray-900">Recruitment Analysis</h1>
      {/* Right: Controls */}
      <div className="flex items-center gap-4">
        <Select value={selectedRecruiter} onValueChange={setSelectedRecruiter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Recruiter" />
          </SelectTrigger>
          <SelectContent>
            {recruiters.map((recruiter) => (
              <SelectItem key={recruiter.id} value={recruiter.id}>
                {recruiter.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}