"use client"

import { useState } from "react"
import { Button, Typography, TextField, Link, Card, CardContent } from "@mui/material"
import { ArrowBack, Email } from "@mui/icons-material"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleResetPassword = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      console.log("Sending reset email to:", email)
      setIsLoading(false)
      setIsEmailSent(true)
    }, 2000)
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-teal-50 to-blue-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Card
            className="shadow-2xl text-center"
            sx={{
              borderRadius: "24px",
              backgroundColor: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(15px)",
            }}
          >
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Email className="text-green-600" sx={{ fontSize: 32 }} />
                </div>
                <Typography variant="h5" className="font-bold text-gray-900 mb-2">
                  Check Your Email
                </Typography>
                <Typography variant="body1" className="text-gray-600 mb-4">
                  We've sent a password reset link to
                </Typography>
                <Typography variant="body1" className="font-medium text-gray-900 mb-6">
                  {email}
                </Typography>
              </div>

              <Button
                fullWidth
                variant="contained"
                href="/login"
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
                Back to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-teal-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card
          className="shadow-2xl"
          sx={{
            borderRadius: "24px",
            backgroundColor: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(15px)",
          }}
        >
          <CardContent className="p-8">
            {/* Header */}
            <div className="flex items-center mb-6">
              <Link href="/login" className="text-gray-600 hover:text-gray-800">
                <ArrowBack />
              </Link>
              <Typography variant="h5" className="font-bold text-gray-900 ml-4">
                Reset Password
              </Typography>
            </div>

            <Typography variant="body1" className="text-gray-600 mb-6">
              Enter your email address and we'll send you a link to reset your password.
            </Typography>

            {/* Email Input */}
            <div className="mb-6">
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
                  },
                }}
              />
            </div>

            {/* Reset Button */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleResetPassword}
              disabled={isLoading || !email}
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
                  Sending...
                </div>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
