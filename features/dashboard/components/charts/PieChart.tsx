import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface PieChartProps {
  data: Array<{ name: string; value: number; percentage?: number }>;
  title: string;
  height?: number;
}

const COLORS = [
  "#2563eb", // Blue
  "#16a34a", // Green
  "#ea580c", // Orange
  "#7c3aed", // Purple
  "#dc2626", // Red
];

export const PieChart = ({ data, height = 300 }: PieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              strokeWidth={1}
            />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number, name: string) => {
            const item = data.find(d => d.name === name);
            return [`${value} (${item?.percentage?.toFixed(1)}%)`, name];
          }}
        />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          formatter={(value: string) => (
            <span className="text-sm">
              {value}
            </span>
          )}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}; 