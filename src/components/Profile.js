import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import ProfileBanner from "./ProfileBanner";
import ArticleCard from "./ArticleCard";
import { getUsername } from "../features/authentication/signup";
import { useSelector } from "react-redux";
import { myArticles } from "../api/myArticles";
import { Favourite } from "../api/favouriteArticle";
import { useHistory, useParams } from "react-router-dom";
import Pagination from "./Pagination";
import Skeleton from "react-loading-skeleton";
import Loader from "react-loader-spinner";

function Profile() {
  const { username } = useParams();
  const history = useHistory();

  const LoggedInUsername = useSelector(getUsername);
  console.log(LoggedInUsername, username);

  const fetchMyArticles = async (page) => {
    const data = await myArticles(page, username);
    setArticles(data.articles);
    setArticlesCount(data.articlesCount);
    setActiveTab({ getArticles: fetchMyArticles, tabName: "My Articles" });
    setLoading(false);
  };

  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [activeTab, setActiveTab] = useState({
    getArticles: fetchMyArticles,
    tabName: "My Articles",
  });
  const [isLoading, setLoading] = useState(true);

  const fetchFavouriteArticles = async (page) => {
    const data = await Favourite(page, username);

    setArticles(data.articles);
    setArticlesCount(data.articlesCount);
    setActiveTab({
      getArticles: fetchFavouriteArticles,
      tabName: "Favourite Articles",
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchMyArticles(1);
  }, [username]);

  return (
    <>
      <Header />
      <ProfileBanner username={username} LoggedInUsername={LoggedInUsername} />
      <ProfileArticles>
        <NavBar>
          <button
            className={activeTab.tabName === "My Articles" ? "active" : null}
            onClick={fetchMyArticles}
          >
            {LoggedInUsername === username ? (
              <p>My Articles</p>
            ) : (
              <p>{username} Articles</p>
            )}
          </button>
          <button
            className={activeTab.tabName === "My Articles" ? null : "active"}
            onClick={fetchFavouriteArticles}
          >
            Favourite Articles
          </button>
        </NavBar>
        <ArticlesContainer>
          {articlesCount === 0 ? (
            <>
              {isLoading === true ? (
                <Loader
                  type="TailSpin"
                  color="#5cb85c"
                  height={80}
                  width={80}
                  style={{ marginTop: "50px" }}
                />
              ) : (
                <p>No articles are here... yet.</p>
              )}
            </>
          ) : (
            // <Skeleton height={50} width={830} />
            articles.map((article) => {
              const {
                author: { username, image },
                title,
                description,
                createdAt,
                favoritesCount,
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
                  favoritesCount={favoritesCount}
                />
              );
            })
          )}
        </ArticlesContainer>
        <Pagination
          articlesCount={articlesCount}
          getPageArticles={activeTab.getArticles}
          tabName={activeTab.tabName}
          Component="Profile"
        />
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
  color: #aaa;
  > button {
    display: inline-block;
    border: none;
    outline: none;
    background-color: white;
    margin-right: 5px;
    cursor: pointer;
    color: #aaa;
  }
  .active {
    border-bottom: 1px solid green;
    color: green;
  }
`;
const ArticlesContainer = styled.div``;
export default Profile;
