import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  { month: "Jan 2024", hires: 12, daysToHire: 25 },
  { month: "Feb 2024", hires: 15, daysToHire: 22 },
  { month: "Mar 2024", hires: 18, daysToHire: 20 },
  { month: "Apr 2024", hires: 14, daysToHire: 23 },
  { month: "May 2024", hires: 16, daysToHire: 21 },
];

export function HiresPerMonth() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Hires Per Month</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead>Hires</TableHead>
              <TableHead>Days to Hire</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.month}>
                <TableCell>{row.month}</TableCell>
                <TableCell>{row.hires}</TableCell>
                <TableCell>{row.daysToHire}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 