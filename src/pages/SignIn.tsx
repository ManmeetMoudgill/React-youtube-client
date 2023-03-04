import React, { ChangeEvent, memo, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useApi } from "../shell/hooks/custom-http";
import { UserResponse } from "../models/user";
import { useDispatch } from "react-redux";
import { signInSuccess, signUpSuccess } from "../shell/reudx/slicers/user";
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
const Container = styled.div`
  display: flex;
  min-width: 100vw;
  min-height: 100vw;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
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

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

interface SignUp {
  name: string;
  password: string;
  email: string;
}
interface SignIn {
  password: string;
  email: string;
}
const signUpInitalData = {
  name: "",
  password: "",
  email: "",
};

const signInInitalData = {
  password: "",
  email: "",
};
const SignInComponent = () => {
  const [user, setUser] = React.useState<SignUp>(signUpInitalData);
  const [signIn, setSignIn] = React.useState<SignIn>(signInInitalData);

  const dispatch = useDispatch();
  const { user: userSlicer } = useSelector((state: RootState) => state?.user);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (userSlicer) {
      navigate("/");
    }
  }, [userSlicer, navigate]);

  const { makeCall: singInMakeCall, isLoading: singInLoading } =
    useApi<UserResponse>({
      url: "/auth/sign-in",
      method: "post",
      data: {
        email: signIn.email,
        password: signIn.password,
      },
    });

  const { makeCall: singUpMakeCall, isLoading: signUpLoading } =
    useApi<UserResponse>({
      url: "/auth/sign-up",
      method: "post",
      data: {
        email: user.email,
        password: user.password,
        username: user.name,
      },
    });

  const { makeCall: authGoogle, isLoading: googleLoading } =
    useApi<UserResponse>({
      url: "/auth/google-auth",
      method: "post",
    });

  const onChangeSignIn = useEventCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setSignIn({ ...signIn, [name]: value });
    }
  );

  //login request
  const signInFunc = useEventCallback(async () => {
    try {
      singInMakeCall().then((response) => {
        const user = (response as UserResponse)?.user;
        if (response?.status === 200 || response?.status === 201) {
          dispatch(signInSuccess(user));
          toast("Login success", { type: "success" });
        } else {
          toast("Login failed", { type: "error" });
        }
      });
    } catch (err) {
      toast("Something went wrong", { type: "error" });
    }
  });

  //signup
  const signup = useEventCallback(async () => {
    try {
      singUpMakeCall().then((response) => {
        const user = (response as UserResponse)?.user;
        if (response?.status === 200 || response?.status === 201) {
          dispatch(signUpSuccess(user));
          toast("Signup success", { type: "success" });
        } else {
          toast("Signup failed", { type: "error" });
        }
      });
    } catch (err) {
      toast("Something went wrong", { type: "error" });
    }
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
      });
    });
  });

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to LamaTube</SubTitle>
        <Input
          value={signIn?.email}
          onChange={onChangeSignIn}
          name="email"
          placeholder="Email"
        />
        <Input
          value={signIn?.password}
          onChange={onChangeSignIn}
          name="password"
          type="password"
          placeholder="password"
        />
        {!userSlicer ? (
          <Button onClick={signInFunc}>
            Sign in {singInLoading ? <CircularProgress size={15} /> : undefined}
          </Button>
        ) : null}
        <Title>or</Title>
        <Box>
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
        <Input
          value={user?.name}
          onChange={onChange}
          name="name"
          placeholder="username"
        />
        <Input
          value={user?.email}
          onChange={onChange}
          name="email"
          placeholder="email"
        />
        <Input
          type="password"
          value={user?.password}
          onChange={onChange}
          name="password"
          placeholder="password"
        />
        <Button onClick={signup}>
          Sign up
          {signUpLoading ? <CircularProgress size={15} /> : undefined}
        </Button>
      </Wrapper>
    </Container>
  );
};

export default memo(SignInComponent);
