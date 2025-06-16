import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RejectionSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Rejection Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center text-gray-500">
          Coming Soon
        </div>
      </CardContent>
    </Card>
  );
} 