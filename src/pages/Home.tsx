import React, { memo } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { VideosResponse } from "../models/video";
import { useApi } from "../shell/hooks/custom-http";
import { Box, Typography } from "@mui/material";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
`;

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

interface HomeProps {
  type?: string;
}
const Home = ({ type }: HomeProps) => {
  const { result: data } = useApi<VideosResponse>({
    url: `/videos/${type}`,
    method: "get",
    onBootstrap: true,
  });

  return (
    <>
      <Container>
        {(data as VideosResponse)?.videos &&
          (data as VideosResponse)?.videos?.map((video) => {
            return <Card key={video?._id} video={video} />;
          })}
      </Container>
      {(data as VideosResponse)?.videos &&
        (data as VideosResponse)?.videos?.length === 0 && (
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
                  No Videos Found
                </Typography>
              </Box>
            </Box>
          </>
        )}
    </>
  );
};

export default memo(Home);
