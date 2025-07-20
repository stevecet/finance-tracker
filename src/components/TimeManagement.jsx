import React, { useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  AvatarGroup,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Today, AccessTime } from "@mui/icons-material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function TimeManagement({ timeEntries, showTime, setShowTime }) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

const formatDate = (date) => {
  if (!(date instanceof Date) || isNaN(date)) return null;
  return date.toISOString().split("T")[0];
};


  const filteredEntries = timeEntries.filter(
    (entry) => formatDate(new Date(entry.date)) === formatDate(selectedDate)
  );

  const handleTodayClick = () => {
    setSelectedDate(today);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {/* Calendar section */}
      <div className="border-gray-200 pr-4">
        <div className="flex mb-4">
          <Typography variant="h5" className="font-bold flex-1">
            Time Management
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Today />}
            onClick={handleTodayClick}
            size="small"
            sx={{
              borderRadius: "20px",
              fontSize: "0.875rem",
              borderColor: "#d1d5db",
              color: "#374151",
              "&:hover": {
                backgroundColor: "#f9fafb",
                borderColor: "#9ca3af",
              },
            }}
          >
            Today
          </Button>
        </div>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateCalendar
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
          />
        </LocalizationProvider>
      </div>

      {/* Project section */}
      <div className="pl-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <FormControlLabel
            control={
              <Switch
                checked={showTime}
                onChange={(e) => setShowTime(e.target.checked)}
                color="primary"
              />
            }
            label="Show time"
            className="text-gray-700"
          />
          <Typography variant="subtitle1" className="font-semibold text-gray-700">
            Projects for {selectedDate.toLocaleDateString()}
          </Typography>
        </div>

        <div className="space-y-4">
          {filteredEntries.length === 0 ? (
            <Typography className="text-gray-500 italic">
              No projects scheduled for this day.
            </Typography>
          ) : (
            filteredEntries.map((entry) => (
              <Card
                key={entry.id}
                className="shadow-sm hover:shadow-md transition-shadow duration-200"
                sx={{
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {showTime && entry.time && (
                      <div className="flex items-center gap-2 min-w-16">
                        <AccessTime
                          className="text-gray-400"
                          sx={{ fontSize: 16 }}
                        />
                        <Typography
                          variant="body2"
                          className="font-medium text-gray-900"
                        >
                          {entry.time}
                        </Typography>
                      </div>
                    )}
                    <Typography
                      variant="body1"
                      className="font-medium text-gray-900 flex-1"
                    >
                      {entry.title}
                    </Typography>
                    <AvatarGroup
                      max={3}
                      sx={{
                        "& .MuiAvatar-root": {
                          width: 24,
                          height: 24,
                          fontSize: 10,
                        },
                      }}
                    >
                      {entry.members.map((member) => (
                        <Avatar
                          key={member.id}
                          src={member.avatar}
                          alt={member.name}
                          sx={{
                            bgcolor: "#ec4899",
                            width: 24,
                            height: 24,
                          }}
                        >
                          {member.name.charAt(0)}
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
