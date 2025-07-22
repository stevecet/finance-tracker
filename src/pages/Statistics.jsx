import React from "react";
import { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  AvatarGroup,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  LinearProgress,
  Box,
  useTheme,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  Schedule,
  Assignment,
  CheckCircle,
  PendingActions,
  CalendarToday,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample project data
const projectData = {
  id: 1,
  name: "Ofspace Mobile App",
  description: "Complete mobile application redesign and development",
  startDate: "2024-01-15",
  endDate: "2024-06-30",
  status: "In Progress",
  progress: 68,
  totalTasks: 156,
  completedTasks: 89,
  inProgressTasks: 34,
  todoTasks: 33,
  teamMembers: [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Designer",
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Developer",
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "PM",
    },
    {
      id: 4,
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Developer",
    },
  ],
};

// Chart data
const progressData = [
  { date: "Jan 15", completed: 0, inProgress: 5, todo: 151 },
  { date: "Feb 1", completed: 12, inProgress: 18, todo: 126 },
  { date: "Feb 15", completed: 28, inProgress: 25, todo: 103 },
  { date: "Mar 1", completed: 45, inProgress: 30, todo: 81 },
  { date: "Mar 15", completed: 62, inProgress: 28, todo: 66 },
  { date: "Apr 1", completed: 75, inProgress: 32, todo: 49 },
  { date: "Apr 15", completed: 89, inProgress: 34, todo: 33 },
];

const velocityData = [
  { week: "Week 1", tasksCompleted: 8, planned: 10 },
  { week: "Week 2", tasksCompleted: 12, planned: 12 },
  { week: "Week 3", tasksCompleted: 15, planned: 14 },
  { week: "Week 4", tasksCompleted: 10, planned: 13 },
  { week: "Week 5", tasksCompleted: 18, planned: 15 },
  { week: "Week 6", tasksCompleted: 14, planned: 16 },
  { week: "Week 7", tasksCompleted: 12, planned: 11 },
];

const taskDistribution = [
  { name: "Design", value: 45, color: "#8b5cf6" },
  { name: "Development", value: 78, color: "#3b82f6" },
  { name: "Testing", value: 23, color: "#10b981" },
  { name: "Documentation", value: 10, color: "#f59e0b" },
];

const teamPerformance = [
  { name: "Sarah Johnson", completed: 28, inProgress: 5, efficiency: 92 },
  { name: "Mike Chen", completed: 32, inProgress: 8, efficiency: 88 },
  { name: "Emma Davis", completed: 15, inProgress: 12, efficiency: 85 },
  { name: "John Smith", completed: 14, inProgress: 9, efficiency: 78 },
];

const burndownData = [
  { day: "Day 1", ideal: 156, actual: 156 },
  { day: "Day 15", ideal: 140, actual: 144 },
  { day: "Day 30", ideal: 124, actual: 128 },
  { day: "Day 45", ideal: 108, actual: 111 },
  { day: "Day 60", ideal: 92, actual: 89 },
  { day: "Day 75", ideal: 76, actual: 81 },
  { day: "Day 90", ideal: 60, actual: 67 },
];

const COLORS = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b"];

export default function ProjectStatistics({ darkMode }) {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState("last30days");

  const StatCard = ({ title, value, change, icon, color, subtitle }) => {
    const colorMap = {
      purple: theme.palette.secondary.main,
      green: theme.palette.success.main,
      blue: theme.palette.primary.main,
      orange: theme.palette.warning.main,
    };

    return (
      <Card
        sx={{
          borderRadius: "16px",
          boxShadow: theme.shadows[2],
          color: theme.palette.text.primary,
        }}
        className="dark:bg-gray-800 bg-transparent"
      >
        <CardContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box
              sx={{
                p: 1.5,
                borderRadius: "12px",
                backgroundColor: darkMode
                  ? alpha(colorMap[color], 0.15)
                  : alpha(colorMap[color], 0.1),
              }}
            >
              {React.cloneElement(icon, {
                sx: {
                  fontSize: 24,
                  color: colorMap[color],
                },
              })}
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="h4" fontWeight="bold" color="text.primary">
                {value}
              </Typography>
              {change && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  {change > 0 ? (
                    <TrendingUp
                      sx={{ fontSize: 16, color: theme.palette.success.main }}
                    />
                  ) : (
                    <TrendingDown
                      sx={{ fontSize: 16, color: theme.palette.error.main }}
                    />
                  )}
                  <Typography
                    variant="caption"
                    sx={{
                      color:
                        change > 0
                          ? theme.palette.success.main
                          : theme.palette.error.main,
                    }}
                  >
                    {Math.abs(change)}%
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
          <Typography
            variant="body2"
            fontWeight="medium"
            color="text.secondary"
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.disabled">
              {subtitle}
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            p: 2,
            borderRadius: "12px",
            boxShadow: theme.shadows[3],
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            color: theme.palette.text.primary,
          }}
        >
          <Typography variant="body2" fontWeight="bold">
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography key={index} variant="body2" sx={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  // Chart color adjustments for dark mode
  const chartGridColor = theme.palette.divider;
  const chartTextColor = theme.palette.text.secondary;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: { xs: 2, md: 0 },
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold" color="text.primary">
                {projectData.name} - Statistics
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Detailed analytics and performance metrics
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel sx={{ color: theme.palette.text.secondary }}>
                Time Range
              </InputLabel>
              <Select
                value={timeRange}
                label="Time Range"
                onChange={(e) => setTimeRange(e.target.value)}
                sx={{
                  borderRadius: "12px",
                  color: theme.palette.text.primary,
                }}
                className="dark:bg-gray-800 bg-transparent"
              >
                <MenuItem value="last7days">Last 7 days</MenuItem>
                <MenuItem value="last30days">Last 30 days</MenuItem>
                <MenuItem value="last90days">Last 90 days</MenuItem>
                <MenuItem value="all">All time</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Project Overview */}
        <Card
          sx={{
            borderRadius: "16px",
            boxShadow: theme.shadows[2],
            mb: 4,
          }}
          className="dark:bg-gray-800 bg-transparent"
        >
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                gap: 3,
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="text.primary"
                  mb={1}
                >
                  Project Overview
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {projectData.description}
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <CalendarToday
                    sx={{ fontSize: 16, color: theme.palette.text.secondary }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {projectData.startDate} - {projectData.endDate}
                  </Typography>
                </Box>
                <Chip
                  label={projectData.status}
                  sx={{
                    backgroundColor: darkMode
                      ? alpha(theme.palette.info.main, 0.15)
                      : alpha(theme.palette.info.light, 0.3),
                    color: theme.palette.info.main,
                  }}
                />
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Overall Progress
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="text.primary"
                  mb={1}
                >
                  {projectData.progress}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={projectData.progress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: theme.palette.grey[700],
                    mb: 2,
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 4,
                    },
                  }}
                />
                <Typography variant="caption" color="text.disabled">
                  {projectData.completedTasks} of {projectData.totalTasks} tasks
                  completed
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Team Members
                </Typography>
                <AvatarGroup max={4} sx={{ mb: 1 }}>
                  {projectData.teamMembers.map((member) => (
                    <Avatar
                      key={member.id}
                      src={member.avatar}
                      alt={member.name}
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: theme.palette.grey[700],
                      }}
                    />
                  ))}
                </AvatarGroup>
                <Typography variant="caption" color="text.disabled">
                  {projectData.teamMembers.length} active members
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
            mb: 4,
          }}
        >
          <StatCard
            title="Total Tasks"
            value={projectData.totalTasks}
            change={8}
            icon={<Assignment />}
            color="purple"
            subtitle="All project tasks"
          />
          <StatCard
            title="Completed"
            value={projectData.completedTasks}
            change={12}
            icon={<CheckCircle />}
            color="green"
            subtitle={`${(
              (projectData.completedTasks / projectData.totalTasks) *
              100
            ).toFixed(1)}% completion rate`}
          />
          <StatCard
            title="In Progress"
            value={projectData.inProgressTasks}
            change={-5}
            icon={<Schedule />}
            color="blue"
            subtitle="Currently active"
          />
          <StatCard
            title="To Do"
            value={projectData.todoTasks}
            change={-15}
            icon={<PendingActions />}
            color="orange"
            subtitle="Remaining tasks"
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
            gap: 4,
            mb: 4,
          }}
        >
          {/* Progress Over Time */}
          <Card
            className="dark:bg-gray-800 bg-transparent"
            sx={{
              borderRadius: "16px",
              boxShadow: theme.shadows[2],
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="text.primary"
                mb={2}
              >
                Progress Over Time
              </Typography>
              <Box sx={{ height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={progressData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={chartGridColor}
                    />
                    <XAxis dataKey="date" stroke={chartTextColor} />
                    <YAxis stroke={chartTextColor} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: chartTextColor }} />
                    <Area
                      type="monotone"
                      dataKey="completed"
                      stackId="1"
                      stroke={theme.palette.success.main}
                      fill={alpha(theme.palette.success.main, 0.3)}
                      name="Completed"
                    />
                    <Area
                      type="monotone"
                      dataKey="inProgress"
                      stackId="1"
                      stroke={theme.palette.info.main}
                      fill={alpha(theme.palette.info.main, 0.3)}
                      name="In Progress"
                    />
                    <Area
                      type="monotone"
                      dataKey="todo"
                      stackId="1"
                      stroke={theme.palette.warning.main}
                      fill={alpha(theme.palette.warning.main, 0.3)}
                      name="To Do"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          {/* Task Distribution */}
          <Card
            className="dark:bg-gray-800 bg-transparent"
            sx={{
              borderRadius: "16px",
              boxShadow: theme.shadows[2],
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="text.primary"
                mb={2}
              >
                Task Distribution by Category
              </Typography>
              <Box sx={{ height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {taskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: chartTextColor }} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
            gap: 4,
            mb: 4,
          }}
        >
          {/* Team Velocity */}
          <Card
            sx={{
              borderRadius: "16px",
              boxShadow: theme.shadows[2],
            }}
            className="dark:bg-gray-800 bg-transparent"
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="text.primary"
                mb={2}
              >
                Team Velocity
              </Typography>
              <Box sx={{ height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={velocityData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={chartGridColor}
                    />
                    <XAxis dataKey="week" stroke={chartTextColor} />
                    <YAxis stroke={chartTextColor} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: chartTextColor }} />
                    <Bar
                      dataKey="planned"
                      fill={theme.palette.grey[500]}
                      name="Planned"
                    />
                    <Bar
                      dataKey="tasksCompleted"
                      fill={theme.palette.primary.main}
                      name="Completed"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          {/* Burndown Chart */}
          <Card
            sx={{
              borderRadius: "16px",
              boxShadow: theme.shadows[2],
            }}
            className="dark:bg-gray-800 bg-transparent"
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="text.primary"
                mb={2}
              >
                Burndown Chart
              </Typography>
              <Box sx={{ height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={burndownData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={chartGridColor}
                    />
                    <XAxis dataKey="day" stroke={chartTextColor} />
                    <YAxis stroke={chartTextColor} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: chartTextColor }} />
                    <Line
                      type="monotone"
                      dataKey="ideal"
                      stroke={theme.palette.grey[500]}
                      strokeDasharray="5 5"
                      name="Ideal"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke={theme.palette.primary.main}
                      name="Actual"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Team Performance */}
        <Card
          sx={{
            borderRadius: "16px",
            boxShadow: theme.shadows[2],
          }}
          className="dark:bg-gray-800 bg-transparent"
        >
          <CardContent sx={{ p: 3 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="text.primary"
              mb={3}
            >
              Team Performance
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  lg: "repeat(4, 1fr)",
                },
                gap: 3,
              }}
            >
              {teamPerformance.map((member, index) => (
                <Box key={index} sx={{ textAlign: "center" }}>
                  <Avatar
                    src={projectData.teamMembers[index]?.avatar}
                    alt={member.name}
                    sx={{
                      width: 64,
                      height: 64,
                      mx: "auto",
                      mb: 1.5,
                      backgroundColor: theme.palette.grey[700],
                    }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="text.primary"
                    mb={0.5}
                  >
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {projectData.teamMembers[index]?.role}
                  </Typography>
                  <Box sx={{ display: "grid", gap: 1 }}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="caption" color="text.disabled">
                        Completed
                      </Typography>
                      <Typography variant="caption" fontWeight="medium">
                        {member.completed}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="caption" color="text.disabled">
                        In Progress
                      </Typography>
                      <Typography variant="caption" fontWeight="medium">
                        {member.inProgress}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="caption" color="text.disabled">
                        Efficiency
                      </Typography>
                      <Typography
                        variant="caption"
                        fontWeight="medium"
                        color="success.main"
                      >
                        {member.efficiency}%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

// Helper function for alpha blending
function alpha(color, opacity) {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
