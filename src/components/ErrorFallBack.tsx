import React from "react";
import { Box, Typography, Button } from "@mui/material";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Box textAlign="center">
        <Typography variant="h5" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1" gutterBottom>
          {error.message}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please try again later or contact support if the problem persists.
        </Typography>
        <Box marginTop={4}>
          <Button
            onClick={() => {
              resetErrorBoundary();
            }}
          >
            Try again
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ErrorFallback;
