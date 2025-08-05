import { DashboardStats } from "../types";
import { StatCard } from "./StatCard";
import { BarChart } from "./charts/BarChart";
import { PieChart } from "./charts/PieChart";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { businessesApi } from "@/features/businesses/api";

interface DashboardContentProps {
  stats: DashboardStats;
  onExport: (format: "csv" | "json" | "excel") => void;
}

export const DashboardContent = ({ stats, onExport }: DashboardContentProps) => {
  // Fetch businesses to get names
  const { data: businessesData } = useQuery({
    queryKey: ["businesses"],
    queryFn: () => businessesApi.getBusinesses({ limit: 100 }),
  });

  const businesses = businessesData?.data || [];
  const businessNameMap = businesses.reduce((acc, business) => {
    acc[business.id] = business.name;
    return acc;
  }, {} as Record<string, string>);

  // Transform data for charts
  const categoryOrdersData = stats.categories.popularByOrders.map((category) => ({
    name: category.name,
    value: category.orderCount,
    percentage: (category.orderCount / stats.orders.total) * 100
  }));

  const categoryBusinessData = stats.categories.popularByBusinesses.map((category) => ({
    name: category.name,
    value: category.businessCount,
    percentage: (category.businessCount / stats.businesses.total) * 100
  }));

  const businessCo2Data = Object.entries(stats.businessCo2Saved)
    .map(([id, value]) => ({
      name: businessNameMap[id] || id.slice(0, 8),
      value: Number(value.toFixed(2)),
    }))
    .sort((a, b) => b.value - a.value);

  const businessMoneyData = Object.entries(stats.businessMoneySaved)
    .map(([id, value]) => ({
      name: businessNameMap[id] || id.slice(0, 8),
      value: Number(value.toFixed(2)),
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="space-y-8 p-6">
      {/* Export buttons */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => onExport("csv")}>
          Export CSV
        </Button>
        <Button variant="outline" onClick={() => onExport("excel")}>
          Export Excel
        </Button>
        <Button variant="outline" onClick={() => onExport("json")}>
          Export JSON
        </Button>
      </div>

      {/* Overview Section */}
      <section className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Platform Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Users"
            value={stats.users.total}
            trend={stats.users.growthRate}
            description={`${stats.users.active} active users`}
          />
          <StatCard
            title="Total Businesses"
            value={stats.businesses.total}
            trend={stats.businesses.growthRate}
            description={`${stats.businesses.verified} verified`}
          />
          <StatCard
            title="Total Orders"
            value={stats.orders.total}
            trend={stats.orders.growthRate}
            description={`Avg. value $${stats.orders.avgOrderValue}`}
          />
          <StatCard
            title="Contact Messages"
            value={stats.contact.total}
            description={`${stats.contact.pending} pending`}
          />
        </div>
      </section>

      {/* Environmental Impact Section */}
      <section className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Environmental Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title="Total CO2 Saved"
            value={`${stats.orders.totalCo2Saved.toFixed(2)} kg`}
            description={`${stats.orders.avgCo2SavedPerOrder.toFixed(2)} kg per order`}
          />
          <StatCard
            title="Total Money Saved"
            value={`$${stats.orders.totalMoneySaved.toFixed(2)}`}
            description="Through sustainable choices"
          />
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Top CO2 Savers</h3>
            <div className="h-[250px]">
              <BarChart
                data={businessCo2Data}
                xKey="name"
                yKey="value"
                title="CO2 Saved by Business (kg)"
                height={220}
              />
            </div>
          </Card>
        </div>
      </section>

      {/* Business Insights */}
      <section className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Business Insights</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Business Performance</h3>
            <div className="space-y-4">
              <StatCard
                title="Avg Orders per Business"
                value={stats.businesses.avgOrdersPerBusiness.toFixed(1)}
              />
              <StatCard
                title="Avg Revenue per Business"
                value={`$${stats.businesses.avgRevenuePerBusiness.toFixed(2)}`}
              />
            </div>
          </Card>
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Top Revenue Generators</h3>
            <div className="h-[250px]">
              <BarChart
                data={businessMoneyData}
                xKey="name"
                yKey="value"
                title="Revenue by Business ($)"
                height={220}
              />
            </div>
          </Card>
        </div>
      </section>

      {/* Category Analysis */}
      <section className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Category Analysis</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Popular Categories by Orders</h3>
            <div className="h-[300px] flex items-center justify-center">
              <PieChart 
                data={categoryOrdersData} 
                title="Orders Distribution"
                height={280}
              />
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Categories by Business Count</h3>
            <div className="h-[300px] flex items-center justify-center">
              <PieChart 
                data={categoryBusinessData} 
                title="Business Distribution"
                height={280}
              />
            </div>
          </Card>
        </div>
      </section>

      {/* User Engagement */}
      <section className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">User Engagement</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Avg Orders per User"
            value={stats.users.avgOrdersPerUser.toFixed(1)}
          />
          <StatCard
            title="Avg Spending per User"
            value={`$${stats.users.avgSpendingPerUser.toFixed(2)}`}
          />
          <StatCard
            title="User Retention Rate"
            value={`${stats.users.retentionRate}%`}
          />
          <StatCard
            title="User Growth Rate"
            value={`${stats.users.growthRate}%`}
          />
        </div>
      </section>
    </div>
  );
};
