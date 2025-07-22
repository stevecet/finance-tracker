import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import {
  Assignment,
  CheckCircle,
  Schedule,
  PendingActions,
} from "@mui/icons-material";
import ProjectSummary from "../components/ProjectSummary";
import TaskPieChart from "../components/TaskPieChart";

const taskData = {
  total: 156,
  completed: 89,
  inProgress: 34,
  todo: 33,
};

export default function ProfessionalDashboard() {
  return (
    <Container maxWidth="xl" className="py-8">
      {/* Header */}
      <div className="flex justify-between items-center pb-7">
        <div className="text-2xl font-bold">Project dashboard</div>
        <Chip
          label="Ongoing"
          className="bg-green-100 text-green-800"
          sx={{
            backgroundColor: "#dcfce7",
            color: "#166534",
            fontWeight: 500,
          }}
        />
      </div>

      <Grid container spacing={4}>
        {/* Summary Cards */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ProjectSummary
                color="#8b5cf6"
                count={taskData.total}
                label="Total Tasks"
                filter="all"
                icon={<Assignment className="text-white" />}
                percentage={100}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <ProjectSummary
                color="#10b981"
                count={taskData.completed}
                label="Completed"
                filter="complete"
                icon={<CheckCircle className="text-white" />}
                percentage={(
                  (taskData.completed / taskData.total) *
                  100
                ).toFixed(0)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <ProjectSummary
                color="#3b82f6"
                count={taskData.inProgress}
                label="In Progress"
                filter="inprogress"
                icon={<Schedule className="text-white" />}
                percentage={(
                  (taskData.inProgress / taskData.total) *
                  100
                ).toFixed(0)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <ProjectSummary
                color="#f59e0b"
                count={taskData.todo}
                filter="todo"
                label="To Do"
                icon={<PendingActions className="text-white" />}
                percentage={((taskData.todo / taskData.total) * 100).toFixed(0)}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Pie Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TaskPieChart data={taskData} />
        </Grid>
      </Grid>
      {/* Quick Stats */}
      <Card
        className="mt-6 shadow-lg dark:bg-gray-800 bg-transparent"
        sx={{
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
        }}
      >
        <CardContent className="p-6 text-gray-900 dark:text-white">
          <Typography
            variant="h6"
            className="font-bold text-gray-900 dark:text-white mb-4"
          >
            Performance Metrics
          </Typography>

          <div className="space-y-4 my-4">
            <div className="flex justify-between items-center">
              <Typography
                variant="body2"
                className="text-gray-600 dark:text-gray-300"
              >
                Completion Rate
              </Typography>
              <Typography
                variant="body2"
                className="font-bold text-green-600 dark:text-green-400"
              >
                {((taskData.completed / taskData.total) * 100).toFixed(1)}%
              </Typography>
            </div>

            <div className="flex justify-between items-center">
              <Typography
                variant="body2"
                className="text-gray-600 dark:text-gray-300"
              >
                Active Tasks
              </Typography>
              <Typography
                variant="body2"
                className="font-bold text-blue-600 dark:text-blue-400"
              >
                {taskData.inProgress + taskData.todo}
              </Typography>
            </div>

            <div className="flex justify-between items-center">
              <Typography
                variant="body2"
                className="text-gray-600 dark:text-gray-300"
              >
                Team Productivity
              </Typography>
              <Typography
                variant="body2"
                className="font-bold text-purple-600 dark:text-purple-400"
              >
                High
              </Typography>
            </div>

            <div className="flex justify-between items-center">
              <Typography
                variant="body2"
                className="text-gray-600 dark:text-gray-300"
              >
                Average Time
              </Typography>
              <Typography
                variant="body2"
                className="font-bold text-orange-600 dark:text-orange-400"
              >
                2.3 days
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
