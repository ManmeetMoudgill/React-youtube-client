import styled from "styled-components";
const Container = styled.div`
  display: flex;
  min-width: 100vw;
  margin-top: 3.5rem;
  justify-content: center;
  position: relative;
`;

const VideosWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 7rem;
  padding: 0.5rem 1rem 0.5rem 1.5rem;
  @media (min-width: 320px) and (max-width: 400px) {
    margin-left: 3rem;
  }
  @media (min-width: 401px) and (max-width: 720px) {
    margin-left: 4.5rem;
  }
  @media (min-width: 721px) and (max-width: 1000px) {
    margin-left: 5rem;
  }
  @media (min-width: 1001px) and (max-width: 1200px) {
    margin-left: 5rem;
  }
  @media (min-width: 1201px) and (max-width: 2600px) {
    margin-left: 7rem;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;
  max-width: 100%;
  padding-right: 1rem;
  margin-top: 2rem;
  @media (min-width: 320px) and (max-width: 649px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media (min-width: 650px) and (max-width: 820px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 821px) and (max-width: 1000px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (min-width: 1001px) and (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (min-width: 1201px) and (max-width: 2600px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;
const NotFoundComponent = styled.div`
  position: absolute;
  top: 20%;
  width: 80%;
  padding: 2rem;
  left: 10%;
`;
export { Wrapper, VideosWrapper, Container, NotFoundComponent };
