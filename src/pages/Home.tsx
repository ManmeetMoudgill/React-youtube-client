import React, { memo, useEffect, useState, useMemo, useCallback } from "react";
import Card from "../components/Card";
import { GetVideosWithUser, VideosResponse } from "../models/video";
import { useApi } from "../shell/hooks/custom-http";
import { NotFound } from "../components/NotFound";
import SideBar from "../components/SideBar";
import CategoriesSroll from "../components/CategoriesSroll";
import { useFilters } from "../shell/providers/filter-provider/filter-provider";
import { HTTP_RESPONSE_STATUS_CODE } from "../constants";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  Wrapper,
  VideosWrapper,
  Container,
  NotFoundComponent,
} from "./styled-components/Home";
import { AxiosRequestConfig } from "axios";
import { Typography } from "@mui/material";
interface HomeProps {
  type?: string;
}
const Home = ({ type }: HomeProps) => {
  const [data, setData] = useState<GetVideosWithUser[]>([]);
  const { filters } = useFilters();
  const [page, setPage] = useState<number>(1);

  const { makeCall: getVideos, result } = useApi<VideosResponse>({
    url: `/videos/${type}?page=${page}&category=${filters?.tag || "all"}`,
    method: "get",
    onBootstrap: false,
  });

  const getVideosMemoizedFn = useCallback(
    (params?: AxiosRequestConfig) => {
      return getVideos(params);
    },
    [getVideos]
  );

  useEffect(() => {
    const fetchData = async () => {
      const res = await getVideosMemoizedFn({
        url: `/videos/${type}?page=${page}&category=${filters?.tag || "all"}`,
      });
      if (
        res?.status === HTTP_RESPONSE_STATUS_CODE.OK ||
        res?.status === HTTP_RESPONSE_STATUS_CODE.CREATED
      ) {
        setData((prev) => {
          return page === 1
            ? res?.videos || []
            : [...prev, ...(res?.videos || [])];
        });
      }
    };
    fetchData();
  }, [getVideosMemoizedFn, type, filters?.tag, page]);

  const videoCards = useMemo(() => {
    return data?.map((item) => {
      return (
        <Card key={item?.video?._id} video={item?.video} user={item?.user} />
      );
    });
  }, [data]);

  const fetchMoreData = useCallback(() => {
    if (result && data?.length > result?.count) return;
    setPage((prev) => prev + 1);
  }, [result, data?.length]);

  return (
    <>
      <Container>
        <SideBar />
        <VideosWrapper>
          {type === "random" ? <CategoriesSroll /> : undefined}
          {result && (
            <InfiniteScroll
              dataLength={data?.length || 0}
              next={fetchMoreData}
              hasMore={data?.length < result?.count}
              loader={<Typography>Loading...</Typography>}
            >
              <Wrapper>{data?.length > 0 && videoCards}</Wrapper>
            </InfiniteScroll>
          )}
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

export default memo(Home);
