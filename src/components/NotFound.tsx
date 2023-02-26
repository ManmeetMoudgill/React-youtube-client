import { Box, Typography } from "@mui/material";
import styled from "styled-components";

const Image = styled.img`
  width: 30%;
  height: 30%;
  object-fit: contain;
  transform: translateZ(0);
  animation: animateDown infinite  1.5s;
  @keyframes animateDown {
    0% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(-20px, 0);
    }
    50% {
      transform: translate(-20px, 20px);
    }
    100% {
      transform: translate(0, 20px);
    }
`;
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
