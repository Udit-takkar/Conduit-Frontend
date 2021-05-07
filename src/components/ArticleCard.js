import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function ArticleCard({ username, image, title, description, createdAt }) {
  return (
    <ArticleCardContainer>
      <AuthorContainer>
        <div>
          <img
            style={{ height: "32px", width: "32px", borderRadius: "30px" }}
            src={image}
            alt="avatar"
          />
        </div>
        <Author>
          <h4>{username}</h4>
          <p>{createdAt}</p>
        </Author>
        <Like></Like>
      </AuthorContainer>

      <PostContainer>
        <h2>{title}</h2>
        <p>{description}</p>
        <Link to="/" style={readmore}>
          Read More
        </Link>
      </PostContainer>
    </ArticleCardContainer>
  );
}
const ArticleCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  max-width: fit-content;
`;
const Like = styled.div`
  border: 1px solid black;
  height: 25px;
  width: 25px;
`;
const AuthorContainer = styled.div`
  display: flex;
  min-width: 60vw;
`;
const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 60vw;
  margin-bottom: 20px;

  > h2 {
    margin: 0px;
  }
  > p {
    margin: 0px;
  }
`;
const Author = styled.div`
  max-height: fit-content;
  flex: 0.9;
  margin-top: -5px;
  align-self: flex-start;
  margin-left: 5px;

  > h4 {
    font-size: 10px;
    display: inline-block;

    margin: 0px;
  }
  > p {
    font-size: 10px;
    margin: 0px;
  }
`;
const readmore = {
  fontSize: "10px",
  marginTop: "10px",
  textDecoration: "none",
  color: "#bbb",
};
export default ArticleCard;
