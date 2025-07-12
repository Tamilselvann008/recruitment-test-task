import { Box, Button, Typography } from "@mui/material";

interface PopupProps {
  onCancel: () => void;
  onconfirm: () => void;
  message: string;
}

export const PopupModel: React.FC<PopupProps> = ({
  onCancel,
  onconfirm,
  message,
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: 3,
        boxShadow: 24,
        zIndex: 1000,
      }}
    >
      <Typography variant="h6" mb={2}>
        Are you sure you want to delete this user?
      </Typography>
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={onconfirm}>
          Delete
        </Button>
      </Box>
    </Box>
  );
};
