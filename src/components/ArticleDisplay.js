import React, { useEffect, useState } from "react";
import Header from "./Header";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getArticleBySlug } from "../api/ArticleByslug";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Comments from "./Comments";
function ArticleDisplay() {
  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 0.02,
        maxWidth: "75vw",
        marginTop: "30px",
      }}
    />
  );
  const { slug } = useParams();
  console.log(slug);
  const [article, setArticle] = useState({
    username: "",
    image: "",
    title: "",
    description: "",
    createdAt: "",
    body: "",
    tagList: [],
  });
  useEffect(() => {
    const getArticle = async () => {
      const data = await getArticleBySlug(slug);
      const {
        author: { username: username, image: image },
        createdAt,
        body,
        title,
        description,
        tagList,
      } = data.article;
      console.log(data.article);
      setArticle({
        username,
        image,
        title,
        description,
        body,
        createdAt,
        tagList,
      });
    };
    getArticle();
  }, []);
  return (
    <>
      <Header />
      <ArticleBanner>
        <h2>{article.title}</h2>
        <Author>
          <img src={article.image} alt="avatar" />
          <div>
            <h4>{article.username}</h4>
            <p>{article.createdAt}</p>
          </div>

          <button>
            {" "}
            <FontAwesomeIcon icon={faEdit} /> Edit Article
          </button>
          <button style={{ borderColor: "#b85c5c", color: "#b85c5c" }}>
            {" "}
            <FontAwesomeIcon icon={faTrashAlt} />
            Delete Article
          </button>
        </Author>
      </ArticleBanner>
      <Body>
        <ArticleBody>{article.body}</ArticleBody>
      </Body>
      <ColoredLine color="gray" />
      <CommentBox>
        <textarea />
        <ButtonBox>
          <button>Post a comment</button>
        </ButtonBox>
      </CommentBox>
      <Comments slug={slug} />
    </>
  );
}
const ArticleBanner = styled.div`
  background: #333;
  color: white;
  padding: 20px;
  > h2 {
    font-size: 30px;
  }
`;
const CommentBox = styled.div`
  margin-top: 75px;
  display: flex;
  flex-direction: column;
  place-items: center;
  > textarea {
    min-width: 50vw;
    min-height: 20vh;
    border: 1px solid #e5e5e5;
  }
`;
const ButtonBox = styled.div`
  border: 1px solid #e5e5e5;
  box-shadow: none !important;
  font-size: 0.8rem;
  font-weight: 300;
  padding: 0.75rem 1.35rem;
  background-color: #f5f5f5;
  min-width: 46vw;
  box-shadow: none !important;
  > button {
    font-weight: 600;
    float: right;
    padding: 0.65rem 0.65rem;
    font-size: 0.775rem;
    border-radius: 0.2rem;
    color: #fff;
    background-color: #5cb85c;
    border-color: #5cb85c;
    border: none;
  }
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 30px;
  max-width: 75vw;
`;
const ArticleBody = styled.div``;
const Author = styled.div`
  display: flex;
  align-items: center;
  > img {
    height: 32px;
    width: 32px;
    border-radius: 30px;
  }
  > div {
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    > h4 {
      font-size: 10px;
      margin: 0px;
    }
    > p {
      font-size: 10px;
      margin-top: 0px;
      margin-right: 1.5rem;
    }
  }
  > button {
    font-size: 0.875rem;
    border-radius: 0.2rem;
    display: inline-block;
    // font-weight: 400;
    font-size: 12px;

    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border: 1px solid transparent;
    color: #ccc;
    background-image: none;
    background-color: transparent;
    border-color: #ccc;
    max-height: fit-content;
  }
`;
export default ArticleDisplay;
