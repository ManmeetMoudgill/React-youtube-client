import { GetVideosWithUser } from "../../models/video";

interface FilterVideosProps {
  data: GetVideosWithUser[];
  tag: string;
}

export const filterVideos = ({ data, tag }: FilterVideosProps) => {
  if (tag && tag !== "all") {
    return data?.filter((item) => item.video?.tags?.includes(tag));
  }

  return data;
};
