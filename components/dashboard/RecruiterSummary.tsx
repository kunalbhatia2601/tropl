'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/context/DashboardContext";

const options = [
  "Pre Screening",
  "Level 1 Interview",
  "Level 2 Interview",
  "Final Interview",
  "Submitted",
  "Job Offered",
  "Rejected",
  "Offer Rejected",
  "Hired",
];

const optionColors: Record<string, string> = {
  "Pre Screening": "#17a2b8",
  "Level 1 Interview": "#ffd59e",
  "Level 2 Interview": "#a86f1a",
  "Final Interview": "#b39ddb",
  "Submitted": "#26c6da",
  "Job Offered": "#bdbdbd",
  "Rejected": "#e57373",
  "Offer Rejected": "#ffb74d",
  "Hired": "#102542",
};

const recruiters = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Mike Johnson" },
  { id: "4", name: "Rohit C" },
];

const recruiterStageData: Record<string, Record<string, number>> = {
  "1": {
    "Pre Screening": 2,
    "Level 1 Interview": 1,
    "Level 2 Interview": 0,
    "Final Interview": 0,
    "Submitted": 1,
    "Job Offered": 0,
    "Rejected": 0,
    "Offer Rejected": 0,
    "Hired": 0,
  },
  "2": {
    "Pre Screening": 1,
    "Level 1 Interview": 0,
    "Level 2 Interview": 1,
    "Final Interview": 0,
    "Submitted": 1,
    "Job Offered": 0,
    "Rejected": 0,
    "Offer Rejected": 0,
    "Hired": 1,
  },
  "3": {
    "Pre Screening": 0,
    "Level 1 Interview": 0,
    "Level 2 Interview": 0,
    "Final Interview": 0,
    "Submitted": 0,
    "Job Offered": 0,
    "Rejected": 0,
    "Offer Rejected": 0,
    "Hired": 0,
  },
  "4": {
    "Pre Screening": 3,
    "Level 1 Interview": 1,
    "Level 2 Interview": 2,
    "Final Interview": 0,
    "Submitted": 3,
    "Job Offered": 0,
    "Rejected": 0,
    "Offer Rejected": 0,
    "Hired": 1,
  },
};

export function RecruiterSummary() {
  const [selected, setSelected] = useState<string[]>(["Submitted", "Hired"]);
  const { selectedRecruiter } = useDashboard();

  // Find recruiter name
  const recruiter = recruiters.find((r) => r.id === selectedRecruiter) || recruiters[0];
  const stageData = recruiterStageData[recruiter.id] || {};

  const chartData = [
    {
      name: recruiter.name,
      ...Object.fromEntries(selected.map((stage) => [stage, stageData[stage] || 0]))
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recruiter Summary</CardTitle>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[260px] justify-start text-left"
            >
              {selected.length === 0
                ? "Select stages"
                : `${selected.length} selected`}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[260px]">
            <div className="flex flex-col gap-2 max-h-[200px] overflow-auto">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <Checkbox
                    checked={selected.includes(option)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelected((prev) => [...prev, option]);
                      } else {
                        setSelected((prev) =>
                          prev.filter((v) => v !== option)
                        );
                      }
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </CardHeader>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-4 px-6 pb-2">
          {selected.map((option) => (
            <div key={option} className="flex items-center gap-2">
              <span
                className="inline-block w-6 h-4 rounded-sm"
                style={{ backgroundColor: optionColors[option] || "#ccc" }}
              ></span>
              <span className="text-gray-700 text-sm">{option}</span>
            </div>
          ))}
        </div>
      )}

      <CardContent>
        {selected.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center text-gray-400 text-lg">
            Please select at least one stage to view chart data.
          </div>
        ) : (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barCategoryGap={10}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#374151" tick={{ fill: "#374151" }} />
                <YAxis stroke="#374151" tick={{ fill: "#374151" }} allowDecimals={false} />
                <Tooltip />
                <Legend />
                {selected.map((stage) => (
                  <Bar
                    key={stage}
                    dataKey={stage}
                    fill={optionColors[stage] || "#ccc"}
                    name={stage}
                    barSize={24}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
