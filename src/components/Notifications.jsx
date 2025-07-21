// components/NotificationDialog.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
import {
  CheckCircle,
  Assignment,
  Schedule,
  PendingActions,
  Close,
} from "@mui/icons-material";
import { recentActivities } from "../data/recentactivities";

export default function NotificationDialog({ open, onClose }) {
  const getActivityIcon = (type) => {
    switch (type) {
      case "completed":
        return <CheckCircle className="text-green-500" sx={{ fontSize: 16 }} />;
      case "created":
        return <Assignment className="text-blue-500" sx={{ fontSize: 16 }} />;
      case "updated":
        return <Schedule className="text-orange-500" sx={{ fontSize: 16 }} />;
      case "assigned":
        return (
          <PendingActions className="text-purple-500" sx={{ fontSize: 16 }} />
        );
      default:
        return <Assignment className="text-gray-500" sx={{ fontSize: 16 }} />;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1f2937" : "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
        },
      }}
    >
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        className="text-gray-900 dark:text-gray-100"
      >
        Recent Activities
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent className="p-4">
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex-shrink-0">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <Typography variant="body2" className="font-medium text-gray-900 dark:text-gray-100">
                  {activity.action}
                </Typography>
                <Typography variant="body2" className="text-gray-600 dark:text-gray-300">
                  {activity.task}
                </Typography>
              </div>
              <div className="text-right">
                <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
                  {activity.user}
                </Typography>
                <Typography variant="caption" className="block text-gray-400 dark:text-gray-500">
                  {activity.time}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
