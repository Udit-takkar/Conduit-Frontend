import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { MarkFavourite } from "../../ApiEndpoints/articles";
import { getArticleBySlug } from "../../ApiEndpoints/articles";
import { MarkUnFavourite } from "../../ApiEndpoints/articles";
import { isFavourite } from "../../ApiEndpoints/articles";
import { isUserLoggedIn } from "../../features/authentication/signup";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

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
  const [isactive, setIsactive] = useState(false);
  const history = useHistory();
  const goToArticle = (slug) => {
    history.push(`/articles/${slug}`);
  };
  const goToProfile = (username) => {
    history.push(`/profile/${username}`);
  };
  const [favorites, setFavorites] = useState(favoritesCount);
  const date = createdAt.split("T")[0];
  useEffect(() => {
    const intializeState = async () => {
      if (isLoggedIn === true) {
        const checkFavorite = await isFavourite(slug);
        // console.log(checkFavorite);
        if (
          checkFavorite &&
          checkFavorite.article &&
          checkFavorite.article.favorited === true
        ) {
          setIsactive(true);
        }
      }
    };

    intializeState();
  }, []);

  const handlefavorite = async (slug) => {
    const checkLike = async () => {
      if (isLoggedIn === true) {
        // const checkFavorite = await isFavourite(slug);
        if (isactive === true) {
          const unFavorite = await MarkUnFavourite(slug);
          console.log(unFavorite);
          setFavorites(unFavorite.article.favoritesCount);
          setIsactive(false);
        } else {
          const data = await MarkFavourite(slug);
          setFavorites(data.article.favoritesCount);
          setIsactive(true);
        }
      }
    };

    if (isLoggedIn === true) {
      if (isactive === false) {
        setFavorites((favoritesCount) => favoritesCount + 1);
        setIsactive(true, checkLike());
      } else {
        setFavorites((favoritesCount) => favoritesCount - 1);
        setIsactive(false, checkLike());
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
          <p>{date}</p>
        </Author>
        <Like
          onClick={() => handlefavorite(slug)}
          style={{
            backgroundColor: isactive ? " #5cb85c" : "transparent",
            color: isactive ? "white" : "#5cb85c",
          }}
        >
          <FontAwesomeIcon style={{ marginRight: "2px" }} icon={faHeart} />
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
  font-family: "Poppins";
`;
const Like = styled.div`
  border: 1px solid black;
  height: 30px;
  width: 30px;
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
  &:hover {
    background-color: green;
    color: white;
  }
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
    font-weight: 800 !important;
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
    font-weight: 700 !important;
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
