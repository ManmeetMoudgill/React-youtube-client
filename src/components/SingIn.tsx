import React, { useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../shell/reudx";
import { useDispatch } from "react-redux";
import { useEventCallback, CircularProgress } from "@mui/material";
import { useApi } from "../shell/hooks/custom-http";
import { UserResponse } from "../models/user";
import { signInSuccess } from "../shell/reudx/slicers/user";
import { HTTP_RESPONSE_STATUS_CODE } from "../constants";
import { createToastError } from "../utils/errors";
const Input = styled.input`
  border: 1px solid #f5f5f5;
  border-radius: 3px;
  padding: 10px;
  margin: 0.3rem 0 0.3rem 0;
  outline: none;
  border: 1px solid whitesmoke;
  background-color: transparent;
  width: 100%;
  color: black;
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
  background-color: #f5f5f5;
  color: #606060;
  transition: background-color 0.5s ease-in;
  &:hover {
    background-color: lightgray;
  }
`;

const FormComponent = styled.form`
  width: 70%;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface SignIn {
  password: string;
  email: string;
}

const signInInitalData = {
  password: "",
  email: "",
};
const SingIn = () => {
  const [signIn, setSignIn] = useState<SignIn>(signInInitalData);

  const dispatch = useDispatch();
  const { user: userSlicer } = useSelector((state: RootState) => state?.user);

  const { makeCall: singInMakeCall, isLoading: singInLoading } =
    useApi<UserResponse>({
      url: "/auth/sign-in",
      method: "post",
      data: {
        email: signIn.email,
        password: signIn.password,
      },
    });

  //login request
  const signInFunc = useEventCallback(async () => {
    try {
      singInMakeCall().then((response) => {
        const user = (response as UserResponse)?.user;
        if (
          response?.status === HTTP_RESPONSE_STATUS_CODE.OK ||
          response?.status === HTTP_RESPONSE_STATUS_CODE.CREATED
        ) {
          dispatch(signInSuccess(user));
          createToastError("Login Successfull", "success");
        } else {
          createToastError("Login failed", "error");
        }
      });
    } catch (err) {
      createToastError("Something went wrong", "error");
    }
  });

  const onChangeSignIn = useEventCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setSignIn({ ...signIn, [name]: value });
    }
  );

  const login = useEventCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!signIn.email || !signIn.password) {
      return createToastError("Please, provide credentials", "error");
    }

    signInFunc();
  });

  return (
    <FormComponent onSubmit={login} autoComplete="on">
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
        <ButtonContainer>
          <Button type="submit">
            Sign in {singInLoading ? <CircularProgress size={15} /> : undefined}
          </Button>
        </ButtonContainer>
      ) : null}
    </FormComponent>
  );
};

export default SingIn;
