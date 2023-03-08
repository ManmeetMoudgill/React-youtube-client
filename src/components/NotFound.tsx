import { Box, Typography } from "@mui/material";
import { Image } from "./styled-components/NotFound";
export const NotFound = () => {
  return (
    <>
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "3rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Image src="/images/no-data-found.webp" />
            <Typography
              variant="h6"
              sx={{
                marginTop: "2rem",
              }}
            >
              No Data Found
            </Typography>
          </Box>
        </Box>
      </>
    </>
  );
};
