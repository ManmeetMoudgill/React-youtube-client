import styled from "styled-components";

const FormComponent = styled.form`
  width: 70%;
  @media (min-width: 320px) and (max-width: 720px) {
    width: 100%;
  }
`;

const Input = styled.input`
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

export { FormComponent, Input, Button, ButtonContainer };
