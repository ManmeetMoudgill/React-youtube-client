import React, { memo, useEffect, useState, useCallback } from "react";
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
  const { makeCall: getVideoBasedOnCategory, result } =
    useApi<TagsBackendResponse>({
      url: `/videos/tags/?tags=${params?.category}`,
      method: "get",
      onBootstrap: false,
    });
  const [data, setData] = useState<Array<VideoType>>([]);

  const getVideoBasedOnCategoryMemoizedFn = useCallback(() => {
    return getVideoBasedOnCategory();
  }, [getVideoBasedOnCategory]);

  useEffect(() => {
    if (!params?.category) return;
    const fetchData = async () => {
      getVideoBasedOnCategoryMemoizedFn().then((res) => {
        if (
          res?.status === HTTP_RESPONSE_STATUS_CODE.OK ||
          res?.status === HTTP_RESPONSE_STATUS_CODE.CREATED
        ) {
          setData(res?.videos);
        }
      });
    };
    fetchData();
  }, [params?.category, getVideoBasedOnCategoryMemoizedFn]);

  return (
    <>
      <Container>
        <SideBar />
        <VideosWrapper>
          <Wrapper>
            {data &&
              data?.length > 0 &&
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
      {result && data?.length === 0 ? (
        <NotFoundComponent>
          <NotFound />
        </NotFoundComponent>
      ) : undefined}
    </>
  );
};

export default memo(Category);
