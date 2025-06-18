import { Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddVendorModal } from "@/components/vendors/AddVendorModal";
import { ImportVendorModal } from "@/components/vendors/ImportVendorModal";

interface VendorsActionsProps {
  onVendorAdded?: () => void;
}

export function VendorsActions({ onVendorAdded }: VendorsActionsProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  return (
    <div className="flex space-x-4">
      <Button
        variant="outline"
        className="bg-green-600 text-white hover:bg-green-700"
        onClick={() => setShowImportModal(true)}
      >
        <Upload className="w-4 h-4 mr-2" />
        Import Vendor
      </Button>
      <Button
        variant="outline"
        className="bg-green-600 text-white hover:bg-green-700"
        onClick={() => setShowAddModal(true)}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Vendor
      </Button>

      <AddVendorModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal} 
        onVendorAdded={onVendorAdded}
      />
      <ImportVendorModal 
        open={showImportModal} 
        onOpenChange={setShowImportModal} 
      />
    </div>
  );
}