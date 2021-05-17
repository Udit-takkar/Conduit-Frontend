import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ArticleCard from "./components/ArticleCard";
import { NavLink } from "react-router-dom";
import {
  fetchFeedArticles,
  fetchGlobalArticles,
  getArticles,
  navItems,
  getArticlesCount,
  loading,
  activeItem,
} from "./features/articles/articleSlice";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import { isUserLoggedIn } from "./features/authentication/signup";
import Pagination from "./components/Pagination";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(isUserLoggedIn);
  const getActiveItem = useSelector(activeItem);
  const isLoading = useSelector(loading);
  let NavItems = useSelector(navItems);

  const articles = useSelector(getArticles);
  const articlesCount = useSelector(getArticlesCount);

  const [activeTab, setActiveTab] = useState({
    getPageArticles: fetchGlobalArticles,
  });

  // Checks which tab to show depending if user has logged in or not
  const checkNav = (NavItem) => {
    if (isLoggedIn === false && NavItem === "Your Feed") {
      return false;
    } else return true;
  };

  NavItems = NavItems.filter(checkNav);

  useEffect(() => {
    const getInitalArticles = async () => {
      await dispatch(fetchGlobalArticles(1));
    };
    getInitalArticles();
  }, []);

  const handleFeed = async (item) => {
    if (item === "Global Feed") {
      await dispatch(fetchGlobalArticles(1));
      setActiveTab({
        getPageArticles: fetchGlobalArticles,
      });
    } else {
      await dispatch(fetchFeedArticles(1));
      setActiveTab({
        getPageArticles: fetchFeedArticles,
      });
    }
  };

  return (
    <>
      <NavBar>
        {NavItems.map((item) => {
          return (
            <button
              className={getActiveItem === item ? "active" : null}
              key={item}
              onClick={() => handleFeed(item)}
            >
              {item}
            </button>
          );
        })}
      </NavBar>
      <AppContainer>
        <ArticlesContainer>
          {console.count()}
          {articlesCount === 0 && isLoading === false ? (
            <p>No articles are here... yet.</p>
          ) : (
            articles.map((article) => {
              const {
                author: { username, image },
                title,
                description,
                favoritesCount,
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
                  favoritesCount={favoritesCount}
                  slug={article.slug}
                />
              );
            })
          )}
        </ArticlesContainer>
        <Pagination
          articlesCount={articlesCount}
          getPageArticles={activeTab.getPageArticles}
          tabName={getActiveItem}
          Component="Home"
        />
      </AppContainer>
    </>
  );
}
const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const NavBar = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-left: 5rem;
  > button {
    display: inline-block;
    border: none;
    outline: none;
    background-color: white;
    // border-bottom: 1px solid black;
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
export default App;
