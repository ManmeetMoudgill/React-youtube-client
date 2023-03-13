import { Image, TryAgain } from "./styled-components/NotFound";
import {
  NotFound as NotFoundData,
  Container,
  MainContainer,
} from "./styled-components/NotFound";
interface NotFoundProps {
  text?: string;
}
export const NotFound = ({ text }: NotFoundProps) => {
  return (
    <>
      <MainContainer>
        <Container>
          <Image src="/images/no-data-found.webp" />
          <NotFoundData>{text || "No Result Found"}</NotFoundData>
          <TryAgain>Try Again Later</TryAgain>
        </Container>
      </MainContainer>
    </>
  );
};
