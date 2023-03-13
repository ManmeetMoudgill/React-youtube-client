import React, { memo, useEffect, useState, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useApi } from "../shell/hooks/custom-http";
import { Video, SearchVideoResponse } from "../models/video";
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

  const { makeCall: getVideosBySearch, result } = useApi<SearchVideoResponse>({
    url: `/videos/search${location?.search}`,
    method: "get",
    onBootstrap: false,
  });

  const getVideosBySearchMemoizedFn = useCallback(() => {
    return getVideosBySearch();
  }, [getVideosBySearch]);

  const [data, setData] = useState<Video[] | undefined>(undefined);
  useEffect(() => {
    getVideosBySearchMemoizedFn().then((res) => {
      if (
        res?.status === HTTP_RESPONSE_STATUS_CODE.OK ||
        res?.status === HTTP_RESPONSE_STATUS_CODE.CREATED
      ) {
        setData(res?.videos);
      }
    });
  }, [location?.search, getVideosBySearchMemoizedFn]);

  const videoCards = useMemo(() => {
    return data?.map((video) => {
      return <Card key={video?._id} video={video} />;
    });
  }, [data]);

  return (
    <>
      <Container>
        <SideBar />
        <VideosWrapper>
          <Wrapper arraylength={data?.length}>
            {data && data?.length > 0 && videoCards}
          </Wrapper>
        </VideosWrapper>
      </Container>
      {result && data?.length === 0 ? (
        <NotFoundComponent>
          <NotFound />
        </NotFoundComponent>
      ) : undefined}
    </>
  );
};

export default memo(Search);
