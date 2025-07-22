import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";

const COLORS = {
  completed: "#10b981", // Green
  todo: "#f59e0b", // Orange
  inprogress: "#3b82f6", // Blue
  total: "#8b5cf6", // Purple
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border dark:border-gray-700">
        <p className="font-medium text-gray-900 dark:text-gray-100">
          {data.name}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Count: <span className="font-bold">{data.value}</span>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Percentage:{" "}
          <span className="font-bold">{data.payload.percentage}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>
          <Typography
            variant="body2"
            className="text-gray-600 dark:text-gray-300 font-medium"
          >
            {entry.value}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default function TaskPieChart({ data }) {
  const chartData = [
    {
      name: "Completed",
      value: data.completed,
      percentage: ((data.completed / data.total) * 100).toFixed(1),
    },
    {
      name: "In Progress",
      value: data.inProgress,
      percentage: ((data.inProgress / data.total) * 100).toFixed(1),
    },
    {
      name: "To Do",
      value: data.todo,
      percentage: ((data.todo / data.total) * 100).toFixed(1),
    },
  ];

  return (
    <Card
      className="shadow-lg dark:bg-gray-800 bg-transparent"
      sx={{
      }}
    >
      <CardContent className="p-6 dark:text-white rounded-xl">
        <Typography
          variant="h6"
          className="font-bold text-gray-900 mb-4 text-center dark:text-gray-400"
          
        >
          Task Distribution
        </Typography>

        <Box className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.name.toLowerCase().replace(" ", "")]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* Summary Stats */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <Typography variant="h6" className="font-bold text-green-600">
                {((data.completed / data.total) * 100).toFixed(1)}%
              </Typography>
              <Typography
                variant="caption"
                className="text-gray-500 dark:text-gray-400"
              >
                Completed
              </Typography>
            </div>
            <div>
              <Typography variant="h6" className="font-bold text-blue-600">
                {((data.inProgress / data.total) * 100).toFixed(1)}%
              </Typography>
              <Typography
                variant="caption"
                className="text-gray-500 dark:text-gray-400"
              >
                In Progress
              </Typography>
            </div>
            <div>
              <Typography variant="h6" className="font-bold text-orange-600">
                {((data.todo / data.total) * 100).toFixed(1)}%
              </Typography>
              <Typography
                variant="caption"
                className="text-gray-500 dark:text-gray-400"
              >
                To Do
              </Typography>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
