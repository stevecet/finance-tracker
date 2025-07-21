import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { recentActivities } from "../data/recentactivities";

export default function Notifications() {
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
    <Card
      className="mt-6 shadow-lg"
      sx={{
        borderRadius: "16px",
        backgroundColor: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(10px)",
      }}
    >
      <CardContent className="p-6">
        <Typography variant="h6" className="font-bold text-gray-900 mb-4">
          Recent Activities
        </Typography>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <Typography
                  variant="body2"
                  className="font-medium text-gray-900"
                >
                  {activity.action}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {activity.task}
                </Typography>
              </div>
              <div className="text-right">
                <Typography variant="caption" className="text-gray-500">
                  {activity.user}
                </Typography>
                <Typography variant="caption" className="block text-gray-400">
                  {activity.time}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
