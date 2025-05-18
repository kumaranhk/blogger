import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { colors } from "../../constants/constants";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/auth/login", formData);
      login(res.data.user);
      localStorage.setItem("token", res.data.token);
      toast.success(res.data?.message || "User logged in successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, border: "2px solid black", py: 5, px: 5 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
        </Box>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            loading={loading}
            sx={{ mt: 2, padding: 1.5, backgroundColor: colors.primary }}
          >
            Login
          </Button>
        </form>
        <Box sx={{ mt: 5 }}>
          <Typography
            component={Link}
            sx={{ textDecoration: "underline" }}
            to={"/signup"}
          >
            Sign Up here!
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
