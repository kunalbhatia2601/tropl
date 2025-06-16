import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";

const funnelData = [
  {
    value: 100,
    name: "Applications",
    fill: "#9A3412",
  },
  {
    value: 80,
    name: "Screened",
    fill: "#C2410C",
  },
  {
    value: 60,
    name: "Interviews",
    fill: "#EA580C",
  },
  {
    value: 40,
    name: "Offers",
    fill: "#F97316",
  },
  {
    value: 20,
    name: "Hired",
    fill: "#FB923C",
  },
];

const recruiterData = [
  {
    name: "John D.",
    submissions: 45,
    interviews: 12,
    hires: 4,
  },
  {
    name: "Sarah M.",
    submissions: 38,
    interviews: 15,
    hires: 6,
  },
  {
    name: "Mike R.",
    submissions: 52,
    interviews: 18,
    hires: 7,
  },
  {
    name: "Lisa K.",
    submissions: 41,
    interviews: 14,
    hires: 5,
  },
];

export function Charts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-800">Recruitment Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    color: "#374151",
                  }}
                />
                <Funnel
                  dataKey="value"
                  data={funnelData}
                  isAnimationActive
                  labelLine={false}
                >
                  <LabelList
                    position="right"
                    fill="#374151"
                    stroke="none"
                    dataKey="name"
                  />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-800">Recruiter Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recruiterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  stroke="#374151"
                  tick={{ fill: "#374151" }}
                />
                <YAxis stroke="#374151" tick={{ fill: "#374151" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    color: "#374151",
                  }}
                />
                <Legend />
                <Bar dataKey="submissions" fill="#9A3412" name="Submissions" />
                <Bar dataKey="interviews" fill="#C2410C" name="Interviews" />
                <Bar dataKey="hires" fill="#EA580C" name="Hires" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 