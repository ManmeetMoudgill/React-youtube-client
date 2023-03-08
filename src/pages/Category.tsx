import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../shell/hooks/custom-http";
import { VideoType } from "../models/video";
import Card from "../components/Card";
import { NotFound } from "../components/NotFound";
import SideBar from "../components/SideBar";
import { HTTP_RESPONSE_STATUS_CODE } from "../constants";
import {
  Container,
  VideosWrapper,
  Wrapper,
  NotFoundComponent,
} from "./styled-components/Category";
import { TagsBackendResponse } from "../components/Recommendation";
const Category = () => {
  const params = useParams();
  const { isLoading, makeCall: getVideoBasedOnCategory } =
    useApi<TagsBackendResponse>({
      url: `/videos/tags/?tags=${params?.category}`,
      method: "get",
      onBootstrap: false,
    });
  const [data, setData] = useState<Array<VideoType>>([]);

  useEffect(() => {
    if (!params?.category) return;
    getVideoBasedOnCategory().then((res) => {
      if (
        res?.status === HTTP_RESPONSE_STATUS_CODE.OK ||
        res?.status === HTTP_RESPONSE_STATUS_CODE.CREATED
      ) {
        setData(res?.videos);
      }
    });
  }, [params?.category, getVideoBasedOnCategory]);

  return (
    <>
      <Container>
        <SideBar />
        <VideosWrapper>
          <Wrapper>
            {!isLoading &&
              data &&
              data?.map((video) => {
                return (
                  <Card
                    key={video?.video?._id}
                    video={video?.video}
                    user={video?.user}
                  />
                );
              })}
          </Wrapper>
        </VideosWrapper>
      </Container>
      <NotFoundComponent>
        {!isLoading && data?.length === 0 && <NotFound />}
      </NotFoundComponent>
    </>
  );
};

export default memo(Category);
