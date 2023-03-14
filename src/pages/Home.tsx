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
import debounce from "lodash.debounce";
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
  const { filters, setFilters } = useFilters();

  const { makeCall: getVideos, result } = useApi<VideosResponse>({
    url: `/videos/${type}?page=${filters?.page}`,
    method: "get",
    onBootstrap: false,
  });

  const getVideosMemoizedFn = useCallback(
    (params?: AxiosRequestConfig) => {
      return getVideos(params);
    },
    [getVideos]
  );

  const fetchData = useCallback(async () => {
    //when user clicks on a category, we need to reset the page to 1
    const isSubscriptionPage = type === "sub";
    const category = isSubscriptionPage
      ? ""
      : filters?.tag
      ? `&category=${filters?.tag}` || "&category=all"
      : "";
    const res = await getVideosMemoizedFn({
      url: `/videos/${type}?page=${filters?.page}${category}`,
    });
    if (
      res?.status === HTTP_RESPONSE_STATUS_CODE.OK ||
      res?.status === HTTP_RESPONSE_STATUS_CODE.CREATED
    ) {
      setData((prev) => {
        return filters?.page === 1
          ? res?.videos || []
          : [...prev, ...(res?.videos || [])];
      });
    }
  }, [filters?.page, filters?.tag, getVideosMemoizedFn, type]);

  // memoize the debounced function using useMemo
  const debouncedFetchData = useMemo(
    () => debounce(fetchData, 300),
    [fetchData]
  );

  useEffect(() => {
    debouncedFetchData();
    return () => debouncedFetchData.cancel();
  }, [debouncedFetchData, filters]);

  const videoCards = useMemo(() => {
    return data?.map((item) => {
      return (
        <Card key={item?.video?._id} video={item?.video} user={item?.user} />
      );
    });
  }, [data]);

  const fetchMoreData = useCallback(() => {
    if (result && data?.length > result?.count) return;
    setFilters({
      ...filters,
      page: filters?.page + 1,
    });
  }, [result, data?.length, filters, setFilters]);

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
