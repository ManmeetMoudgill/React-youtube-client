import { Image, TryAgain } from "./styled-components/NotFound";
import {
  NotFound as NotFoundData,
  Container,
  MainContainer,
} from "./styled-components/NotFound";
export const NotFound = () => {
  return (
    <>
      <MainContainer>
        <Container>
          <Image src="/images/no-data-found.webp" />
          <NotFoundData>No Result Found</NotFoundData>
          <TryAgain>Try Again Later</TryAgain>
        </Container>
      </MainContainer>
    </>
  );
};
