import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
  dataLength: number;
  next: () => void;
  hasMore: boolean;
  loader: React.ReactNode;
  children: React.ReactNode;
};

const InfiniteScrollComponent = ({
  dataLength,
  next,
  hasMore,
  loader,
  children,
}: Props) => {
  return (
    <InfiniteScroll
      dataLength={dataLength || 0}
      next={next}
      hasMore={hasMore}
      loader={loader}
    >
      {dataLength > 0 && children}
    </InfiniteScroll>
  );
};

export default InfiniteScrollComponent;
