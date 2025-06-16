
'use client';

import { useState } from 'react';
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { MetricCards } from "@/components/dashboard/MetricCards";
import { RecruitmentFunnel } from "@/components/dashboard/RecruitmentFunnel";
import { HiresPerMonth } from "@/components/dashboard/HiresPerMonth";
import { RejectionSummary } from "@/components/dashboard/RejectionSummary";
import { RecruiterSummary } from "@/components/dashboard/RecruiterSummary";
import { UpcomingInterviews } from "@/components/dashboard/UpcomingInterviews";
import { DashboardProvider } from "@/context/DashboardContext";

export default function RecruiterDashboard() {
  return (
    <DashboardProvider>
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 p-8 bg-white">
            <div className="space-y-8">
              <MetricCards />
              
              {/* Three-column section */}
              <div className="grid grid-cols-3 gap-4">
                <RecruitmentFunnel />
                <HiresPerMonth />
                <RejectionSummary />
              </div>

              {/* Recruiter Summary */}
              <RecruiterSummary />

              {/* Upcoming Interviews */}
              <UpcomingInterviews />
            </div>
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}