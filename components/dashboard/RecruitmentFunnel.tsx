import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React, { useState } from "react";

const data = [
    { name: "SOURCED", value: 1, fill: "#4ECDC4" },             // teal
    { name: "PRE SCREENING", value: 2, fill: "#FFB703" },        // amber
    { name: "LEVEL 1 INTERVIEW", value: 0, fill: "#4361EE" },    // blue
    { name: "LEVEL 2 INTERVIEW", value: 0, fill: "#3A0CA3" },    // indigo
    { name: "FINAL INTERVIEW", value: 0, fill: "#7209B7" },      // purple
    { name: "SUBMITTED", value: 0, fill: "#8338EC" },            // violet
    { name: "JOB OFFERED", value: 0, fill: "#9D4EDD" },          // lavender
    { name: "REJECTED", value: 0, fill: "#F94144" },             // red
    { name: "OFFER REJECTED", value: 0, fill: "#F3722C" },       // orange
    { name: "HIRED", value: 0, fill: "#06D6A0" },                // green
  ];

export function RecruitmentFunnel() {
  const maxValue = Math.max(...data.map((item) => item.value));
  const totalStages = data.length;
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  const [openStage, setOpenStage] = useState<string | null>(null);

  // Find the currently open stage's data
  const currentStage = data.find((item) => item.name === openStage);
  const rowCount = currentStage ? currentStage.value : 0;
  const dummyRows = Array.from({ length: rowCount }, (_, i) => ({
    candidate: `Candidate ${i + 1}`,
    client: `Client ${i + 1}`,
    job: `Job ${i + 1}`,
    submittedBy: `Recruiter ${i + 1}`,
    date: `2024-06-1${i + 1}`
  }));

  return (
    <TooltipProvider>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-700">Recruitment Funnel</CardTitle>
        </CardHeader>
        <CardContent className="py-8">
          <div className="relative flex flex-col items-center space-y-2">
            {[...data].map((item, index) => {
              const baseWidth = 90;
              const widthReduction = (index / totalStages) * 30;
              const width = Math.max(baseWidth - widthReduction, 30);
              const percentage = totalValue > 0 ? ((item.value / totalValue) * 100).toFixed(1) : "0.0";

              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <div className="relative w-full flex justify-center transition-all duration-500 ease-in-out hover:scale-[1.02]">
                      <div
                        className={`relative h-8 flex items-center justify-between px-4 text-white font-medium text-sm shadow-md transition-all duration-300 ${
                          item.value === 0 ? 'opacity-40 grayscale' : ''
                        } cursor-pointer`}
                        style={{
                          backgroundColor: item.fill,
                          width: `${width}%`,
                          clipPath:
                            'polygon(10px 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0 50%)',
                        }}
                        onClick={() => setOpenStage(item.name)}
                      >
                        <span className="uppercase tracking-wide text-xs">{item.name}</span>
                        <span className="text-white font-bold text-sm">{item.value}</span>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>
                      {item.name}: {item.value} candidates ({percentage}%)
                    </p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <Dialog open={!!openStage} onOpenChange={() => setOpenStage(null)}>
        <DialogContent className="max-w-[900px] w-full">
          <DialogHeader>
            <DialogTitle>{openStage}</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <table className="w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-gray-500 text-sm">
                  <th className="text-left px-4 pb-2">Candidate</th>
                  <th className="text-left px-4 pb-2">Client</th>
                  <th className="text-left px-4 pb-2">Job</th>
                  <th className="text-left px-4 pb-2">Submitted By</th>
                  <th className="text-left px-4 pb-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {dummyRows.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">No Data Available</td>
                  </tr>
                ) : (
                  dummyRows.map((row, idx) => (
                    <tr key={idx} className="bg-white text-gray-700 text-base">
                      <td className="px-4 py-2 font-medium">{row.candidate}</td>
                      <td className="px-4 py-2">{row.client}</td>
                      <td className="px-4 py-2">{row.job}</td>
                      <td className="px-4 py-2">{row.submittedBy}</td>
                      <td className="px-4 py-2">{row.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
