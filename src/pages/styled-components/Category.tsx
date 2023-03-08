import styled from "styled-components";
const Container = styled.div`
  display: flex;
  min-width: 100vw;
  margin-top: 2.5rem;
  justify-content: center;
  position: relative;
`;
const VideosWrapper = styled.div`
  display: flex;
  flex: 1;
  margin-left: 7rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  @media (min-width: 320px) and (max-width: 400px) {
    margin-left: 3rem;
  }
  @media (min-width: 401px) and (max-width: 720px) {
    margin-left: 4.5rem;
    padding: 0.5rem 1rem 0.5rem 0.2rem;
  }
  @media (min-width: 721px) and (max-width: 1000px) {
    margin-left: 5rem;
    padding: 0.5rem 1rem 0.5rem 0.2rem;
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
  max-width: 100%;
  padding-right: 1rem;
  margin-top: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  @media (min-width: 320px) and (max-width: 500px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;

const NotFoundComponent = styled.div`
  position: absolute;
  top: 20%;
  left: 10%;
`;

export { Container, VideosWrapper, Wrapper, NotFoundComponent };
