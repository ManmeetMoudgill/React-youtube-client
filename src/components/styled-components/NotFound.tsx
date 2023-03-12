import styled from "styled-components";
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;
`;

const Image = styled.img`
  width: 30%;
  height: 30%;
  object-fit: contain;
  @media (min-width: 320px) and (max-width: 500px) {
    display: none;
  }
`;

const NotFound = styled.h3`
  font-size: 3em;
  font-weight: 500;
  @media (min-width: 320px) and (max-width: 350px) {
    font-size: 1rem;
  }
  @media (min-width: 351px) and (max-width: 500px) {
    font-size: 2rem;
  }
`;

const TryAgain = styled.h5`
  font-size: 2rem;
  font-weight: 400;
  @media (min-width: 320px) and (max-width: 500px) {
    font-size: 1rem;
  }
`;

export { Image, NotFound, TryAgain, Container, MainContainer };
