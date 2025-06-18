import { useState, useEffect } from "react";
import { Eye, Pencil, Trash2, Loader2 } from "lucide-react";
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
import { useAuth } from "@/context/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Client {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone?: string;
  status: string;
  industry?: string;
  website?: string;
  address?: string;
  companySize?: string;
  notes?: string;
  createdAt: string;
  _count?: {
    jobs: number;
  };
}

interface ClientsTableProps {
  refreshTrigger?: number;
}

export function ClientsTable({ refreshTrigger }: ClientsTableProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  const fetchClients = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('/api/clients', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setClients(data.data || []);
      } else {
        setError(data.error || 'Failed to fetch clients');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (token) {
      fetchClients();
    }
  }, [token, refreshTrigger]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading clients...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-600">No clients found. Add your first client to get started.</p>
      </div>
    );
  }

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
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>{client.contactPerson}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone || 'N/A'}</TableCell>
              <TableCell>
                <Badge
                  variant={client.status === "ACTIVE" ? "default" : "secondary"}
                >
                  {client.status}
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