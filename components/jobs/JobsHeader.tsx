import { Card, CardContent } from "@/components/ui/card";

export function JobsHeader() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800">Manage Jobs & Candidates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Open Jobs</p>
                <p className="text-2xl font-semibold text-gray-800">6</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-xl font-semibold">6</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Candidates</p>
                <p className="text-2xl font-semibold text-gray-800">4</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-xl font-semibold">4</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 