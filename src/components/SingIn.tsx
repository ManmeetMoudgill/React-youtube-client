import React, { useState, memo, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../shell/reudx";
import { useDispatch } from "react-redux";
import { useEventCallback, CircularProgress } from "@mui/material";
import { useApi } from "../shell/hooks/custom-http";
import { UserResponse } from "../models/user";
import { signInSuccess } from "../shell/reudx/slicers/user";
import { HTTP_RESPONSE_STATUS_CODE } from "../constants";
import { createToastError } from "../utils/errors";
import {
  Input,
  Button,
  FormComponent,
  ButtonContainer,
} from "./styled-components/SignIn";

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
      url: "/auth/sign-",
      method: "post",
      data: {
        email: signIn.email,
        password: signIn.password,
      },
    });

  //login request
  const signInFunc = useEventCallback(async () => {
    singInMakeCall().then((response) => {
      const user = (response as UserResponse)?.user;
      if (
        response?.status === HTTP_RESPONSE_STATUS_CODE.OK ||
        response?.status === HTTP_RESPONSE_STATUS_CODE.CREATED
      ) {
        dispatch(signInSuccess(user));
        createToastError("Login Successfull", "success");
      }
    });
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

export default memo(SingIn);
