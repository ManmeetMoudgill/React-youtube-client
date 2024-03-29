import styled from "styled-components";
interface ContainerProps {
  type?: string;
}
interface ImageProps {
  type?: string;
}

interface DetailsProps {
  type?: string;
  isHistoryPageCard?: boolean;
}

interface ChannelImageProps {
  type?: string;
}
const Container = styled.div<ContainerProps>`
  z-index: -1000;
  width: ${(props) => (props?.type === "sm" ? "100%" : "auto")};
  margin-bottom: 1.3rem;
  cursor: pointer;
  display: ${(props) => props?.type === "sm" && "flex"};
  gap: 11px;
`;

const Video = styled.video<ImageProps>`
  width: ${(props) => (props?.type === "sm" ? "80%" : "100%")};
  height: ${(props) => (props?.type === "sm" ? "8.5rem" : "202px")};
  object-fit: cover;
  background-color: #999;
  border-radius: 15px;
  flex: 1;
  @media (min-width: 320px) and (max-width: 650px) {
    height: ${(props) => (props?.type === "sm" ? "8.5rem" : "180px")};
  }
  @media (min-width: 1600px) and (max-width: 4200px) {
    height: ${(props) => (props?.type === "sm" ? "13rem" : "202px")};
  }
`;

const Details = styled.div<DetailsProps>`
  display: flex;
  position: ${(props) => props?.isHistoryPageCard && "relative"};
  margin-top: ${(props) => props?.type !== "sm" && "16px"};
  gap: 12px;
  align-items: flex-start;
  flex: 1;
`;

const ChannelImage = styled.img<ChannelImageProps>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #999;
  display: ${(props) => props?.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  margin: 0px;
  font-weight: 500;
  color: black;
  @media (min-width: 1500px) and (max-width: 4200px) {
    font-size: 20px;
  }
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: #606060;
  margin: 5px 0px;
  @media (min-width: 1500px) and (max-width: 4200px) {
    font-size: 18px;
  }
`;

const Info = styled.div`
  font-size: 14px;
  color: #606060;
  @media (min-width: 1500px) and (max-width: 4200px) {
    font-size: 16px;
  }
`;

export {
  Container,
  Video,
  Details,
  ChannelImage,
  Texts,
  Title,
  ChannelName,
  Info,
};
