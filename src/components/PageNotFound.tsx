import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        textAlign: "center",
      }}
    >
      <Typography variant="h4">404 - Not Found</Typography>
      <Typography variant="h6">
        The page you're looking for was not found.
      </Typography>
      <Typography variant="h6">
        <Link to="/">Go to home</Link>
      </Typography>
    </Box>
  );
}
