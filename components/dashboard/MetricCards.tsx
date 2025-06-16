import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, CheckCircle, XCircle, DollarSign, Calculator, Percent, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const metrics = [
  {
    title: "Active Jobs",
    value: "0",
    icon: Briefcase,
    color: "text-blue-600",
    href: "/recruiter/jobs"
  },
  {
    title: "Screened",
    value: "0",
    icon: Users,
    color: "text-purple-600"
  },
  {
    title: "Hired",
    value: "0",
    icon: CheckCircle,
    color: "text-green-600"
  },
  {
    title: "Rejected",
    value: "0",
    icon: XCircle,
    color: "text-red-600"
  },
  {
    title: "Expense",
    value: "0",
    icon: DollarSign,
    color: "text-yellow-600"
  },
  {
    title: "Cost/Hire",
    value: "0",
    icon: Calculator,
    color: "text-orange-600"
  },
  {
    title: "Acceptance Rate",
    value: "0%",
    icon: Percent,
    color: "text-indigo-600"
  }
];

const screenedData: { candidate: string; screenedBy: string; date: string }[] = [];
const hiredData: { candidate: string; client: string; job: string; submittedBy: string; date: string }[] = [];
const rejectedData: { candidate: string; client: string; job: string; submittedBy: string; date: string }[] = [];

function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[900px] max-w-full relative">
        <button className="absolute top-4 right-6 text-2xl text-gray-400 hover:text-gray-600" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
}

export function MetricCards() {
  const router = useRouter();
  const [showScreenedModal, setShowScreenedModal] = useState(false);
  const [showHiredModal, setShowHiredModal] = useState(false);
  const [showRejectedModal, setShowRejectedModal] = useState(false);

  const handleCardClick = (metric: any) => {
    if (metric.title === "Screened") {
      setShowScreenedModal(true);
    } else if (metric.title === "Hired") {
      setShowHiredModal(true);
    } else if (metric.title === "Rejected") {
      setShowRejectedModal(true);
    } else if (metric.href) {
      router.push(metric.href);
    }
  };

  return (
    <>
      <div className="grid grid-cols-7 gap-2">
        {metrics.map((metric) => (
          <Card
            key={metric.title}
            className={`bg-white border-gray-200 ${(metric.href || metric.title === "Screened" || metric.title === "Hired" || metric.title === "Rejected") ? "cursor-pointer hover:bg-gray-50" : ""}`}
            onClick={() => handleCardClick(metric)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
                <CardTitle className="text-xs font-medium text-gray-600">
                  {metric.title}
                </CardTitle>
              </div>
              <div className={`text-lg font-semibold ${metric.color} mt-1`}>
                {metric.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Modal open={showScreenedModal} onClose={() => setShowScreenedModal(false)}>
        <div className="mb-4 text-2xl font-semibold text-gray-800">Candidate Screened</div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-500 text-sm">
                <th className="text-left px-4 pb-2">Candidate</th>
                <th className="text-left px-4 pb-2">Screened By</th>
                <th className="text-left px-4 pb-2">Date</th>
                <th className="text-left px-4 pb-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {screenedData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">No Data Available</td>
                </tr>
              ) : (
                screenedData.map((row, idx) => (
                  <tr key={idx} className="bg-white text-gray-700 text-base">
                    <td className="px-4 py-2 font-medium">{row.candidate}</td>
                    <td className="px-4 py-2">{row.screenedBy}</td>
                    <td className="px-4 py-2">{row.date}</td>
                    <td className="px-4 py-2 text-blue-600 cursor-pointer"><Eye className="inline h-5 w-5" /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Modal>
      <Modal open={showHiredModal} onClose={() => setShowHiredModal(false)}>
        <div className="mb-4 text-2xl font-semibold text-gray-800">Candidate Placed</div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2">
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
              {hiredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">No Data Available</td>
                </tr>
              ) : (
                hiredData.map((row, idx) => (
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
      </Modal>
      <Modal open={showRejectedModal} onClose={() => setShowRejectedModal(false)}>
        <div className="mb-4 text-2xl font-semibold text-gray-800">Candidate Rejected</div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2">
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
              {rejectedData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">No Data Available</td>
                </tr>
              ) : (
                rejectedData.map((row, idx) => (
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
      </Modal>
    </>
  );
} 