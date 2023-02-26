import React, { memo } from "react";
import styled from "styled-components";
import { Comment } from "../models/comment";
import { useApi } from "../shell/hooks/custom-http";
import { UserResponse } from "../models/user";
import { format } from "timeago.js";
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
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

interface CommentProps {
  comment: Comment;
}
const CommentComponent = ({ comment }: CommentProps) => {
  const { result: user } = useApi<UserResponse>({
    url: `/users/find/${comment?.userId}`,
    method: "get",
    onBootstrap: true,
  });
  return (
    <Container>
      <Avatar src={user?.user?.img} />
      <Details>
        <Name>
          {user?.user?.name} <Date>{format(comment?.createdAt)}</Date>
        </Name>
        <Text>{comment?.comment}</Text>
      </Details>
    </Container>
  );
};

export default memo(CommentComponent);
