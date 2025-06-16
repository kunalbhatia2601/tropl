import { Eye, Pencil, Trash2 } from "lucide-react";
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

const vendors = [
  {
    id: 1,
    name: "Tech Solutions Inc",
    contactPerson: "John Doe",
    email: "john@techsolutions.com",
    phone: "+1 234-567-8900",
    status: "Active",
  },
  {
    id: 2,
    name: "Global Services Ltd",
    contactPerson: "Jane Smith",
    email: "jane@globalservices.com",
    phone: "+1 234-567-8901",
    status: "Inactive",
  },
  // Add more sample data as needed
];

export function VendorsTable() {
  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell className="font-medium">{vendor.name}</TableCell>
              <TableCell>{vendor.contactPerson}</TableCell>
              <TableCell>{vendor.email}</TableCell>
              <TableCell>{vendor.phone}</TableCell>
              <TableCell>
                <Badge
                  variant={vendor.status === "Active" ? "default" : "secondary"}
                >
                  {vendor.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 