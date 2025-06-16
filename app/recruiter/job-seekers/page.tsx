'use client';

import { Sidebar } from "@/components/dashboard/Sidebar";
import { JobSeekersTable } from "@/components/job-seekers/JobSeekersTable";
import { JobSeekersFilters } from "@/components/job-seekers/JobSeekersFilters";
import { JobSeekersActions } from "@/components/job-seekers/JobSeekersActions";

export default function JobSeekersPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-800">Job Seekers</h1>
            </div>

            <JobSeekersFilters />
            <JobSeekersActions />
            <JobSeekersTable />
          </div>
        </main>
      </div>
    </div>
  );
} 