import React, { memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useApi } from "../shell/hooks/custom-http";
import { Video, VideosResponse } from "../models/video";
import Card from "../components/Card";
import { NotFound } from "../components/NotFound";
import SideBar from "../components/SideBar";
import { HTTP_RESPONSE_STATUS_CODE } from "../constants";
import {
  Container,
  Wrapper,
  VideosWrapper,
  NotFoundComponent,
} from "./styled-components/Search";
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
      if (
        res?.status === HTTP_RESPONSE_STATUS_CODE.OK ||
        res?.status === HTTP_RESPONSE_STATUS_CODE.CREATED
      ) {
        setData(res?.videos);
      }
    });
  }, [location?.search, getVideosBySearch]);

  return (
    <>
      <Container>
        <SideBar />
        <VideosWrapper>
          <Wrapper arraylength={data?.length}>
            {data?.map((video) => {
              return <Card key={video?._id} video={video} />;
            })}
          </Wrapper>
        </VideosWrapper>
      </Container>
      <NotFoundComponent>
        {data?.length === 0 && <NotFound />}
      </NotFoundComponent>
    </>
  );
};

export default memo(Search);
