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
    >
      {/* Dialog Header */}
      <DialogTitle className="dark:bg-gray-700 py-6">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center">
            <IconButton onClick={() => setCreateDialogOpen(false)}>
              <Close />
            </IconButton>
            <Typography variant="h6" fontWeight="bold" color="text.primary">
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
                    className="mr-2 text-gray-700 dark:text-gray-50"
                    sx={{ fontSize: 16 }}
                  />
                }
              >
                <MenuItem value="private">Private to you</MenuItem>
                <MenuItem value="team">Team</MenuItem>
                <MenuItem value="public">Public</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </DialogTitle>

      <DialogContent className="px-6 py-4 space-y-6 bg-white dark:bg-gray-700">
        {/* Task Title */}
        <div>
          <Typography variant="subtitle1" className="font-medium mb-2">
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
                <Article className="mr-3 text-gray-400" sx={{ fontSize: 20 }} />
              ),
            }}
            sx={{
              backgroundColor: darkMode ? "#374151" : "white",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#e5e7eb",
                },
              },
            }}
          />
        </div>

        {/* Description */}
        <div>
          <Typography variant="subtitle1" className="font-medium mb-2">
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
                  className="mr-3 text-gray-400 self-start mt-1"
                  sx={{ fontSize: 20 }}
                />
              ),
            }}
            sx={{
              backgroundColor: darkMode ? "#374151" : "white",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#e5e7eb",
                },
              },
            }}
          />
        </div>

        {/* Time Section */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Typography variant="subtitle1" className="font-medium mb-2">
              Start date
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={newTask.startTime}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, startTime: e.target.value }))
              }
              sx={{
                backgroundColor: darkMode ? "#374151" : "white",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#e5e7eb",
                  },
                },
              }}
            />
          </div>
          <div>
            <Typography variant="subtitle1" className="font-medium mb-2">
              End date
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={newTask.endTime}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, endTime: e.target.value }))
              }
              sx={{
                backgroundColor: darkMode ? "#374151" : "white",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#e5e7eb",
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Priority */}
        <div>
          <Typography variant="subtitle1" className="font-medium mb-3">
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
                className={`rounded-full px-6 py-2 ${
                  newTask.priority === priority
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
                sx={{
                  backgroundColor:
                    newTask.priority === priority ? "#1f2937" : "white",
                  color: newTask.priority === priority ? "white" : "#374151",
                  borderColor: "#d1d5db",
                  "&:hover": {
                    backgroundColor:
                      newTask.priority === priority ? "#111827" : "#f9fafb",
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
          <Typography variant="subtitle1" className="font-medium">
            Participants
          </Typography>
          <div className="flex items-center gap-3 flex-wrap">
            <IconButton
              onClick={handleAddParticipant}
              className="border-2 border-dashed border-gray-300 hover:border-gray-400"
              sx={{
                width: 40,
                height: 40,
                border: "2px dashed #d1d5db",
                "&:hover": {
                  borderColor: "#9ca3af",
                },
              }}
            >
              <Add className="text-gray-500" />
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
                    top: 10,
                    right: -5,
                    backgroundColor: "#6b7280",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#4b5563",
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
                  }}
                >
                  {participant.name}
                </Typography>
              </div>
            ))}
          </div>
        </div>
        {/* Create Button */}
        <div className="p-6">
          <Button
            fullWidth
            variant="contained"
            onClick={handleCreateTask}
            className="bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl text-lg font-medium"
            sx={{
              backgroundColor: "#1f2937",
              color: "white",
              padding: "16px",
              borderRadius: "12px",
              fontSize: "1.125rem",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "#111827",
              },
            }}
          >
            + Create Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
