"use client";

import { DashboardContent } from "@/features/dashboard/components/DashboardContent";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import { Loading } from "@/components/ui/loading";
import { EmptyState } from "@/components/ui/empty-state";

export default function DashboardPage() {
  const { stats, isLoading, error, exportStats } = useDashboardStats();

  if (isLoading) {
    return <Loading />;
  }

  if (error || !stats) {
    return (
      <EmptyState
        title="Error loading dashboard"
        description="There was an error loading the dashboard statistics. Please try again later."
      />
    );
  }

  return <DashboardContent stats={stats} onExport={exportStats} />;
}
