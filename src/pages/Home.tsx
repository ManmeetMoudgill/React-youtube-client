import React, { memo, useEffect, useState, useMemo } from "react";
import Card from "../components/Card";
import { Video, VideosResponse } from "../models/video";
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
  const [data, setData] = useState<Video[]>([]);
  const { filters } = useFilters();
  const { makeCall: getVideos, isLoading } = useApi<VideosResponse>({
    url: `/videos/${type}`,
    method: "get",
    onBootstrap: false,
  });

  useEffect(() => {
    getVideos().then((res) => {
      if (
        res?.status === HTTP_RESPONSE_STATUS_CODE.OK ||
        res?.status === HTTP_RESPONSE_STATUS_CODE.CREATED
      ) {
        setData(res.videos);
      }
    });
  }, [getVideos]);

  const filteredData = useMemo(() => {
    return filterVideos({
      data,
      tag: filters?.tag,
    });
  }, [data, filters.tag]);

  return (
    <>
      <Container>
        <SideBar />
        <VideosWrapper>
          {type === "random" ? <CategoriesSroll /> : undefined}
          <Wrapper>
            {filteredData &&
              filteredData?.map((video) => {
                return <Card key={video?._id} video={video} />;
              })}
          </Wrapper>
        </VideosWrapper>
      </Container>
      <NotFoundComponent>
        {!isLoading && filteredData?.length === 0 && <NotFound />}
      </NotFoundComponent>
    </>
  );
};

export default memo(Home);
