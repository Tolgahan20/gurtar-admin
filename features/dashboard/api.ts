import { DashboardStats, DashboardFilters } from "./types";
import axios from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";

export const getDashboardStats = async (
  filters?: DashboardFilters
): Promise<DashboardStats> => {
  const { data } = await axios.get<DashboardStats>(ENDPOINTS.DASHBOARD.STATS, {
    params: filters,
  });
  return data;
};

export const exportDashboardStats = async (
  format: "csv" | "json" | "excel",
  filters?: DashboardFilters
): Promise<Blob> => {
  const { data } = await axios.get(ENDPOINTS.DASHBOARD.EXPORT_STATS, {
    params: { ...filters, format },
    responseType: "blob",
  });
  return data;
}; 