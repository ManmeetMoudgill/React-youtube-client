import styled from "styled-components";
const Container = styled.div`
  display: flex;
  padding: 0.5rem;
  @media (min-width: 320px) and (max-width: 500px) {
    flex-direction: column;
    flex: 1;
    padding: 0.5rem;
  }
`;

const LeftContainer = styled.div`
  display: flex;
`;

const RightContainer = styled.div`
  display: flex;
  padding: 0 0.5rem 0 0.5rem;
  @media (min-width: 320px) and (max-width: 500px) {
    padding: 0 0;
    margin-top: 0.5rem;
  }
  flex-direction: column;
`;

const Image = styled.img`
  width: 16rem;
  height: 10rem;
  object-fit: cover;
  background-color: #999;
  border-radius: 15px;
  @media (min-width: 320px) and (max-width: 500px) {
    flex: 1;
    height: 14rem;
  }
`;
const Details = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  flex: 1;
  @media (min-width: 320px) and (max-width: 500px) {
    flex: 1;
  }
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 1.1rem;
  margin: 0px;
  font-weight: 500;
  color: black;
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: #606060;
  margin: 5px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: #606060;
`;

export {
  Container,
  LeftContainer,
  RightContainer,
  Image,
  Details,
  ChannelName,
  Texts,
  Title,
  Info,
};
