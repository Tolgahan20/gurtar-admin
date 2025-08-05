import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";

interface LineChartProps {
  data: Array<Record<string, string | number>>;
  xKey: string;
  yKey: string;
  title: string;
  height?: number;
}

export const LineChart = ({
  data,
  xKey,
  yKey,
  title,
  height = 300,
}: LineChartProps) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={yKey} stroke="#8884d8" />
        </RechartsLineChart>
      </ResponsiveContainer>
    </Card>
  );
}; 