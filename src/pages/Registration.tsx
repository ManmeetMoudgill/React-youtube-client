import { memo, useEffect } from "react";
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
import {
  Container,
  Wrapper,
  Title,
  SubTitle,
} from "./styled-components/Registration";
import { HTTP_RESPONSE_STATUS_CODE } from "../constants";
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
        if (
          res?.status === HTTP_RESPONSE_STATUS_CODE.OK ||
          res?.status === HTTP_RESPONSE_STATUS_CODE.CREATED
        ) {
          dispatch(signInSuccess(user));
          createToastError("login successfull", "success");
        }
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
