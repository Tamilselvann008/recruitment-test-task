import React from "react";
import { Box, CircularProgress } from "@mui/material";

interface LoaderProps {
  height?: string;
}

export const Loader: React.FC<LoaderProps> = ({ height = "100vh" }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={height}
    >
      <CircularProgress />
    </Box>
  );
};
