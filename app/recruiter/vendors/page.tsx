'use client';

import { Sidebar } from "@/components/dashboard/Sidebar";
import { VendorsTable } from "@/components/vendors/VendorsTable";
import { VendorsFilters } from "@/components/vendors/VendorsFilters";
import { VendorsActions } from "@/components/vendors/VendorsActions";
import { useState } from "react";

export default function VendorsPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleVendorAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-800">Vendors</h1>
              <VendorsActions onVendorAdded={handleVendorAdded} />
            </div>

            <VendorsFilters />
            <VendorsTable refreshTrigger={refreshTrigger} />
          </div>
        </main>
      </div>
    </div>
  );
}