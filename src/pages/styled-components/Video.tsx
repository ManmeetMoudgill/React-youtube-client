import styled from "styled-components";
const Container = styled.div`
  display: flex;
  min-width: 100vw;
  margin-top: 3.5rem;
  padding: 2rem 2rem;
  justify-content: center;
  position: relative;
  gap: 1.5rem;
  @media (min-width: 320px) and (max-width: 950px) {
    display: flex;
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: black;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 320px) and (max-width: 750px) {
    padding: 0.5rem;
  }
`;

const Info = styled.span`
  color: #606060;
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: black;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  @media (min-width: 320px) and (max-width: 450px) {
    font-size: 0;
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid #f5f5f5;
`;

const Channel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const Image = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  @media (min-width: 320px) and (max-width: 750px) {
    display: none;
  }
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.8rem;
  @media (min-width: 320px) and (max-width: 750px) {
    margin-left: 0rem;
  }
  color: black;
`;

const ChannelName = styled.span`
  font-weight: 500;
  font-size: 1.2rem;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: #606060;
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 1rem;
  @media (min-width: 320px) and (max-width: 750px) {
    font-size: 0.8rem;
  }
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  position: relative;
  right: 0.2rem;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  font-size: 0.8rem;
  width: 9rem;
  text-align: center;
  padding: 10px 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  @media (min-width: 320px) and (max-width: 750px) {
    min-width: 7rem;
    margin-right: 0.5rem;
  }
  &:hover {
    background-color: #b31a00;
  }
`;

const VideoFrame = styled.video`
  max-height: 100vh-20vh;
  width: 100%;
  object-fit: cover;
`;

const ReccomendationContainer = styled.div`
  display: flex;
  flex: 3;
`;

const ChannelInfoLeftContainer = styled.div`
  display: flex;
`;

const ChannelInfoRightContainer = styled.div`
  display: flex;
`;
export {
  ReccomendationContainer,
  VideoFrame,
  VideoWrapper,
  Subscribe,
  Channel,
  ChannelCounter,
  ChannelDetail,
  ChannelInfo,
  ChannelName,
  Image,
  Hr,
  Description,
  Details,
  Info,
  Buttons,
  Button,
  Container,
  Content,
  Title,
  ChannelInfoLeftContainer,
  ChannelInfoRightContainer,
};
