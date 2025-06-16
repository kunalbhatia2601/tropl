import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { parseISO, isToday, isTomorrow, isThisWeek, isThisMonth } from 'date-fns';

const data = [
  {
    candidate: "John Smith",
    contactNo: "+1 234-567-8901",
    email: "john.smith@email.com",
    job: "Senior Developer",
    client: "Tech Corp",
    type: "Technical",
    submittedBy: "Sarah M.",
    date: "2024-03-15",
  },
  {
    candidate: "Emily Johnson",
    contactNo: "+1 234-567-8902",
    email: "emily.j@email.com",
    job: "Product Manager",
    client: "Innovate Inc",
    type: "HR",
    submittedBy: "Mike R.",
    date: "2024-03-16",
  },
  {
    candidate: "Michael Brown",
    contactNo: "+1 234-567-8903",
    email: "michael.b@email.com",
    job: "UX Designer",
    client: "Design Co",
    type: "Technical",
    submittedBy: "Lisa K.",
    date: "2024-03-17",
  },
];

const filterOptions = [
  { value: "today", label: "Today" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "this_week", label: "This Week" },
  { value: "next_week", label: "Next Week" },
  { value: "this_month", label: "This Month" },
  { value: "next_month", label: "Next Month" },
];

export function UpcomingInterviews() {
  const [filter, setFilter] = useState("this_week");

  // Helper functions for date filtering
  function isDateInFilter(dateStr: string, filter: string) {
    const date = parseISO(dateStr);
    const now = new Date();
    switch (filter) {
      case "today":
        return isToday(date);
      case "tomorrow":
        return isTomorrow(date);
      case "this_week":
        return isThisWeek(date, { weekStartsOn: 1 });
      case "next_week": {
        // Get start of next week
        const startOfNextWeek = new Date(now);
        startOfNextWeek.setDate(now.getDate() + (8 - (now.getDay() || 7)));
        startOfNextWeek.setHours(0, 0, 0, 0);
        const endOfNextWeek = new Date(startOfNextWeek);
        endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);
        endOfNextWeek.setHours(23, 59, 59, 999);
        return date >= startOfNextWeek && date <= endOfNextWeek;
      }
      case "this_month":
        return isThisMonth(date);
      case "next_month": {
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        return date.getFullYear() === nextMonth.getFullYear() && date.getMonth() === nextMonth.getMonth();
      }
      default:
        return true;
    }
  }

  const filteredData = data.filter(row => isDateInFilter(row.date, filter));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Upcoming Interviews</CardTitle>
        <div className="w-[160px]">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Contact No.</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Job</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-gray-400">No interviews found.</TableCell>
              </TableRow>
            ) : (
              filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.candidate}</TableCell>
                  <TableCell>{row.contactNo}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.job}</TableCell>
                  <TableCell>{row.client}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.submittedBy}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 