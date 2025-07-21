import { useState } from "react";
import {
  Button,
  Avatar,
  Chip,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  useTheme,
} from "@mui/material";
import {
  Add,
  Article,
  Description,
  People,
  Close,
  AccessTime,
} from "@mui/icons-material";

export default function CreateProject({
  createDialogOpen,
  setCreateDialogOpen,
  darkMode,
}) {
  const theme = useTheme();

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    startTime: "08:00",
    endTime: "08:00",
    priority: "High",
    participants: [
      { id: 1, name: "Jonson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 2, name: "Xisha", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    date: "Q2 Feb 2023",
  });

  const handleCreateTask = () => {
    setCreateDialogOpen(false);
    // Reset form
    setNewTask({
      title: "",
      description: "",
      startTime: "08:00",
      endTime: "08:00",
      priority: "High",
      participants: [
        {
          id: 1,
          name: "Jonson",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        { id: 2, name: "Xisha", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      date: "Q2 Feb 2023",
    });
  };

  const handleRemoveParticipant = (participantId) => {
    setNewTask((prev) => ({
      ...prev,
      participants: prev.participants.filter((p) => p.id !== participantId),
    }));
  };

  const handleAddParticipant = () => {
    const newParticipant = {
      id: Date.now(),
      name: `User ${newTask.participants.length + 1}`,
      avatar: "/placeholder.svg?height=32&width=32",
    };
    setNewTask((prev) => ({
      ...prev,
      participants: [...prev.participants, newParticipant],
    }));
  };

  return (
    <Dialog
      open={createDialogOpen}
      onClose={() => setCreateDialogOpen(false)}
      fullScreen
      PaperProps={{
        sx: {
          backgroundColor: darkMode
            ? theme.palette.background.default
            : "#EFF6FF",
          color: theme.palette.text.primary,
        },
      }}
    >
      {/* Dialog Header */}
      <DialogTitle
        sx={{
          backgroundColor: darkMode ? theme.palette.background.paper : "white",
          borderBottom: darkMode ? "1px solid #334155" : "1px solid #e5e7eb",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <IconButton
              onClick={() => setCreateDialogOpen(false)}
              sx={{ color: theme.palette.text.primary }}
            >
              <Close />
            </IconButton>
            <Typography variant="h6" className="font-semibold">
              Create Task
            </Typography>
          </div>
          {/* Private to you dropdown */}
          <div>
            <FormControl size="small" className="min-w-32">
              <Select
                value="private"
                displayEmpty
                startAdornment={
                  <People
                    className="mr-2"
                    sx={{
                      fontSize: 16,
                      color: theme.palette.text.secondary,
                    }}
                  />
                }
                sx={{
                  backgroundColor: darkMode
                    ? theme.palette.background.paper
                    : "white",
                  color: theme.palette.text.primary,
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "& .MuiSvgIcon-root": {
                    color: theme.palette.text.primary,
                  },
                }}
              >
                <MenuItem value="private">Private to you</MenuItem>
                <MenuItem value="team">Team</MenuItem>
                <MenuItem value="public">Public</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </DialogTitle>

      <DialogContent
        className="px-6 my-4 space-y-6"
        sx={{
          backgroundColor: darkMode
            ? theme.palette.background.default
            : "#EFF6FF",
        }}
      >
        {/* Task Title */}
        <div>
          <Typography
            variant="subtitle1"
            className="font-medium mb-2"
            color="textSecondary"
          >
            Task title
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter task title"
            value={newTask.title}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, title: e.target.value }))
            }
            InputProps={{
              startAdornment: (
                <Article
                  className="mr-3"
                  sx={{
                    fontSize: 20,
                    color: theme.palette.text.secondary,
                  }}
                />
              ),
              sx: {
                color: theme.palette.text.primary,
              },
            }}
            sx={{
              backgroundColor: darkMode
                ? theme.palette.background.paper
                : "white",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: darkMode ? theme.palette.divider : "#e5e7eb",
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />
        </div>

        {/* Description */}
        <div>
          <Typography
            variant="subtitle1"
            className="font-medium mb-2"
            color="textSecondary"
          >
            Description
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Enter task description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, description: e.target.value }))
            }
            InputProps={{
              startAdornment: (
                <Description
                  className="mr-3 self-start mt-1"
                  sx={{
                    fontSize: 20,
                    color: theme.palette.text.secondary,
                  }}
                />
              ),
              sx: {
                color: theme.palette.text.primary,
              },
            }}
            sx={{
              backgroundColor: darkMode
                ? theme.palette.background.paper
                : "white",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: darkMode ? theme.palette.divider : "#e5e7eb",
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />
        </div>

        {/* Time Section */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Typography
              variant="subtitle1"
              className="font-medium mb-2"
              color="textSecondary"
            >
              Start date
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={newTask.startTime}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, startTime: e.target.value }))
              }
              InputProps={{
                sx: {
                  color: theme.palette.text.primary,
                },
              }}
              sx={{
                backgroundColor: darkMode
                  ? theme.palette.background.paper
                  : "white",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: darkMode ? theme.palette.divider : "#e5e7eb",
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />
          </div>
          <div>
            <Typography
              variant="subtitle1"
              className="font-medium mb-2"
              color="textSecondary"
            >
              End date
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={newTask.endTime}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, endTime: e.target.value }))
              }
              InputProps={{
                sx: {
                  color: theme.palette.text.primary,
                },
              }}
              sx={{
                backgroundColor: darkMode
                  ? theme.palette.background.paper
                  : "white",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: darkMode ? theme.palette.divider : "#e5e7eb",
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Priority */}
        <div>
          <Typography
            variant="subtitle1"
            className="font-medium mb-3"
            color="textSecondary"
          >
            Priority
          </Typography>
          <div className="flex gap-3">
            {["Low", "Medium", "High"].map((priority) => (
              <Button
                key={priority}
                variant={
                  newTask.priority === priority ? "contained" : "outlined"
                }
                onClick={() => setNewTask((prev) => ({ ...prev, priority }))}
                sx={{
                  borderRadius: "24px",
                  px: 3,
                  py: 1,
                  backgroundColor:
                    newTask.priority === priority
                      ? darkMode
                        ? theme.palette.primary.main
                        : "#1f2937"
                      : "transparent",
                  color:
                    newTask.priority === priority
                      ? "white"
                      : theme.palette.text.primary,
                  borderColor: darkMode ? theme.palette.divider : "#d1d5db",
                  "&:hover": {
                    backgroundColor:
                      newTask.priority === priority
                        ? darkMode
                          ? theme.palette.primary.dark
                          : "#111827"
                        : darkMode
                        ? theme.palette.action.hover
                        : "#f9fafb",
                    borderColor:
                      newTask.priority === priority
                        ? "transparent"
                        : theme.palette.divider,
                  },
                }}
              >
                {priority}
              </Button>
            ))}
          </div>
        </div>

        {/* Participants */}
        <div>
          <Typography
            variant="subtitle1"
            className="font-medium"
            color="textSecondary"
          >
            Participants
          </Typography>
          <div className="flex items-center gap-3 flex-wrap">
            <IconButton
              onClick={handleAddParticipant}
              sx={{
                width: 40,
                height: 40,
                border: "2px dashed",
                borderColor: darkMode ? theme.palette.divider : "#d1d5db",
                color: theme.palette.text.secondary,
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: darkMode
                    ? theme.palette.action.hover
                    : "rgba(0,0,0,0.04)",
                },
              }}
            >
              <Add />
            </IconButton>
            {newTask.participants.map((participant) => (
              <div key={participant.id} className="relative py-5">
                <Avatar
                  src={participant.avatar}
                  alt={participant.name}
                  sx={{ width: 40, height: 40 }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveParticipant(participant.id)}
                  sx={{
                    width: 20,
                    height: 20,
                    position: "absolute",
                    top: -10,
                    right: -10,
                    backgroundColor: darkMode ? "#4b5563" : "#6b7280",
                    color: "white",
                    "&:hover": {
                      backgroundColor: darkMode ? "#374151" : "#4b5563",
                    },
                  }}
                >
                  <Close sx={{ fontSize: 12 }} />
                </IconButton>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    textAlign: "center",
                    color: theme.palette.text.secondary,
                  }}
                >
                  {participant.name}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>

      {/* Create Button */}
      <div
        className="p-6"
        sx={{
          backgroundColor: darkMode
            ? theme.palette.background.default
            : "#EFF6FF",
        }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={handleCreateTask}
          sx={{
            backgroundColor: darkMode ? theme.palette.primary.main : "#1f2937",
            color: "white",
            padding: "16px",
            borderRadius: "12px",
            fontSize: "1.125rem",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: darkMode
                ? theme.palette.primary.dark
                : "#111827",
            },
          }}
        >
          + Create Task
        </Button>
      </div>
    </Dialog>
  );
}
