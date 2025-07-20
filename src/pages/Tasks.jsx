import { useState } from "react";
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
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { Add, CalendarToday, People, Comment } from "@mui/icons-material";
import { tasks } from "../data/tasks";
import TaskFilters from "../components/tasks/TaskFilters";
import { buttons } from "../data/buttons";
import Createtask from "../components/tasks/Createtask";

export default function TaskList() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

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
          <div className="text-2xl font-bold">My Tasks</div>
          <IconButton
            className="text-white hover:bg-white/20"
            onClick={() => setCreateDialogOpen(true)}
          >
            <Add />
          </IconButton>
        </div>
        <TaskFilters
          buttons={buttons}
          counts={counts}
          activeFilter={activeFilter}
          onChange={setActiveFilter}
        />
      </div>

      {/* Task Cards */}
      <div className="rounded-lg px-4 py-3 space-y-3">
        {filteredTasks.map((task) => (
          <Card
            key={task.id}
            className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
            sx={{
              backgroundColor: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(8px)",
              borderRadius: 3,
              border: "none",
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
                      0.1
                    ),
                    color: getPriorityColorHex(task.priority),
                    border: "none",
                    borderRadius: 4,
                  }}
                />
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <CalendarToday sx={{ fontSize: 12 }} />
                  <Typography variant="caption">{task.date}</Typography>
                </div>
              </div>

              {/* Task Title */}
              <Typography variant="h6" className="font-semibold text-gray-900">
                {task.title}
              </Typography>

              {/* Progress Bar */}
              <div className="my-2">
                <LinearProgress
                  variant="determinate"
                  color="primary"
                  value={(task.progress / task.total) * 100}
                  className="h-2 rounded-full"
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#65CCCD",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 4,
                      backgroundColor: "#3C74D9",
                    },
                  }}
                />
                <div className="flex justify-between items-center my-3">
                  <Typography variant="body2" className="text-gray-600">
                    Progress
                  </Typography>
                  <Typography
                    variant="body2"
                    className="font-medium text-gray-900"
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
                          bgcolor: "violet",
                          width: 32,
                          height: 32,
                        }}
                      >
                        U{index + 1}
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  <People className="text-gray-400" sx={{ fontSize: 16 }} />
                </div>

                {/* Comments Count */}
                <div className="flex items-center gap-1">
                  <Comment className="text-gray-400" sx={{ fontSize: 16 }} />
                  <Typography variant="body1" className="text-gray-500">
                    {task.comments}
                  </Typography>
                </div>
              </div>
              {/* Category Tag */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <Chip
                  label={task.category}
                  variant="filled"
                  size="small"
                  className="bg-pink-50 text-blue-700"
                  sx={{
                    backgroundColor: "#E8EEF7",
                    color: "#3C74D9",
                    fontSize: "0.75rem",
                    "&:hover": {
                      backgroundColor: "#fce7f3",
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
          <Typography variant="body1" className="text-gray-400 mb-2">
            No tasks found
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            Try adjusting your filters
          </Typography>
        </Box>
      )}
      <Createtask createDialogOpen={createDialogOpen} setCreateDialogOpen={setCreateDialogOpen}/>
    </div>
  );
}
