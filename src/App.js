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
} from "./features/articles/articleSlice";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import { isUserLoggedIn } from "./features/authentication/signup";

function App() {
  const isLoggedIn = useSelector(isUserLoggedIn);
  const checkNav = (NavItem) => {
    if (isLoggedIn === false && NavItem === "Your Feed") {
      return false;
    } else return true;
  };

  const dispatch = useDispatch();

  const isLoading = useSelector(loading);
  let NavItems = useSelector(navItems);
  NavItems = NavItems.filter(checkNav);

  const articles = useSelector(getArticles);
  const articlesCount = useSelector(getArticlesCount);

  useEffect(() => {
    const getInitalArticles = async () => {
      await dispatch(fetchGlobalArticles());
    };
    getInitalArticles();
  }, []);

  const handleFeed = async (item) => {
    if (item === "Global Feed") {
      await dispatch(fetchGlobalArticles());
    } else {
      await dispatch(fetchFeedArticles());
    }
  };

  return (
    <>
      <NavBar>
        {NavItems.map((item) => {
          return (
            <button key={uuid()} onClick={() => handleFeed(item)}>
              {item}
            </button>
          );
        })}
      </NavBar>
      <AppContainer>
        <ArticlesContainer>
          {articlesCount === 0 && isLoading === false ? (
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
                />
              );
            })
          )}
        </ArticlesContainer>
      </AppContainer>
    </>
  );
}
const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NavBar = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-left: 3rem;
  > button {
    display: inline-block;
    border: none;
    outline: none;
    background-color: white;
    border-bottom: 1px solid black;
    margin-right: 5px;
    cursor: pointer;
  }
`;
const ArticlesContainer = styled.div``;
export default App;
