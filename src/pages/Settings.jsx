"use client";

import { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Edit,
  PhotoCamera,
  Save,
  Cancel,
  Delete,
  Notifications,
  Security,
  Email,
  Phone,
  LocationOn,
  Work,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

export default function UserSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [userInfo, setUserInfo] = useState({
    firstName: "Steve",
    lastName: "Veceto",
    email: "steveceto@gmail.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    jobTitle: "Software Engineer",
    company: "Steveceto Inc.",
    bio: "Passionate product designer with 5+ years of experience creating user-centered digital experiences.",
    avatar: "/placeholder.svg?height=120&width=120",
    timezone: "Europe/London",
    language: "English",
    theme: "light",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    weeklyReports: false,
    teamUpdates: true,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      setIsEditing(false);
      setSnackbar({
        open: true,
        message: "Profile updated successfully!",
        severity: "success",
      });
    }, 1000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserInfo({ ...userInfo, avatar: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNotificationChange = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSnackbar({
        open: true,
        message: "Passwords don't match!",
        severity: "error",
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setShowPasswordDialog(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setSnackbar({
        open: true,
        message: "Password updated successfully!",
        severity: "success",
      });
    }, 1000);
  };

  const handleDeleteAccount = () => {
    // Simulate account deletion
    setTimeout(() => {
      setShowDeleteDialog(false);
      setSnackbar({
        open: true,
        message:
          "Account deletion initiated. You will receive a confirmation email.",
        severity: "warning",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <Container maxWidth="lg" className="py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div>
            <Typography
              variant="h4"
              className="font-bold text-gray-900 dark:text-gray-100"
            >
              Account Settings
            </Typography>
            <Typography
              variant="body1"
              className="text-gray-600 dark:text-gray-300"
            >
              Manage your personal information and preferences
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card
              className="shadow-lg mb-6 dark:bg-gray-800 bg-transparent"
              sx={{
                borderRadius: "16px",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <Typography
                    variant="h6"
                    className="font-bold text-gray-900 dark:text-gray-100"
                  >
                    Personal Information
                  </Typography>
                  {!isEditing ? (
                    <Button
                      startIcon={<Edit />}
                      onClick={() => setIsEditing(true)}
                      className="text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800"
                    >
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        startIcon={<Save />}
                        variant="contained"
                        onClick={handleSave}
                        sx={{
                          backgroundColor: "#3b82f6",
                          "&:hover": { backgroundColor: "#2563eb" },
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        startIcon={<Cancel />}
                        onClick={handleCancel}
                        className="text-gray-600"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>

                {/* Avatar Section */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative">
                    <Avatar
                      src={userInfo.avatar}
                      alt={`${userInfo.firstName} ${userInfo.lastName}`}
                      sx={{ width: 120, height: 120 }}
                      className="shadow-lg"
                    />
                    {isEditing && (
                      <IconButton
                        className="absolute -bottom-2 -right-2 bg-blue-600 text-white hover:bg-blue-700"
                        component="label"
                        size="small"
                      >
                        <PhotoCamera sx={{ fontSize: 16 }} />
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleAvatarChange}
                        />
                      </IconButton>
                    )}
                  </div>
                  <div>
                    <Typography
                      variant="h5"
                      className="font-bold text-gray-900 dark:text-gray-100"
                    >
                      {userInfo.firstName} {userInfo.lastName}
                    </Typography>
                    <Typography
                      variant="body1"
                      className="text-gray-600 dark:text-gray-300 mb-1"
                    >
                      {userInfo.jobTitle}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-gray-500 dark:text-gray-400"
                    >
                      {userInfo.company}
                    </Typography>
                    <Chip
                      label="Premium Member"
                      size="small"
                      className="mt-2"
                      sx={{
                        backgroundColor: "#fef3c7",
                        color: "#92400e",
                      }}
                    />
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <TextField
                    label="First Name"
                    value={userInfo.firstName}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, firstName: e.target.value })
                    }
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <Person
                          className="text-gray-400 mr-2"
                          sx={{ fontSize: 20 }}
                        />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                  />
                  <TextField
                    label="Last Name"
                    value={userInfo.lastName}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, lastName: e.target.value })
                    }
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <Person
                          className="text-gray-400 mr-2"
                          sx={{ fontSize: 20 }}
                        />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                  />
                  <TextField
                    label="Email"
                    type="email"
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <Email
                          className="text-gray-400 mr-2"
                          sx={{ fontSize: 20 }}
                        />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                  />
                  <TextField
                    label="Phone"
                    value={userInfo.phone}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, phone: e.target.value })
                    }
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <Phone
                          className="text-gray-400 mr-2"
                          sx={{ fontSize: 20 }}
                        />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                  />
                  <TextField
                    label="Location"
                    value={userInfo.location}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, location: e.target.value })
                    }
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <LocationOn
                          className="text-gray-400 mr-2"
                          sx={{ fontSize: 20 }}
                        />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                  />
                  <TextField
                    label="Job Title"
                    value={userInfo.jobTitle}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, jobTitle: e.target.value })
                    }
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <Work
                          className="text-gray-400 mr-2"
                          sx={{ fontSize: 20 }}
                        />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                  />
                </div>

                <TextField
                  label="Bio"
                  multiline
                  rows={3}
                  value={userInfo.bio}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, bio: e.target.value })
                  }
                  disabled={!isEditing}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
              </CardContent>
            </Card>

            {/* Preferences Card */}
            <Card
              className="shadow-lg dark:bg-gray-800 bg-transparent"
              sx={{
                borderRadius: "16px",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent className="p-6">
                <Typography
                  variant="h6"
                  className="font-bold text-gray-900 dark:text-gray-100"
                >
                  Preferences
                </Typography>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <FormControl fullWidth>
                    <InputLabel>Timezone</InputLabel>
                    <Select
                      value={userInfo.timezone}
                      label="Timezone"
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, timezone: e.target.value })
                      }
                      sx={{
                        borderRadius: "12px",
                      }}
                    >
                      <MenuItem value="Europe/London">
                        Greenwich Mean Time (GMT)
                      </MenuItem>
                      <MenuItem value="Europe/London">GMT + 1</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={userInfo.language}
                      label="Language"
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, language: e.target.value })
                      }
                      sx={{
                        borderRadius: "12px",
                      }}
                    >
                      <MenuItem value="English">English</MenuItem>
                      <MenuItem value="French">French</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications Card */}
            <Card
              className="shadow-lg dark:bg-gray-800 bg-transparent"
              sx={{
                borderRadius: "16px",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Notifications className="text-blue-600" />
                  <Typography
                    variant="h6"
                    className="font-bold text-gray-900 dark:text-gray-100"
                  >
                    Notifications
                  </Typography>
                </div>

                <div className="space-y-3">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.emailNotifications}
                        onChange={() =>
                          handleNotificationChange("emailNotifications")
                        }
                        color="primary"
                      />
                    }
                    label="Email Notifications"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.pushNotifications}
                        onChange={() =>
                          handleNotificationChange("pushNotifications")
                        }
                        color="primary"
                      />
                    }
                    label="Push Notifications"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.taskReminders}
                        onChange={() =>
                          handleNotificationChange("taskReminders")
                        }
                        color="primary"
                      />
                    }
                    label="Task Reminders"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.weeklyReports}
                        onChange={() =>
                          handleNotificationChange("weeklyReports")
                        }
                        color="primary"
                      />
                    }
                    label="Weekly Reports"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.teamUpdates}
                        onChange={() => handleNotificationChange("teamUpdates")}
                        color="primary"
                      />
                    }
                    label="Team Updates"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security Card */}
            <Card
              className="shadow-lg dark:bg-gray-800 bg-transparent"
              sx={{
                borderRadius: "16px",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Security className="text-green-600" />
                  <Typography
                    variant="h6"
                    className="font-bold text-gray-900 dark:text-gray-100"
                  >
                    Security
                  </Typography>
                </div>

                <div className="space-y-3">
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => setShowPasswordDialog(true)}
                    className="justify-start text-gray-900 dark:text-gray-100 dark:hover:text-gray-900"
                    sx={{
                      borderRadius: "12px",
                      textTransform: "none",
                      borderColor: "#e5e7eb",
                      color: "#374151",
                      "&:hover": {
                        backgroundColor: "#f9fafb",
                        borderColor: "#d1d5db",
                      },
                    }}
                  >
                    Change Password
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    className="justify-start text-gray-900 dark:text-gray-100 dark:hover:text-gray-900"
                    sx={{
                      borderRadius: "12px",
                      textTransform: "none",
                      borderColor: "#e5e7eb",
                      color: "#374151",
                      "&:hover": {
                        backgroundColor: "#f9fafb",
                        borderColor: "#d1d5db",
                      },
                    }}
                  >
                    Two-Factor Authentication
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    className="justify-start text-gray-900 dark:text-gray-100 dark:hover:text-gray-900"
                    sx={{
                      borderRadius: "12px",
                      textTransform: "none",
                      borderColor: "#e5e7eb",
                      color: "#374151",
                      "&:hover": {
                        backgroundColor: "#f9fafb",
                        borderColor: "#d1d5db",
                      },
                    }}
                  >
                    Login History
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card
              className="shadow-lg border-red-200 dark:bg-gray-800 bg-transparent"
              sx={{
                borderRadius: "16px",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent className="p-6">
                <Typography variant="h6" className="font-bold mb-4">
                  Danger Zone
                </Typography>
                {/* <Typography variant="body2" className="text-gray-600 dark:text-gray-100 mb-4">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </Typography> */}
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => setShowDeleteDialog(true)}
                  sx={{
                    borderRadius: "12px",
                    marginY: "17px",
                    textTransform: "none",
                  }}
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Password Change Dialog */}
        <Dialog
          open={showPasswordDialog}
          onClose={() => setShowPasswordDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "16px",
            },
          }}
        >
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
            <div className="space-y-4 mt-2">
              <TextField
                fullWidth
                label="Current Password"
                type={showPassword ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
            </div>
          </DialogContent>
          <DialogActions className="p-6">
            <Button onClick={() => setShowPasswordDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handlePasswordChange}
              sx={{
                backgroundColor: "#3b82f6",
                "&:hover": { backgroundColor: "#2563eb" },
              }}
            >
              Update Password
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Account Dialog */}
        <Dialog
          open={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "16px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1f2937" : "#fff", // Tailwind's gray-800
              color: (theme) =>
                theme.palette.mode === "dark" ? "#e5e7eb" : "#111827", // Tailwind's gray-200 / gray-900
            },
          }}
        >
          <DialogTitle className="text-red-600 dark:text-red-400">
            Delete Account
          </DialogTitle>

          <DialogContent>
            <Alert
              severity="warning"
              className="mb-4"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#facc15" : undefined, // yellow-400
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#000" : undefined,
              }}
            >
              This action cannot be undone. This will permanently delete your
              account and remove all your data from our servers.
            </Alert>
            <Typography
              variant="body1"
              className="text-gray-700 dark:text-gray-300"
            >
              Are you sure you want to delete your account? All your projects,
              tasks, and data will be permanently removed.
            </Typography>
          </DialogContent>

          <DialogActions className="p-6">
            <Button
              onClick={() => setShowDeleteDialog(false)}
              sx={{
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#e5e7eb" : undefined, // gray-200
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteAccount}
            >
              Delete Account
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
