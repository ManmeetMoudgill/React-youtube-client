import styled from "styled-components";
const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: black;
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const DateComponent = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #606060;
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

export { Container, Avatar, Details, Name, DateComponent, Text };
