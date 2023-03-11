import styled from "styled-components";

const Container = styled.div`
  background-color: white;
  min-height: 100vh;
  color: black;
  position: fixed;
  font-size: 14px;
  max-width: 250px;
  overflow-y: auto;
  transition: opacity 0.5s ease-in;
  animation: slide-in 0.5s ease-in;
  @keyframes slide-in {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  &.hide {
    animation: slide-out 0.5s ease-in;
  }
  @keyframes slide-out {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-100%);
    }
  }
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: #f5f5f5;
    border-radius: 0.4rem;
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid #f5f5f5;
`;

const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const WrapperYoutube = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0rem 0 1rem 0rem;
`;

export {
  Container,
  Wrapper,
  Logo,
  Img,
  Item,
  Hr,
  Login,
  Button,
  Title,
  WrapperYoutube,
};
