import { createContext, useContext, useState, ReactNode } from "react";
import { DateRange } from "react-day-picker";

interface DashboardContextType {
  selectedRecruiter: string;
  setSelectedRecruiter: (recruiter: string) => void;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [selectedRecruiter, setSelectedRecruiter] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <DashboardContext.Provider
      value={{
        selectedRecruiter,
        setSelectedRecruiter,
        dateRange,
        setDateRange,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
} 