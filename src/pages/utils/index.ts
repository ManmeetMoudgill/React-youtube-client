import { GetVideosWithUser } from "../../models/video";

interface FilterVideosProps {
  data: GetVideosWithUser[];
  tag: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const filterVideos = ({ data, tag, setPage }: FilterVideosProps) => {
  if (tag && tag !== "all") {
    setPage(1);
    return data?.filter((item) => item.video?.tags?.includes(tag));
  }

  return data;
};
