import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Avatar,
  AvatarGroup,
  Typography,
  IconButton,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
  responsiveFontSizes,
  Box
} from "@mui/material";
import { Add, ArrowForward, Nightlight, Notifications, Sunny } from "@mui/icons-material";
import TimeManagement from "../components/TimeManagement";
import { useNavigate } from "react-router-dom";


const projects = [
  {
    id: 1,
    name: "Taskify",
    description: "Steveceto team",
    background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
    members: [
      { id: 1, avatar: "/placeholder.svg?height=32&width=32", name: "User 1" },
      { id: 2, avatar: "/placeholder.svg?height=32&width=32", name: "User 2" },
      { id: 3, avatar: "/placeholder.svg?height=32&width=32", name: "User 3" },
    ],
    mockup: "/placeholder.svg?height=120&width=160",
  },
  {
    id: 2,
    name: "Online",
    description: "Course apps",
    background: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)",
    members: [
      { id: 1, avatar: "/placeholder.svg?height=32&width=32", name: "User 1" },
      { id: 2, avatar: "/placeholder.svg?height=32&width=32", name: "User 2" },
    ],
    mockup: "/placeholder.svg?height=120&width=160",
  },
];

const timeEntries = [
  {
    id: 1,
    time: "8:00",
    title: "Product Design",
    members: [
      { id: 1, avatar: "/placeholder.svg?height=24&width=24", name: "User 1" },
      { id: 2, avatar: "/placeholder.svg?height=24&width=24", name: "User 2" },
    ],
  },
  {
    id: 2,
    time: "10:00",
    title: "Create Wireframe",
    members: [
      { id: 1, avatar: "/placeholder.svg?height=24&width=24", name: "User 1" },
      { id: 2, avatar: "/placeholder.svg?height=24&width=24", name: "User 2" },
      { id: 3, avatar: "/placeholder.svg?height=24&width=24", name: "User 3" },
    ],
  },
];

export default function Dashboard() {
  const [showTime, setShowTime] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const appTheme = useMemo(() => {
    return responsiveFontSizes(
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          ...(darkMode
            ? {
                // Dark mode palette
                background: {
                  default: "#121826",
                  paper: "#1e293b",
                },
                text: {
                  primary: "#e2e8f0",
                  secondary: "#94a3b8",
                },
              }
            : {
                // Light mode palette
                background: {
                  default: "#f0f9ff",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#1e293b",
                  secondary: "#64748b",
                },
              }),
        },
        typography: {
          fontFamily: "Poppins, Arial, sans-serif",
        },
        components: {
          MuiButton: {
            styleOverrides: {
              outlined: {
                borderColor: darkMode ? "#334155" : "#cbd5e1",
                color: darkMode ? "#e2e8f0" : "#334155",
                "&:hover": {
                  borderColor: darkMode ? "#64748b" : "#94a3b8",
                  backgroundColor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                transition: "transform 0.3s, box-shadow 0.3s",
              },
            },
          },
        },
      })
    );
  }, [darkMode]);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            ml: { xs: 0, md: 10 },
            px: 4,
            py: 8,
            color: 'text.primary'
          }}
        >
          <div className="cursor-pointer">
            <img className="w-40" src="/logo.png" alt="App Logo" />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-3">
              <IconButton
                onClick={() => setDarkMode(!darkMode)}
                sx={{ 
                  bgcolor: 'background.paper', 
                  boxShadow: 1,
                  '&:hover': { bgcolor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
                }}
              >
                {darkMode ? <Sunny /> : <Nightlight />}
              </IconButton>
              <IconButton 
                sx={{ 
                  bgcolor: 'background.paper', 
                  boxShadow: 1,
                  '&:hover': { bgcolor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
                }}
              >
                <Notifications />
              </IconButton>
            </div>
          </div>
        </Box>
      </Container>
      <Box sx={{ 
        minHeight: '100vh', 
        p: 3,
        bgcolor: 'background.default',
        color: 'text.primary'
      }}>
        <div className="max-w-6xl mx-auto">
          {/* Projects Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Typography variant="h5" fontWeight="bold">Dashboard</Typography>
                <Typography variant="body2" color="text.secondary">
                  You have {projects.length} projects
                </Typography>
              </div>
              <Button
                variant="outlined"
                startIcon={<Add />}
                sx={{
                  borderRadius: "24px",
                  px: 3,
                  py: 1,
                }}
              >
                Add
              </Button>
            </div>

            {/* Project Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  sx={{
                    borderRadius: "16px",
                    background: project.background,
                    border: "none",
                    transform: "translateY(0)",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <CardContent className="p-6 text-white relative">
                    {/* Project Info */}
                    <div className="mb-4">
                      <Typography variant="h5" className="font-bold mb-1">
                        {project.name}
                      </Typography>
                      <Typography variant="body2" className="opacity-90">
                        {project.description}
                      </Typography>
                    </div>

                    {/* Members */}
                    <div className="mb-6">
                      <AvatarGroup
                        max={4}
                        sx={{
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            fontSize: 12,
                            border: "2px solid white",
                          },
                        }}
                      >
                        {project.members.map((member) => (
                          <Avatar
                            key={member.id}
                            src={member.avatar}
                            alt={member.name}
                            sx={{
                              bgcolor: "rgba(255,255,255,0.2)",
                              width: 32,
                              height: 32,
                            }}
                          >
                            {member.name.charAt(0)}
                          </Avatar>
                        ))}
                      </AvatarGroup>
                    </div>

                    {/* View Project Button */}
                    <Button
                      fullWidth
                      variant="contained"
                      endIcon={<ArrowForward />}
                      onClick={()=> navigate("/project-dashboard")}
                      sx={{
                        backgroundColor: "rgba(0,0,0,0.2)",
                        color: "white",
                        borderRadius: "16px",
                        py: 1.5,
                        "&:hover": {
                          backgroundColor: "rgba(0,0,0,0.3)",
                        },
                        "&:focus": {
                          backgroundColor: "rgba(0,0,0,0.3)",
                        },
                      }}
                    >
                      View project
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Time Management Section */}
          <TimeManagement
            timeEntries={timeEntries}
            showTime={showTime}
            setShowTime={setShowTime}
            darkMode={darkMode}
          />
        </div>
      </Box>
    </ThemeProvider>
  );
}
