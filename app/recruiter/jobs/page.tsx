'use client';

import { Sidebar } from "@/components/dashboard/Sidebar";
import { JobsTable } from "@/components/jobs/JobsTable";
import { JobsFilters } from "@/components/jobs/JobsFilters";
import { JobsHeader } from "@/components/jobs/JobsHeader";
import { JobsActions } from "@/components/jobs/JobsActions";

export default function JobsPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            <JobsHeader />
            <div className="flex justify-between items-center">
              <JobsFilters />
              <JobsActions />
            </div>
            <JobsTable />
          </div>
        </main>
      </div>
    </div>
  );
} 