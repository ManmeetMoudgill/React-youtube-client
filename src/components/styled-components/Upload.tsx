import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  border: 2px solid green;
  min-height: 500px;
  z-index: 10000;
  background-color: white;
  color: black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
  font-size: 1.3rem;
`;

const Input = styled.input`
  border: 1px solid #f5f5f5;
  color: black;
  border-radius: 3px;
  padding: 0.5rem;
  border: transparent;
  border: 1px solid whitesmoke;
  outline: none;
  background-color: none;
  z-index: 99999;
`;
const Desc = styled.textarea`
  border: 1px solid #f5f5f5;
  color: black;
  border-radius: 3px;
  padding: 10px;
  outline: none;
  border: 1px solid whitesmoke;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: #f5f5f5;
  color: ${({ theme }) => theme.textSoft};
  &:hover {
    background-color: ${({ theme }) => theme.softHover};
  }
`;
const Label = styled.label`
  font-size: 14px;
`;

export { Container, Wrapper, Close, Title, Input, Desc, Button, Label };
