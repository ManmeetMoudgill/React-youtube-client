import styled from "styled-components";
const Container = styled.div`
  display: flex;
  min-width: 100vw;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  top: 2rem;
  background-color: white;
  justify-content: center;
  border: 1px solid #f5f5f5;
  padding: 20px 50px;
  gap: 10px;
  @media (min-width: 320px) and (max-width: 720px) {
    border: none;
  }
`;

const Title = styled.h1`
  font-size: 18px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

export { Container, Wrapper, Title, SubTitle };
