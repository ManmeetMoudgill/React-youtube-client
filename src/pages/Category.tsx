import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useApi } from "../shell/hooks/custom-http";
import { Video, VideosResponse } from "../models/video";
import Card from "../components/Card";
import { NotFound } from "../components/NotFound";
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const Category = () => {
  const params = useParams();
  const { isLoading, makeCall: getVideoBasedOnCategory } =
    useApi<VideosResponse>({
      url: `/videos/tags/?tags=${params?.category}`,
      method: "get",
      onBootstrap: false,
    });
  const [data, setData] = useState<Video[] | undefined>(undefined);

  useEffect(() => {
    if (!params?.category) return;
    getVideoBasedOnCategory().then((res) => {
      if (res?.status === 200 || res?.status === 201) {
        setData(res?.videos);
      }
    });
  }, [params?.category, getVideoBasedOnCategory]);

  return (
    <Container>
      {!isLoading &&
        data &&
        data?.map((video) => {
          return <Card key={video?._id} video={video} />;
        })}
      {!isLoading && data?.length === 0 && <NotFound />}
    </Container>
  );
};

export default memo(Category);
