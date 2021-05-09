import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import ProfileBanner from "./ProfileBanner";
import ArticleCard from "./ArticleCard";
import { getUsername } from "../features/authentication/signup";
import { useSelector } from "react-redux";
import { myArticles } from "../api/myArticles";
import { Favourite } from "../api/favouriteArticle";
import { useHistory } from "react-router-dom";

function Profile() {
  const username = useSelector(getUsername);
  const history = useHistory();
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  useEffect(() => {
    fetchMyArticles();
  }, []);
  const fetchMyArticles = async () => {
    const data = await myArticles(username);

    setArticles(data.articles);
    setArticlesCount(data.articlesCount);
  };

  const fetchFavouriteArticles = async () => {
    const data = await Favourite(username);
    setArticles(data.articles);
    setArticlesCount(data.articlesCount);
  };

  return (
    <>
      <Header />
      <ProfileBanner username={username} />
      <ProfileArticles>
        <NavBar>
          <button onClick={fetchMyArticles}>My Articles</button>
          <button onClick={fetchFavouriteArticles}>Favourite Articles</button>
        </NavBar>
        <ArticlesContainer>
          {articlesCount === 0 ? (
            <p>No articles are here... yet.</p>
          ) : (
            articles.map((article) => {
              const {
                author: { username: username, image: image },
                title,
                description,
                createdAt,
              } = article;
              return (
                <ArticleCard
                  key={article.slug}
                  username={username}
                  image={image}
                  title={title}
                  description={description}
                  createdAt={createdAt}
                  slug={article.slug}
                />
              );
            })
          )}
        </ArticlesContainer>
      </ProfileArticles>
    </>
  );
}

const ProfileArticles = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
`;
const NavBar = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-left: 20vw;
  align-self: flex-start;
  > button {
    display: inline-block;
    border: none;
    outline: none;
    background-color: white;
    border-bottom: 1px solid black;
    margin-right: 5px;
    cursor: pointer;
    color: light gray;
  }
`;
const ArticlesContainer = styled.div``;
export default Profile;
