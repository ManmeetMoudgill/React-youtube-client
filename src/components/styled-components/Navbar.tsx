import styled from "styled-components";
const Container = styled.div`
  position: fixed;
  width: 100vw;
  z-index: 1000;
  padding: 0 1rem 0 1rem;
  display: flex;
  background-color: white;
  height: 3.5rem;
  @media (min-width: 320px) and (max-width: 400px) {
    padding: 0 0rem 0 0;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex: 1;
  padding-left: 0.5rem;
  align-items: center;
  @media (min-width: 320px) and (max-width: 1000px) {
    flex: 2;
  }
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2;
  @media (min-width: 320px) and (max-width: 700px) {
    display: none;
  }
`;

const YoutubeName = styled.h5`
  display: block;
  font-weight: bold;
  @media (min-width: 320px) and (max-width: 400px) {
    font-size: 0.8rem;
  }
`;
const RightContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 20px;
  @media (min-width: 320px) and (max-width: 400px) {
    padding: 0 15px;
  }
`;
const Search = styled.div`
  width: 70%;
  display: flex;
  position: relative;
  height: 2.5rem;
  overflow-y: hidden;
  margin-left: 20%;
  align-items: center;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 20px;

  @media (min-width: 320px) and (max-width: 820px) {
    width: 85%;
    margin-left: 5%;
  }
  @media (min-width: 803px) and (max-width: 1000px) {
    width: 85%;
    margin-left: 5%;
  }
`;

const Input = styled.input`
  border: none;
  font-size: 1rem;
  background-color: transparent;
  outline: none;
  color: black;
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  @media (min-width: 320px) and (max-width: 520px) {
    font-size: 0.8rem;
    padding: 1px 15px;
  }
  @media (min-width: 521px) and (max-width: 820px) {
    font-size: 0.8rem;
    padding: 3px 15px;
  }
`;
const SignInText = styled.h5`
  color: #3ea6ff;
  font-size: 0.8rem;
  @media (min-width: 320px) and (max-width: 520px) {
    display: none;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
`;

const Img = styled.img`
  height: 1.5rem;
`;
const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

const SideBar = styled.div`
  position: absolute;
  z-index: 9999;
  left: 0;
  top: 0;
  min-height: 100vh;
  overflow-y: auto;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-weight: 500;
  color: black;
  @media (min-width: 320px) and (max-width: 400px) {
    padding-right: 1rem;
  }
`;

const Avatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #999;
  @media (min-width: 320px) and (max-width: 720px) {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const UserName = styled.h5`
  font-size: 1rem;
  @media (min-width: 320px) and (max-width: 1100px) {
    display: none;
  }
`;

const FormComponent = styled.form`
  flex: 1;
`;
export {
  Container,
  LeftContainer,
  RightContainer,
  CenterContainer,
  FormComponent,
  UserName,
  Avatar,
  User,
  SideBar,
  Wrapper,
  Img,
  Logo,
  SignInText,
  Button,
  Input,
  Search,
  YoutubeName,
};
