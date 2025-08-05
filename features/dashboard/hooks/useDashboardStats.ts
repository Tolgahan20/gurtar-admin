import { useQuery } from "@tanstack/react-query";
import { DashboardStats, DashboardFilters } from "../types";
import { getDashboardStats, exportDashboardStats } from "../api";
import { toast } from "sonner";
import { MESSAGES } from "@/constants/messages";

export const useDashboardStats = (filters?: DashboardFilters) => {
  const { data, isLoading, error } = useQuery<DashboardStats>({
    queryKey: ["dashboard-stats", filters],
    queryFn: () => getDashboardStats(filters),
    staleTime: 30000, // 30 seconds
  });

  const handleExport = async (format: "csv" | "json" | "excel") => {
    try {
      const blob = await exportDashboardStats(format, filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `dashboard-stats.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.debug(error);
      toast.error(MESSAGES.COMMON.UNKNOWN_ERROR);
    }
  };

  return {
    stats: data,
    isLoading,
    error,
    exportStats: handleExport,
  };
}; 