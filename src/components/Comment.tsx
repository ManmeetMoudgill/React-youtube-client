import React, { memo, useMemo } from "react";
import { Comment } from "../models/comment";
import { useApi } from "../shell/hooks/custom-http";
import { UserResponse } from "../models/user";
import { formatDistanceToNow } from "date-fns";
import {
  Container,
  Avatar,
  Details,
  Name,
  DateComponent,
  Text,
} from "./styled-components/Comment";
interface CommentProps {
  comment: Comment;
}
const CommentComponent = ({ comment }: CommentProps) => {
  const { result: user } = useApi<UserResponse>({
    url: `/users/find/${comment?.userId}`,
    method: "get",
    onBootstrap: true,
  });

  const commentedAt: string = useMemo(() => {
    if (!comment?.comment) return "";
    return formatDistanceToNow(new Date(comment?.createdAt), {
      addSuffix: true,
    });
  }, [comment]);
  return (
    <Container>
      <Avatar src={user?.user?.img} />
      <Details>
        <Name>
          {user?.user?.name} <DateComponent>{commentedAt}</DateComponent>
        </Name>
        <Text>{comment?.comment}</Text>
      </Details>
    </Container>
  );
};

export default memo(CommentComponent);
