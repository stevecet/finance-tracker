import { useState } from "react"
import { Button, Typography, TextField, Link, Card, CardContent, IconButton, InputAdornment } from "@mui/material"
import { Visibility, VisibilityOff, Google, Apple } from "@mui/icons-material"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      console.log("Logging in:", { email, password })
      setIsLoading(false)
      // Handle login logic here
    }, 2000)
  }

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`)
    // Handle social login logic here
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-teal-50 to-blue-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-0 w-16 h-16 bg-purple-200/40 rounded-full blur-lg"></div>
      <div className="absolute top-20 right-20 w-24 h-24 bg-pink-200/20 rounded-full blur-xl"></div>

      <div className="max-w-md w-full z-10">
        {/* Mini Dashboard Preview */}
        <div className="mb-8 relative">
          <Card
            className="transform rotate-1 shadow-lg mb-4 mx-auto w-48"
            sx={{
              borderRadius: "16px",
              backgroundColor: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
            }}
          >
            <CardContent className="p-4">
              <div className="mb-3">
                <Typography variant="body2" className="font-semibold text-gray-900 mb-2">
                  Welcome Back!
                </Typography>

                {/* Mini Progress Bars */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                      <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-1.5 rounded-full w-3/4"></div>
                    </div>
                    <Typography variant="caption" className="text-gray-600 text-xs">
                      75%
                    </Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                      <div className="bg-gradient-to-r from-green-400 to-green-500 h-1.5 rounded-full w-1/2"></div>
                    </div>
                    <Typography variant="caption" className="text-gray-600 text-xs">
                      50%
                    </Typography>
                  </div>
                </div>

                {/* Mini Stats */}
                <div className="flex justify-between text-center">
                  <div>
                    <Typography variant="caption" className="font-bold text-gray-900 block">
                      24
                    </Typography>
                    <Typography variant="caption" className="text-gray-500 text-xs">
                      Tasks
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="caption" className="font-bold text-gray-900 block">
                      8
                    </Typography>
                    <Typography variant="caption" className="text-gray-500 text-xs">
                      Done
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="caption" className="font-bold text-gray-900 block">
                      3
                    </Typography>
                    <Typography variant="caption" className="text-gray-500 text-xs">
                      Teams
                    </Typography>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Login Card */}
        <Card
          className="shadow-2xl"
          sx={{
            borderRadius: "24px",
            backgroundColor: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(15px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <Typography variant="h4" className="font-bold text-gray-900 mb-2">
                Welcome Back
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                Sign in to continue managing your tasks
              </Typography>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleSocialLogin("Google")}
                startIcon={<Google />}
                sx={{
                  borderColor: "#e5e7eb",
                  color: "#374151",
                  padding: "12px",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#f9fafb",
                    borderColor: "#d1d5db",
                  },
                }}
              >
                Continue with Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleSocialLogin("Apple")}
                startIcon={<Apple />}
                sx={{
                  borderColor: "#e5e7eb",
                  color: "#374151",
                  padding: "12px",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#f9fafb",
                    borderColor: "#d1d5db",
                  },
                }}
              >
                Continue with Apple
              </Button>
            </div>

            {/* Divider */}
            <div className="flex items-center mb-6">
              <div className="flex-1 border-t border-gray-200"></div>
              <Typography variant="body2" className="px-4 text-gray-500">
                or
              </Typography>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Login Form */}
            <div className="space-y-4 mb-6">
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                placeholder="Enter your email"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "rgba(249,250,251,0.5)",
                    "& fieldset": {
                      borderColor: "#e5e7eb",
                    },
                    "&:hover fieldset": {
                      borderColor: "#d1d5db",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3b82f6",
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                placeholder="Enter your password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "rgba(249,250,251,0.5)",
                    "& fieldset": {
                      borderColor: "#e5e7eb",
                    },
                    "&:hover fieldset": {
                      borderColor: "#d1d5db",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3b82f6",
                    },
                  },
                }}
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right mb-6">
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium no-underline hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleLogin}
              disabled={isLoading}
              className="mb-6"
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
                "&:disabled": {
                  backgroundColor: "#94a3b8",
                },
              }}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>

            {/* Sign Up Link */}
            <div className="text-center">
              <Typography variant="body2" className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-600 hover:text-blue-800 font-medium no-underline hover:underline"
                >
                  Create Account
                </Link>
              </Typography>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <Typography variant="caption" className="text-gray-500">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  )
}
