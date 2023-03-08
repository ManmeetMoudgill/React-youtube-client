import React, { ChangeEvent, memo } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useApi } from "../shell/hooks/custom-http";
import { useEventCallback, CircularProgress } from "@mui/material";
import { UserResponse } from "../models/user";
import { toast } from "react-toastify";
import { signUpSuccess } from "../shell/reudx/slicers/user";
const FormComponent = styled.form`
  width: 70%;
`;

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
      return toast("Please, provide credentials", { type: "warning" });
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
