import React, { memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useApi } from "../shell/hooks/custom-http";
import { Video, VideosResponse } from "../models/video";
import Card from "../components/Card";
import { NotFound } from "../components/NotFound";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const Search = () => {
  const location = useLocation();

  const { makeCall: getVideosBySearch } = useApi<VideosResponse>({
    url: `/videos/search${location?.search}`,
    method: "get",
    onBootstrap: false,
  });

  const [data, setData] = useState<Video[] | undefined>(undefined);
  useEffect(() => {
    getVideosBySearch().then((res) => {
      if (res?.status === 200 || res?.status === 201) {
        setData(res?.videos);
      }
    });
  }, [location?.search, getVideosBySearch]);

  return (
    <Container>
      {data?.length === 0 && <NotFound />}
      {data?.map((video) => {
        return <Card key={video?._id} video={video} />;
      })}
    </Container>
  );
};

export default memo(Search);
