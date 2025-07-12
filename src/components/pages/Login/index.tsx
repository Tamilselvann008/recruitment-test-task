import React, { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../../../utils/common";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { login } from "../../../redux/slices/authSlice";

type LoginFormInputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error, token } = useAppSelector(
    (state) => state.auth
  );

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

  const onSubmit = (data: LoginFormInputs) => {
    dispatch(login({ email: data.email, password: data.password }));
  };

  // Show success toast and redirect on successful login
  useEffect(() => {
    if (!!(isAuthenticated && token)) {
      showSuccess("Login successful");
      navigate("/users");
    }
  }, [isAuthenticated, token]);

  // Show error toast if login fails
  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error]);

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
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
