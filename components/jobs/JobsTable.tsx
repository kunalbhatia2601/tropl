import { MoreVertical, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const jobs = [
  {
    id: 1,
    jobCode: "JOB-001",
    clientJobId: "CLI-001",
    title: "Senior React Developer",
    manager: "John Doe",
    client: "Tech Corp",
    vendor: "Vendor A",
    status: "OPEN",
    submitted: 5,
    placed: 2,
    externalApplications: 10,
    created: "2024-03-15",
    isFavorite: true,
  },
  {
    id: 2,
    jobCode: "JOB-002",
    clientJobId: "CLI-002",
    title: "Full Stack Developer",
    manager: "Jane Smith",
    client: "Global Tech",
    vendor: "Vendor B",
    status: "OPEN",
    submitted: 3,
    placed: 1,
    externalApplications: 8,
    created: "2024-03-14",
    isFavorite: false,
  },
];

export function JobsTable() {
  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Code</TableHead>
            <TableHead>Client Job ID</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Manager</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Placed</TableHead>
            <TableHead>External Application</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium">{job.jobCode}</TableCell>
              <TableCell>{job.clientJobId}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.manager}</TableCell>
              <TableCell>{job.client}</TableCell>
              <TableCell>{job.vendor}</TableCell>
              <TableCell>
                <Badge
                  variant={job.status === "OPEN" ? "default" : "secondary"}
                >
                  {job.status}
                </Badge>
              </TableCell>
              <TableCell>{job.submitted}</TableCell>
              <TableCell>{job.placed}</TableCell>
              <TableCell>{job.externalApplications}</TableCell>
              <TableCell>{new Date(job.created).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end items-center space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 