import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { MarkFavourite } from "../api/MarkFavourite";
import { getArticleBySlug } from "../api/ArticleByslug";
import { MarkUnFavourite } from "../api/MarkUnFavorite";
import { isFavourite } from "../api/IsFavourite";
import { isUserLoggedIn } from "../features/authentication/signup";
import { useSelector } from "react-redux";

function ArticleCard({
  username,
  image,
  title,
  description,
  createdAt,
  slug,
  favoritesCount,
}) {
  const isLoggedIn = useSelector(isUserLoggedIn);
  const history = useHistory();
  const goToArticle = (slug) => {
    history.push(`/articles/${slug}`);
  };
  const goToProfile = (username) => {
    history.push(`/profile/${username}`);
  };
  const [favorites, setFavorites] = useState(favoritesCount);

  const handlefavorite = async (slug) => {
    if (isLoggedIn === true) {
      const checkFavorite = await isFavourite(slug);
      if (checkFavorite.article.favorited === true) {
        const unFavorite = await MarkUnFavourite(slug);
        console.log(unFavorite);
        setFavorites(unFavorite.article.favoritesCount);
      } else {
        const data = await MarkFavourite(slug);
        setFavorites(data.article.favoritesCount);
      }
    }
  };
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
          <h4 onClick={() => goToProfile(username)}>{username}</h4>
          <p>{createdAt}</p>
        </Author>
        <Like onClick={() => handlefavorite(slug)}>
          <FontAwesomeIcon icon={faHeart} />
          {favorites}
        </Like>
      </AuthorContainer>

      <PostContainer>
        <h2 onClick={() => goToArticle(slug)}>{title}</h2>
        <p onClick={() => goToArticle(slug)}>{description}</p>
        <Link to={`/articles/${slug}`} style={readmore}>
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
  display: flex;
  justify-content: center;
  align-items: center;
  // flex-direction: column;
  color: #5cb85c;
  background-image: none;
  background-color: transparent;
  border-color: #5cb85c;
  font-size: 13px;
  cursor: pointer;
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
    cursor: pointer;
    font-weight: 600 !important;
    font-size: 1.5rem !important;
  }
  > p {
    margin: 0px;
    cursor: pointer;
    font-weight: 300;

    color: #999;
  }
`;
const Author = styled.div`
  max-height: fit-content;
  flex: 0.9;
  margin-top: -5px;
  align-self: flex-start;
  margin-left: 5px;

  > h4 {
    font-size: 15px;
    display: inline-block;
    font-weight: 500 !important;
    margin: 0px;
    color: #5cb85c;
    cursor: pointer;
  }
  > p {
    font-size: 0.7rem;
    margin: 0px;
  }
`;
const readmore = {
  fontSize: "13px",
  marginTop: "20px",
  textDecoration: "none",
  color: "#bbb",
};
export default ArticleCard;
