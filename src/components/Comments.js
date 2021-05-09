import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getCommentsBySlug } from "../api/Comments";
import CommentCard from "./CommentCard";

function Comments({ slug }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchComments = async () => {
      const data = await getCommentsBySlug(slug);
      console.log(data);
      setComments(data.comments);
    };
    fetchComments();
  }, []);
  return (
    <CommentContainer>
      {comments.map((comment) => {
        const {
          author: { username: username, image: image },
          body,
          id,
          createdAt,
        } = comment;
        return (
          <CommentCard
            key={id}
            username={username}
            image={image}
            createdAt={createdAt}
            body={body}
          />
        );
      })}
    </CommentContainer>
  );
}

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default Comments;
