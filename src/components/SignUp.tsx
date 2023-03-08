import React, { ChangeEvent, memo } from "react";
import { useDispatch } from "react-redux";
import { useApi } from "../shell/hooks/custom-http";
import { useEventCallback, CircularProgress } from "@mui/material";
import { UserResponse } from "../models/user";
import { signUpSuccess } from "../shell/reudx/slicers/user";
import { HTTP_RESPONSE_STATUS_CODE } from "../constants";
import { createToastError } from "../utils/errors";
import {
  FormComponent,
  Input,
  Button,
  ButtonContainer,
} from "./styled-components/SignUp";
const signUpInitalData = {
  name: "",
  password: "",
  email: "",
};

interface SignUp {
  name: string;
  password: string;
  email: string;
}

const SignUp = () => {
  const [user, setUser] = React.useState<SignUp>(signUpInitalData);

  const dispatch = useDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  //signup
  const signup = useEventCallback(async () => {
    try {
      singUpMakeCall().then((response) => {
        const user = (response as UserResponse)?.user;
        if (
          response?.status === HTTP_RESPONSE_STATUS_CODE.OK ||
          response?.status === HTTP_RESPONSE_STATUS_CODE.CREATED
        ) {
          dispatch(signUpSuccess(user));
          createToastError("Signup Successfull", "success");
        } else {
          createToastError("Signup failed", "error");
        }
      });
    } catch (err) {
      createToastError("Something went wrong", "error");
    }
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

  const registar = useEventCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user.email || !user.password || !user?.name) {
      return createToastError("Please, provide credentials", "warning");
    }

    signup();
  });

  return (
    <FormComponent onSubmit={registar} autoComplete="on">
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
      <ButtonContainer>
        <Button type="submit">
          Sign up
          {signUpLoading ? <CircularProgress size={15} /> : undefined}
        </Button>
      </ButtonContainer>
    </FormComponent>
  );
};

export default memo(SignUp);
