import { useState } from "react"
import { Button, Typography, TextField, Link, Card, CardContent } from "@mui/material"

export default function PreRegistration() {
  const [email, setEmail] = useState("")

  const handleCreateAccount = () => {
    console.log("Creating account for:", email)
    // Handle account creation logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-teal-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Dashboard Mockup */}
        <div className="mb-12 relative">
          {/* Main Dashboard Card */}
          <Card
            className="transform rotate-3 shadow-2xl mb-4"
            sx={{
              borderRadius: "20px",
              backgroundColor: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent className="p-6">
              {/* Header */}
              <div className="mb-6">
                <Typography variant="h6" className="font-bold text-gray-900 mb-1">
                  Hi Steve,
                </Typography>
                <Typography variant="body1" className="text-gray-600">
                  Welcome to Taskify
                </Typography>
              </div>

              {/* Chart Section */}
              <div className="mb-6">
                <div className="flex items-end justify-between h-24 mb-2">
                  {/* Bar Chart */}
                  <div className="flex items-end gap-2 h-full">
                    <div className="w-4 bg-gradient-to-t from-purple-400 to-purple-300 rounded-t h-16"></div>
                    <div className="w-4 bg-gradient-to-t from-blue-400 to-blue-300 rounded-t h-20"></div>
                    <div className="w-4 bg-gradient-to-t from-green-400 to-green-300 rounded-t h-12"></div>
                    <div className="w-4 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t h-18"></div>
                    <div className="w-4 bg-gradient-to-t from-pink-400 to-pink-300 rounded-t h-14"></div>
                    <div className="w-4 bg-gradient-to-t from-indigo-400 to-indigo-300 rounded-t h-22"></div>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <Typography variant="h5" className="font-bold text-gray-900">
                      2,847
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      Total Tasks
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Task Items */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <Typography variant="body2" className="flex-1 text-gray-700">
                    Design System
                  </Typography>
                  <Typography variant="caption" className="text-gray-500">
                    85%
                  </Typography>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <Typography variant="body2" className="flex-1 text-gray-700">
                    User Research
                  </Typography>
                  <Typography variant="caption" className="text-gray-500">
                    62%
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Secondary Dashboard Card */}
          <Card
            className="absolute -bottom-4 -right-4 transform -rotate-2 shadow-xl w-48"
            sx={{
              borderRadius: "16px",
              backgroundColor: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
            }}
          >
            <CardContent className="p-4">
              <div className="mb-3">
                <Typography variant="body2" className="font-semibold text-gray-900 mb-2">
                  Today's Progress
                </Typography>

                {/* Mini Chart */}
                <div className="flex items-end gap-1 h-8 mb-3">
                  <div className="w-2 bg-purple-300 rounded-t h-4"></div>
                  <div className="w-2 bg-blue-300 rounded-t h-6"></div>
                  <div className="w-2 bg-green-300 rounded-t h-3"></div>
                  <div className="w-2 bg-yellow-300 rounded-t h-7"></div>
                  <div className="w-2 bg-pink-300 rounded-t h-5"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Typography variant="caption" className="text-gray-600">
                    Completed
                  </Typography>
                  <Typography variant="caption" className="font-medium text-gray-900">
                    12
                  </Typography>
                </div>
                <div className="flex items-center justify-between">
                  <Typography variant="caption" className="text-gray-600">
                    In Progress
                  </Typography>
                  <Typography variant="caption" className="font-medium text-gray-900">
                    5
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="text-center mb-8 mt-16">
          <Typography variant="h3" className="font-bold text-gray-900 mb-4 leading-tight">
            Manage your daily task
          </Typography>
          <Typography variant="body1" className="text-gray-600 mb-8 leading-relaxed">
            Join thousands of users who organize their work easily and seamlessly
          </Typography>

          {/* Email Input */}
          <div className="mb-6">
            <TextField
              fullWidth
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              sx={{
                backgroundColor: "rgba(255,255,255,0.9)",
                borderRadius: "12px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "& fieldset": {
                    borderColor: "rgba(255,255,255,0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255,255,255,0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3b82f6",
                  },
                },
              }}
            />
          </div>

          {/* Create Account Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleCreateAccount}
            className="mb-4"
            sx={{
              backgroundColor: "#1e293b",
              color: "white",
              padding: "16px",
              borderRadius: "12px",
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#0f172a",
              },
            }}
          >
            Create Account
          </Button>

          {/* Login Link */}
          <Typography variant="body2" className="text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium no-underline hover:underline">
              Log in
            </Link>
          </Typography>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-0 w-16 h-16 bg-purple-200/40 rounded-full blur-lg"></div>
      </div>
    </div>
  )
}
