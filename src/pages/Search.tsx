import React, { memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useApi } from "../shell/hooks/custom-http";
import { VideosResponse } from "../models/video";
import Card from "../components/Card";
import { Box, Button, Typography } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const Search = () => {
  const location = useLocation();

  const { result: data } = useApi<VideosResponse>({
    url: `/videos/search${location?.search}`,
    method: "get",
    onBootstrap: true,
  });

  const navigate = useNavigate();
  return (
    <Container>
      {data?.videos?.length === 0 && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">No videos found</Typography>
            <Button onClick={() => navigate("/")}>Return to home</Button>
          </Box>
        </>
      )}
      {data?.videos?.map((video) => {
        return <Card key={video?._id} video={video} />;
      })}
    </Container>
  );
};

export default memo(Search);
