import { Edit, Delete } from "@mui/icons-material";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  Box,
  IconButton,
} from "@mui/material";

import { User } from ".";

interface GridViewProps {
  users: User[];
  handleEdit: (user: User) => void;
  handleDelete: (user: User) => void;
}

export const GridView: React.FC<GridViewProps> = ({
  users,
  handleEdit,
  handleDelete,
}) => {
  return (
    <Grid container spacing={3}>
      {users?.map((user) => (
        <Paper
          key={user.id}
          elevation={3}
          sx={{
            textAlign: "center",
            p: 3,
            position: "relative",
            overflow: "hidden",
            transition: "0.3s",
            "&:hover .overlay": {
              opacity: 1,
              pointerEvents: "auto",
            },
            "&:hover .textDim": {
              color: "gray",
            },
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{ width: 80, height: 80, margin: "0 auto", mb: 1 }}
          />
          <Typography className="textDim" fontWeight={600}>
            {user.first_name} {user.last_name}
          </Typography>
          <Typography className="textDim" color="text.secondary">
            {user.email}
          </Typography>

          <Box
            className="overlay"
            sx={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              opacity: 0,
              pointerEvents: "none",
              transition: "0.3s ease-in-out",
            }}
          >
            <IconButton
              sx={{
                backgroundColor: "#7e57c2",
                color: "white",
                "&:hover": { backgroundColor: "#673ab7" },
              }}
              onClick={() => handleEdit(user)}
            >
              <Edit />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: "#ef5350",
                color: "white",
                "&:hover": { backgroundColor: "#d32f2f" },
              }}
              onClick={() => handleDelete(user)}
            >
              <Delete />
            </IconButton>
          </Box>
        </Paper>
      ))}
    </Grid>
  );
};
