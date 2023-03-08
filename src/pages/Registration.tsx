import React, { memo, useEffect } from "react";
import styled from "styled-components";
import { useApi } from "../shell/hooks/custom-http";
import { UserResponse } from "../models/user";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../shell/reudx/slicers/user";
import { useSelector } from "react-redux";
import { RootState } from "../shell/reudx";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Button as MuiButton,
  useEventCallback,
} from "@mui/material";
import { auth, googleProvider } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";
import SignUpComponent from "../components/SignUp";
import SignInComponent from "../components/SingIn";
import { createToastError } from "../utils/errors";
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
  border: 1px solid #f5f5f5;
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 18px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const { user: userSlicer } = useSelector((state: RootState) => state?.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (userSlicer) {
      navigate("/");
    }
  }, [userSlicer, navigate]);

  const { makeCall: authGoogle, isLoading: googleLoading } =
    useApi<UserResponse>({
      url: "/auth/google-auth",
      method: "post",
    });

  const signInWithGoogle = useEventCallback(() => {
    signInWithPopup(auth, googleProvider).then((result) => {
      const data = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        img: result?.user?.photoURL,
      };

      authGoogle({
        data,
      }).then((res) => {
        const user = (res as UserResponse)?.user;
        dispatch(signInSuccess(user));
        createToastError("login successfull", "success");
      });
    });
  });

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to LamaTube</SubTitle>
        <SignInComponent />
        <Title>or</Title>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MuiButton
            onClick={signInWithGoogle}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <GoogleIcon /> Sign with Google
            {googleLoading ? <CircularProgress size={15} /> : undefined}
          </MuiButton>
        </Box>
        <Title>or</Title>
        <SignUpComponent />
      </Wrapper>
    </Container>
  );
};

export default memo(RegistrationPage);
