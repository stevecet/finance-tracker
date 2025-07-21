import { useState } from "react";
import {
  alpha,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  LinearProgress,
  Divider,
  Alert,
  Snackbar,
  useTheme,
} from "@mui/material";
import {
  Edit,
  Save,
  Cancel,
  Add,
  Delete,
  CheckCircle,
  RadioButtonUnchecked,
  AttachFile,
  Schedule,
  CalendarToday,
  MoreVert,
  Close,
} from "@mui/icons-material";

// Sample task data
const initialTaskData = {
  id: 1,
  title: "Create a visual style guide",
  description:
    "Design and document a comprehensive visual style guide including colors, typography, components, and usage guidelines for the entire project.",
  status: "In Progress",
  priority: "High",
  dueDate: "2024-05-15",
  startDate: "2024-04-01",
  estimatedHours: 40,
  actualHours: 28,
  progress: 70,
  assignees: [
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
  ],
  tags: ["Design", "Documentation", "UI/UX"],
  attachments: [
    { id: 1, name: "style-guide-draft.pdf", size: "2.4 MB", type: "pdf" },
    { id: 2, name: "color-palette.png", size: "156 KB", type: "image" },
  ],
  subtasks: [
    {
      id: 1,
      title: "Define color palette",
      description: "Create primary, secondary, and accent color schemes",
      completed: true,
      assignee: {
        id: 1,
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=24&width=24",
      },
      dueDate: "2024-04-10",
    },
    {
      id: 2,
      title: "Typography system",
      description: "Define font families, sizes, and hierarchy",
      completed: true,
      assignee: {
        id: 1,
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=24&width=24",
      },
      dueDate: "2024-04-15",
    },
    {
      id: 3,
      title: "Component library",
      description: "Design reusable UI components",
      completed: false,
      assignee: {
        id: 2,
        name: "Mike Chen",
        avatar: "/placeholder.svg?height=24&width=24",
      },
      dueDate: "2024-05-01",
    },
    {
      id: 4,
      title: "Usage guidelines",
      description: "Document how to use the style guide",
      completed: false,
      assignee: {
        id: 1,
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=24&width=24",
      },
      dueDate: "2024-05-10",
    },
  ],
  comments: [
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      content:
        "I've completed the color palette and typography sections. Moving on to components next.",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      author: "Mike Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      content:
        "Great work! I'll start implementing the components once the designs are ready.",
      timestamp: "1 hour ago",
    },
  ],
};

export default function TaskDetail() {
  const theme = useTheme();
  const darkMode = theme.palette.mode === "dark";
  const [taskData, setTaskData] = useState(initialTaskData);
  const [isEditing, setIsEditing] = useState(false);
  const [showSubtaskDialog, setShowSubtaskDialog] = useState(false);
  const [editingSubtask, setEditingSubtask] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [newSubtask, setNewSubtask] = useState({
    title: "",
    description: "",
    assignee: null,
    dueDate: "",
  });

  const handleSaveTask = () => {
    setIsEditing(false);
    setSnackbar({
      open: true,
      message: "Task updated successfully!",
      severity: "success",
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset changes if needed
  };

  const handleSubtaskToggle = (subtaskId) => {
    setTaskData({
      ...taskData,
      subtasks: taskData.subtasks.map((subtask) =>
        subtask.id === subtaskId
          ? { ...subtask, completed: !subtask.completed }
          : subtask
      ),
    });
  };

  const handleAddSubtask = () => {
    const newId = Math.max(...taskData.subtasks.map((s) => s.id)) + 1;
    const subtask = {
      id: newId,
      ...newSubtask,
      completed: false,
    };
    setTaskData({
      ...taskData,
      subtasks: [...taskData.subtasks, subtask],
    });
    setNewSubtask({ title: "", description: "", assignee: null, dueDate: "" });
    setShowSubtaskDialog(false);
    setSnackbar({
      open: true,
      message: "Subtask added successfully!",
      severity: "success",
    });
  };

  const handleEditSubtask = (subtask) => {
    setEditingSubtask(subtask);
    setNewSubtask({
      title: subtask.title,
      description: subtask.description,
      assignee: subtask.assignee,
      dueDate: subtask.dueDate,
    });
    setShowSubtaskDialog(true);
  };

  const handleUpdateSubtask = () => {
    setTaskData({
      ...taskData,
      subtasks: taskData.subtasks.map((subtask) =>
        subtask.id === editingSubtask.id
          ? { ...subtask, ...newSubtask }
          : subtask
      ),
    });
    setEditingSubtask(null);
    setNewSubtask({ title: "", description: "", assignee: null, dueDate: "" });
    setShowSubtaskDialog(false);
    setSnackbar({
      open: true,
      message: "Subtask updated successfully!",
      severity: "success",
    });
  };

  const handleDeleteSubtask = (subtaskId) => {
    setTaskData({
      ...taskData,
      subtasks: taskData.subtasks.filter((subtask) => subtask.id !== subtaskId),
    });
    setSnackbar({
      open: true,
      message: "Subtask deleted successfully!",
      severity: "success",
    });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: taskData.comments.length + 1,
        author: "Current User",
        avatar: "/placeholder.svg?height=32&width=32",
        content: newComment,
        timestamp: "Just now",
      };
      setTaskData({
        ...taskData,
        comments: [comment, ...taskData.comments],
      });
      setNewComment("");
    }
  };

  const completedSubtasks = taskData.subtasks.filter((s) => s.completed).length;
  const totalSubtasks = taskData.subtasks.length;
  const subtaskProgress =
    totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  const getPriorityColor = (priority) => {
    if (darkMode) {
      switch (priority) {
        case "High":
          return {
            bg: alpha(theme.palette.error.main, 0.15),
            text: theme.palette.error.light,
            border: theme.palette.error.dark,
          };
        case "Medium":
          return {
            bg: alpha(theme.palette.warning.main, 0.15),
            text: theme.palette.warning.light,
            border: theme.palette.warning.dark,
          };
        case "Low":
          return {
            bg: alpha(theme.palette.success.main, 0.15),
            text: theme.palette.success.light,
            border: theme.palette.success.dark,
          };
        default:
          return {
            bg: theme.palette.background.paper,
            text: theme.palette.text.secondary,
            border: theme.palette.divider,
          };
      }
    } else {
      switch (priority) {
        case "High":
          return { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" };
        case "Medium":
          return { bg: "#fffbeb", text: "#d97706", border: "#fed7aa" };
        case "Low":
          return { bg: "#f0fdf4", text: "#16a34a", border: "#bbf7d0" };
        default:
          return { bg: "#f9fafb", text: "#6b7280", border: "#e5e7eb" };
      }
    }
  };

  const getStatusColor = (status) => {
    if (darkMode) {
      switch (status) {
        case "Completed":
          return {
            bg: alpha(theme.palette.success.main, 0.15),
            text: theme.palette.success.light,
          };
        case "In Progress":
          return {
            bg: alpha(theme.palette.info.main, 0.15),
            text: theme.palette.info.light,
          };
        case "To Do":
          return {
            bg: alpha(theme.palette.warning.main, 0.15),
            text: theme.palette.warning.light,
          };
        default:
          return {
            bg: theme.palette.background.paper,
            text: theme.palette.text.secondary,
          };
      }
    } else {
      switch (status) {
        case "Completed":
          return { bg: "#f0fdf4", text: "#16a34a" };
        case "In Progress":
          return { bg: "#eff6ff", text: "#2563eb" };
        case "To Do":
          return { bg: "#fffbeb", text: "#d97706" };
        default:
          return { bg: "#f9fafb", text: "#6b7280" };
      }
    }
  };

  // ... other functions remain the same ...

  return (
    <div
      className="min-h-screen"
    >
      <Container maxWidth="lg" className="py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div>
              <Typography variant="h4" fontWeight="bold" color="text.primary">
                Task Details
              </Typography>
              <Typography variant="body1" color="text.secondary">
                View and edit task information
              </Typography>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <Button
                startIcon={<Edit />}
                variant="contained"
                onClick={() => setIsEditing(true)}
              >
                Edit Task
              </Button>
            ) : (
              <>
                <Button
                  startIcon={<Save />}
                  variant="contained"
                  onClick={handleSaveTask}
                  color="primary"
                >
                  Save
                </Button>
                <Button startIcon={<Cancel />} onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Information */}
            <Card
              sx={{
                borderRadius: "16px",
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[2],
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    {isEditing ? (
                      <TextField
                        fullWidth
                        value={taskData.title}
                        onChange={(e) =>
                          setTaskData({ ...taskData, title: e.target.value })
                        }
                        variant="outlined"
                        className="mb-4"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                          },
                        }}
                      />
                    ) : (
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="text.primary"
                        mb={2}
                      >
                        {taskData.title}
                      </Typography>
                    )}

                    <div className="flex items-center gap-3 mb-4">
                      <Chip
                        label={taskData.status}
                        sx={{
                          backgroundColor: getStatusColor(taskData.status).bg,
                          color: getStatusColor(taskData.status).text,
                        }}
                      />
                      <Chip
                        label={taskData.priority}
                        sx={{
                          backgroundColor: getPriorityColor(taskData.priority)
                            .bg,
                          color: getPriorityColor(taskData.priority).text,
                          border: `1px solid ${
                            getPriorityColor(taskData.priority).border
                          }`,
                        }}
                      />
                      {taskData.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          variant="outlined"
                          size="small"
                          sx={{
                            color: theme.palette.text.secondary,
                            borderColor: theme.palette.divider,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <Typography
                    variant="h6"
                    fontWeight="semibold"
                    color="text.primary"
                    mb={2}
                  >
                    Description
                  </Typography>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      value={taskData.description}
                      onChange={(e) =>
                        setTaskData({
                          ...taskData,
                          description: e.target.value,
                        })
                      }
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                        },
                      }}
                    />
                  ) : (
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      className="leading-relaxed"
                    >
                      {taskData.description}
                    </Typography>
                  )}
                </div>

                {/* Task Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Due Date
                    </Typography>
                    {isEditing ? (
                      <TextField
                        type="date"
                        value={taskData.dueDate}
                        onChange={(e) =>
                          setTaskData({ ...taskData, dueDate: e.target.value })
                        }
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                        }}
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <CalendarToday
                          sx={{
                            fontSize: 16,
                            color: theme.palette.text.secondary,
                          }}
                        />
                        <Typography variant="body1" fontWeight="medium">
                          {new Date(taskData.dueDate).toLocaleDateString()}
                        </Typography>
                      </div>
                    )}
                  </div>

                  <div>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Progress
                    </Typography>
                    <div className="flex items-center gap-3">
                      <LinearProgress
                        variant="determinate"
                        value={taskData.progress}
                        className="flex-1 h-2 rounded-full"
                        sx={{
                          backgroundColor: darkMode
                            ? theme.palette.grey[800]
                            : "#e5e7eb",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: "4px",
                          },
                        }}
                      />
                      <Typography variant="body2" fontWeight="medium">
                        {taskData.progress}%
                      </Typography>
                    </div>
                  </div>

                  <div>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Estimated Hours
                    </Typography>
                    <div className="flex items-center gap-2">
                      <Schedule
                        sx={{
                          fontSize: 16,
                          color: theme.palette.text.secondary,
                        }}
                      />
                      <Typography variant="body1" fontWeight="medium">
                        {taskData.estimatedHours}h
                      </Typography>
                    </div>
                  </div>

                  <div>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Actual Hours
                    </Typography>
                    <div className="flex items-center gap-2">
                      <Schedule
                        sx={{
                          fontSize: 16,
                          color: theme.palette.text.secondary,
                        }}
                      />
                      <Typography variant="body1" fontWeight="medium">
                        {taskData.actualHours}h
                      </Typography>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subtasks */}
            <Card
              sx={{
                borderRadius: "16px",
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[2],
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="text.primary"
                    >
                      Subtasks ({completedSubtasks}/{totalSubtasks})
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={subtaskProgress}
                      className="w-48 h-2 rounded-full mt-2"
                      sx={{
                        backgroundColor: darkMode
                          ? theme.palette.grey[800]
                          : "#e5e7eb",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: theme.palette.success.main,
                          borderRadius: "4px",
                        },
                      }}
                    />
                  </div>
                  <Button
                    startIcon={<Add />}
                    variant="outlined"
                    onClick={() => setShowSubtaskDialog(true)}
                    sx={{
                      borderRadius: "12px",
                      textTransform: "none",
                    }}
                  >
                    Add Subtask
                  </Button>
                </div>

                <div className="space-y-3">
                  {taskData.subtasks.map((subtask) => (
                    <Card
                      key={subtask.id}
                      sx={{
                        borderRadius: "12px",
                        backgroundColor: darkMode
                          ? theme.palette.background.default
                          : theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        "&:hover": {
                          boxShadow: theme.shadows[4],
                        },
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={subtask.completed}
                            onChange={() => handleSubtaskToggle(subtask.id)}
                            icon={<RadioButtonUnchecked />}
                            checkedIcon={<CheckCircle />}
                            sx={{
                              color: theme.palette.success.main,
                              "&.Mui-checked": {
                                color: theme.palette.success.main,
                              },
                            }}
                          />
                          <div className="flex-1">
                            <Typography
                              variant="body1"
                              fontWeight="medium"
                              sx={{
                                textDecoration: subtask.completed
                                  ? "line-through"
                                  : "none",
                                color: subtask.completed
                                  ? theme.palette.text.disabled
                                  : theme.palette.text.primary,
                              }}
                            >
                              {subtask.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              mt={1}
                            >
                              {subtask.description}
                            </Typography>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-2">
                                <Avatar
                                  src={subtask.assignee.avatar}
                                  sx={{ width: 20, height: 20 }}
                                />
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {subtask.assignee.name}
                                </Typography>
                              </div>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Due:{" "}
                                {new Date(subtask.dueDate).toLocaleDateString()}
                              </Typography>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <IconButton
                              size="small"
                              onClick={() => handleEditSubtask(subtask)}
                              sx={{
                                color: theme.palette.text.secondary,
                                "&:hover": {
                                  color: theme.palette.primary.main,
                                },
                              }}
                            >
                              <Edit sx={{ fontSize: 16 }} />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteSubtask(subtask.id)}
                              sx={{
                                color: theme.palette.text.secondary,
                                "&:hover": {
                                  color: theme.palette.error.main,
                                },
                              }}
                            >
                              <Delete sx={{ fontSize: 16 }} />
                            </IconButton>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comments */}
            <Card
              sx={{
                borderRadius: "16px",
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[2],
              }}
            >
              <CardContent className="p-6">
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="text.primary"
                  mb={2}
                >
                  Comments ({taskData.comments.length})
                </Typography>

                {/* Add Comment */}
                <div className="flex gap-3 mb-6">
                  <Avatar
                    src="/placeholder.svg?height=32&width=32"
                    sx={{ width: 32, height: 32 }}
                  />
                  <div className="flex-1">
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                        },
                        marginBottom:"5px"
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="mt-2 items-end"
                    >
                      Comment
                    </Button>
                  </div>
                </div>

                <Divider
                  sx={{
                    backgroundColor: theme.palette.divider,
                    mb: 2,
                  }}
                />

                {/* Comments List */}
                <div className="space-y-4">
                  {taskData.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar
                        src={comment.avatar}
                        sx={{ width: 32, height: 32 }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Typography
                            variant="body2"
                            fontWeight="medium"
                            color="text.primary"
                          >
                            {comment.author}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {comment.timestamp}
                          </Typography>
                        </div>
                        <Typography variant="body2" color="text.secondary">
                          {comment.content}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assignees */}
            <Card
              sx={{
                borderRadius: "16px",
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[2],
              }}
            >
              <CardContent className="p-6">
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="text.primary"
                  mb={2}
                >
                  Assignees
                </Typography>
                <div className="space-y-3">
                  {taskData.assignees.map((assignee) => (
                    <div key={assignee.id} className="flex items-center gap-3">
                      <Avatar
                        src={assignee.avatar}
                        sx={{ width: 40, height: 40 }}
                      />
                      <div>
                        <Typography
                          variant="body2"
                          fontWeight="medium"
                          color="text.primary"
                        >
                          {assignee.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {assignee.role}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Attachments */}
            <Card
              sx={{
                borderRadius: "16px",
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[2],
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="text.primary"
                  >
                    Attachments
                  </Typography>
                  <IconButton size="small">
                    <AttachFile />
                  </IconButton>
                </div>
                <div className="space-y-3">
                  {taskData.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center gap-3 p-2 rounded-lg"
                      sx={{
                        "&:hover": {
                          backgroundColor: darkMode
                            ? theme.palette.action.hover
                            : theme.palette.grey[100],
                        },
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded flex items-center justify-center"
                        sx={{
                          backgroundColor: darkMode
                            ? alpha(theme.palette.primary.main, 0.1)
                            : theme.palette.primary.light,
                        }}
                      >
                        <AttachFile
                          sx={{
                            fontSize: 16,
                            color: theme.palette.primary.main,
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <Typography
                          variant="body2"
                          fontWeight="medium"
                          color="text.primary"
                        >
                          {attachment.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {attachment.size}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity */}
            <Card
              sx={{
                borderRadius: "16px",
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[2],
              }}
            >
              <CardContent className="p-6">
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="text.primary"
                  mb={2}
                >
                  Recent Activity
                </Typography>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-2 h-2 rounded-full mt-2"
                      sx={{ backgroundColor: theme.palette.success.main }}
                    ></div>
                    <div>
                      <Typography variant="body2" color="text.primary">
                        Task progress updated to 70%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        2 hours ago
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div
                      className="w-2 h-2 rounded-full mt-2"
                      sx={{ backgroundColor: theme.palette.info.main }}
                    ></div>
                    <div>
                      <Typography variant="body2" color="text.primary">
                        Subtask "Typography system" completed
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        1 day ago
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div
                      className="w-2 h-2 rounded-full mt-2"
                      sx={{ backgroundColor: theme.palette.secondary.main }}
                    ></div>
                    <div>
                      <Typography variant="body2" color="text.primary">
                        Task assigned to Mike Chen
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        3 days ago
                      </Typography>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Subtask Dialog */}
        <Dialog
          open={showSubtaskDialog}
          onClose={() => {
            setShowSubtaskDialog(false);
            setEditingSubtask(null);
            setNewSubtask({
              title: "",
              description: "",
              assignee: null,
              dueDate: "",
            });
          }}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "16px",
              backgroundColor: theme.palette.background.paper,
            },
          }}
        >
          <DialogTitle>
            <div className="flex items-center justify-between">
              <Typography variant="h6">
                {editingSubtask ? "Edit Subtask" : "Add New Subtask"}
              </Typography>
              <IconButton
                onClick={() => {
                  setShowSubtaskDialog(false);
                  setEditingSubtask(null);
                }}
              >
                <Close />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className="space-y-4 mt-2">
              <TextField
                fullWidth
                label="Subtask Title"
                value={newSubtask.title}
                onChange={(e) =>
                  setNewSubtask({ ...newSubtask, title: e.target.value })
                }
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={newSubtask.description}
                onChange={(e) =>
                  setNewSubtask({ ...newSubtask, description: e.target.value })
                }
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
              <FormControl fullWidth>
                <InputLabel>Assignee</InputLabel>
                <Select
                  value={newSubtask.assignee?.id || ""}
                  label="Assignee"
                  onChange={(e) => {
                    const assignee = taskData.assignees.find(
                      (a) => a.id === e.target.value
                    );
                    setNewSubtask({ ...newSubtask, assignee });
                  }}
                  sx={{
                    borderRadius: "12px",
                  }}
                >
                  {taskData.assignees.map((assignee) => (
                    <MenuItem key={assignee.id} value={assignee.id}>
                      <div className="flex items-center gap-2">
                        <Avatar
                          src={assignee.avatar}
                          sx={{ width: 24, height: 24 }}
                        />
                        {assignee.name}
                      </div>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                value={newSubtask.dueDate}
                onChange={(e) =>
                  setNewSubtask({ ...newSubtask, dueDate: e.target.value })
                }
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
            </div>
          </DialogContent>
          <DialogActions className="p-6">
            <Button
              onClick={() => {
                setShowSubtaskDialog(false);
                setEditingSubtask(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={editingSubtask ? handleUpdateSubtask : handleAddSubtask}
              disabled={!newSubtask.title.trim()}
            >
              {editingSubtask ? "Update" : "Add"} Subtask
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}
