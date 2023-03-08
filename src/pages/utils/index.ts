import { Video } from "../../models/video";

interface FilterVideosProps {
  data: Video[];
  tag: string;
}

export const filterVideos = ({ data, tag }: FilterVideosProps) => {
  if (tag && tag !== "all") {
    return data?.filter((item) => item.tags?.includes(tag));
  }

  return data;
};
