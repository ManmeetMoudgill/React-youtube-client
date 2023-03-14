import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import { useHttpLoading } from "../shell/hooks/use-http-loading";
import { LinearProgress } from "@mui/material";
import { memo } from "react";
import "./css/app.css";
import AppRoutes from "../router";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  width:100%
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppContainer = () => {
  return (
    <>
      <Container>
        <BrowserRouter>
          <Main>
            <Navbar />
            <Wrapper>
              <AppRoutes />
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </>
  );
};

export default memo(AppContainer);
