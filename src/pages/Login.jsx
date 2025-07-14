import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login, setUserSession } from "../utils/auth";
import CustomSnackbar from "../components/common/CustomSnackbar";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Breakpoints
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // phones
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // tablets

  // States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Login Handler
  const handleLogin = () => {
    if (login(username, password)) {
      setUserSession();
      setSnackbar({
        open: true,
        message: "✅ Login successful!",
        severity: "success",
      });
      navigate('/');
    } else {
      setSnackbar({
        open: true,
        message: "❌ Invalid credentials. Try admin / admin123",
        severity: "error",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: "#eaeff1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 1,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: isXs ? "100%" : isSm ? "70%" : 400,
          maxWidth: 450,
          p: isXs ? 3 : 4,
          borderRadius: 3,
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          background: "linear-gradient(to bottom right, #fff, #f9f9f9)",
        }}
      >
        <Typography
          variant={isXs ? "h5" : "h4"}
          textAlign="center"
          mb={3}
          fontWeight={600}
          color="primary"
        >
          Admin Login
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Hints for demo/testing */}
        <Typography
          variant="caption"
          sx={{ mt: 1, ml: 0.5, color: "text.secondary" }}
        >
          Hint: Username: <strong>Admin</strong>, Password:{" "}
          <strong>Admin@123</strong>
        </Typography>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 3,
            py: 1.3,
            fontWeight: "bold",
            borderRadius: 2,
          }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>

      {/* Snackbar for success/error */}

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default Login;
