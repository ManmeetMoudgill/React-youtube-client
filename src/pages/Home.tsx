import React, { memo, useEffect, useState, useMemo, useCallback } from "react";
import Card from "../components/Card";
import { GetVideosWithUser, VideosResponse } from "../models/video";
import { useApi } from "../shell/hooks/custom-http";
import { NotFound } from "../components/NotFound";
import SideBar from "../components/SideBar";
import CategoriesSroll from "../components/CategoriesSroll";
import { useFilters } from "../shell/providers/filter-provider/filter-provider";
import { filterVideos } from "./utils";
import { HTTP_RESPONSE_STATUS_CODE } from "../constants";
import {
  Wrapper,
  VideosWrapper,
  Container,
  NotFoundComponent,
} from "./styled-components/Home";
interface HomeProps {
  type?: string;
}
const Home = ({ type }: HomeProps) => {
  const [data, setData] = useState<GetVideosWithUser[]>([]);
  const { filters } = useFilters();
  const { makeCall: getVideos, result } = useApi<VideosResponse>({
    url: `/videos/${type}`,
    method: "get",
    onBootstrap: false,
  });

  const getVideosMemoizedFn = useCallback(() => {
    return getVideos();
  }, [getVideos]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getVideosMemoizedFn();
      if (
        res?.status === HTTP_RESPONSE_STATUS_CODE.OK ||
        res?.status === HTTP_RESPONSE_STATUS_CODE.CREATED
      ) {
        setData(res?.videos || []);
      }
    };
    fetchData();
  }, [getVideosMemoizedFn]);

  const filteredData = useMemo(() => {
    return filterVideos({
      data,
      tag: filters?.tag,
    });
  }, [data, filters?.tag]);

  const videoCards = useMemo(() => {
    return filteredData?.map((item) => {
      return (
        <Card key={item?.video?._id} video={item?.video} user={item?.user} />
      );
    });
  }, [filteredData]);

  return (
    <>
      <Container>
        <SideBar />
        <VideosWrapper>
          {type === "random" ? <CategoriesSroll /> : undefined}
          <Wrapper>{filteredData?.length > 0 && videoCards}</Wrapper>
        </VideosWrapper>
      </Container>

      {result && filteredData?.length === 0 ? (
        <NotFoundComponent>
          <NotFound />
        </NotFoundComponent>
      ) : undefined}
    </>
  );
};

export default memo(Home);
