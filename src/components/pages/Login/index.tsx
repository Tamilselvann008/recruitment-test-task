import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { AuthService } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../../../utils/common";

type LoginFormInputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginForm: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setLoading(true);
      const response = await AuthService.login({
        email: data.email,
        password: data.password,
      });
      if (response?.status === 201) {
        localStorage.setItem("token", response.data.email);
        showSuccess("Login successful");
          window.location.href = "/users";
          console.log("Login successful:", response);
      }
    } catch (error) {
      setLoading(false);
      showError("Login failed. Please check your credentials.");
      console.error("Login failed:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component={Paper}
        elevation={3}
        p={4}
        mt={10}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
          <Typography variant="h6" gutterBottom textAlign="center">
            Log in
          </Typography>

          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />

          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Remember me"
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, bgcolor: "#2196f3" }}
            loading={loading}
            disabled={loading}
          >
            Log in
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
