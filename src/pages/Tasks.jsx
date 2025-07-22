import { useEffect, useState } from "react";
import {
  alpha,
  Card,
  CardContent,
  Avatar,
  AvatarGroup,
  Chip,
  LinearProgress,
  Box,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import { Add, CalendarToday, People, Comment } from "@mui/icons-material";
import { tasks } from "../data/tasks";
import TaskFilters from "../components/tasks/TaskFilters";
import { buttons } from "../data/buttons";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearch } from "../components/SearchContext";
import CreateTask from "../components/tasks/Createtask";

export default function TaskList() {
  const location = useLocation();
  const { searchTerm } = useSearch();
  const [activeFilter, setActiveFilter] = useState("all");
  const theme = useTheme();
  const darkMode = theme.palette.mode === "dark";
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.filter) {
      setActiveFilter(location.state.filter);
    }
  }, [location.state]);

  const getFilteredTasks = () => {
    switch (activeFilter) {
      case "complete":
        return tasks.filter((task) => task.status === "complete");
      case "todo":
        return tasks.filter((task) => task.status === "todo");
      case "inprogress":
        return tasks.filter((task) => task.status === "inprogress");
      default:
        return tasks;
    }
  };

  const getTaskCounts = () => {
    return {
      all: tasks.length,
      complete: tasks.filter((task) => task.status === "complete").length,
      todo: tasks.filter((task) => task.status === "todo").length,
      inprogress: tasks.filter((task) => task.status === "inprogress").length,
    };
  };

  const counts = getTaskCounts();
  const filteredTasks = getFilteredTasks();
  const filteredTask = filteredTasks.filter((task) => {
    const term = searchTerm.toLowerCase();
    return (
      task.title.toLowerCase().includes(term) ||
      task.status.toLowerCase().includes(term)
    );
  });

  const getPriorityColorHex = (priority) => {
    switch (priority) {
      case "High":
        return "#EF4444"; // red-500
      case "Medium":
        return "#F59E0B"; // amber-500
      case "Low":
        return "#3B82F6"; // blue-500
      default:
        return "#6B7280"; // gray-500
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-4 pb-6">
        <div className="flex justify-between items-center pb-7">
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            My Tasks
          </Typography>
          <IconButton
            onClick={() => setCreateDialogOpen(true)}
            sx={{
              color: darkMode
                ? theme.palette.primary.main
                : theme.palette.primary.contrastText,
              backgroundColor: darkMode
                ? alpha(theme.palette.primary.main, 0.1)
                : theme.palette.primary.main,
              "&:hover": {
                backgroundColor: darkMode
                  ? alpha(theme.palette.primary.main, 0.2)
                  : theme.palette.primary.dark,
              },
            }}
          >
            <Add />
          </IconButton>
        </div>
        <TaskFilters
          buttons={buttons}
          counts={counts}
          activeFilter={activeFilter}
          onChange={setActiveFilter}
          darkMode={darkMode}
        />
      </div>

      {/* Task Cards */}
      <div className="rounded-lg px-4 py-3 space-y-3">
        {filteredTask.map((task) => (
          <Card
            key={task.id}
            className="dark:bg-gray-800 bg-transparent"
            sx={{
              backdropFilter: "blur(8px)",
              borderRadius: 3,
              border: "none",
              boxShadow: theme.shadows[3],
              "&:hover": {
                boxShadow: theme.shadows[6],
              },
            }}
          >
            <CardContent className="p-4">
              {/* Priority Badge and Date */}
              <div className="flex justify-between items-start mb-3">
                <Chip
                  label={task.priority}
                  variant="outlined"
                  size="small"
                  sx={{
                    fontSize: 12,
                    backgroundColor: alpha(
                      getPriorityColorHex(task.priority),
                      darkMode ? 0.15 : 0.1
                    ),
                    color: getPriorityColorHex(task.priority),
                    border: "none",
                    borderRadius: 4,
                  }}
                />
                <div className="flex items-center gap-1 text-xs">
                  <CalendarToday
                    sx={{
                      fontSize: 12,
                      color: theme.palette.text.secondary,
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {task.date}
                  </Typography>
                </div>
              </div>

              {/* Task Title */}
              <Typography variant="h6" fontWeight="bold" color="text.primary" onClick={()=> navigate("/taskdetail")} className="cursor-pointer">
                {task.title}
              </Typography>

              {/* Progress Bar */}
              <div className="my-2">
                <LinearProgress
                  variant="determinate"
                  color="primary"
                  value={(task.progress / task.total) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: darkMode
                      ? alpha(theme.palette.primary.light, 0.2)
                      : "#65CCCD",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 4,
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                />
                <div className="flex justify-between items-center my-3">
                  <Typography variant="body2" color="text.secondary">
                    Progress
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="medium"
                    color="text.primary"
                  >
                    {task.progress}/{task.total}
                  </Typography>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex items-center justify-between">
                {/* Assignees */}
                <div className="flex items-center gap-2">
                  <AvatarGroup
                    max={3}
                    sx={{
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        fontSize: 12,
                      },
                    }}
                  >
                    {task.assignees.map((avatar, index) => (
                      <Avatar
                        key={index}
                        alt={`User ${index + 1}`}
                        sx={{
                          bgcolor: darkMode
                            ? theme.palette.secondary.dark
                            : theme.palette.secondary.light,
                          color: darkMode
                            ? theme.palette.secondary.contrastText
                            : theme.palette.secondary.dark,
                          width: 32,
                          height: 32,
                        }}
                      >
                        U{index + 1}
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  <People
                    sx={{
                      fontSize: 16,
                      color: theme.palette.text.secondary,
                    }}
                  />
                </div>

                {/* Comments Count */}
                <div className="flex items-center gap-1">
                  <Comment
                    sx={{
                      fontSize: 16,
                      color: theme.palette.text.secondary,
                    }}
                  />
                  <Typography variant="body1" color="text.secondary">
                    {task.comments}
                  </Typography>
                </div>
              </div>

              {/* Category Tag */}
              <div
                className="mt-3 pt-3 border-t"
                style={{ borderColor: theme.palette.divider }}
              >
                <Chip
                  label={task.category}
                  variant="filled"
                  size="small"
                  sx={{
                    backgroundColor: darkMode
                      ? alpha(theme.palette.primary.main, 0.15)
                      : alpha(theme.palette.primary.light, 0.3),
                    color: theme.palette.primary.main,
                    fontSize: "0.75rem",
                    "&:hover": {
                      backgroundColor: darkMode
                        ? alpha(theme.palette.primary.main, 0.25)
                        : alpha(theme.palette.primary.light, 0.4),
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <Box className="text-center py-12">
          <Typography variant="body1" color="text.secondary" mb={1}>
            No tasks found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filters
          </Typography>
        </Box>
      )}

      <CreateTask
        createDialogOpen={createDialogOpen}
        setCreateDialogOpen={setCreateDialogOpen}
        darkMode={darkMode}
      />
    </div>
  );
}
