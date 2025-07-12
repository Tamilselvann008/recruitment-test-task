// UserForm.tsx
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { User } from "../../pages/UserList";
import { UserService } from "../../../services/userServices";
import { showSuccess } from "../../../utils/common";

export interface UserFormData {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: User | null;
  onSuccess?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({
  open,
  onClose,
  initialData,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>();

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset(initialData); // Edit mode
      } else {
        reset(); // Create mode
      }
    }
  }, [open, initialData, reset]);

  const onSubmit = async (formData: User) => {
    try {
      setLoading(true);
      if (initialData?.id) {
        const res = await UserService.update(+initialData?.id, formData);
        if (res.status === 200) {
          showSuccess("User updated successfully");
          onSuccess?.();
        }
      } else {
        const res = await UserService.create(formData);
        if (res.status === 201) {
          showSuccess("User created successfully");
          onSuccess?.();
        }
      }
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initialData?.id ? "Edit User" : "Create New User"}
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" mt={1}>
          <Controller
            name="first_name"
            control={control}
            rules={{ required: "First name required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="First Name"
                margin="normal"
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
              />
            )}
          />
          <Controller
            name="last_name"
            control={control}
            rules={{ required: "Last name required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Last Name"
                margin="normal"
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="avatar"
            control={control}
            rules={{ required: "Profile image link required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Avatar URL"
                margin="normal"
                error={!!errors.avatar}
                helperText={errors.avatar?.message}
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          disabled={loading}
          loading={loading}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;
