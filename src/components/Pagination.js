import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { navItems } from "../features/articles/articleSlice";
import { fetchArticlesByTag } from "../features/articles/articleSlice";

function Pagination({ articlesCount, getPageArticles }) {
  const dispatch = useDispatch();
  const tabs = useSelector(navItems);
  const NumberOfPages = [];
  const [isActive, setIsActive] = useState(1);
  for (let i = 1; i <= Math.ceil(articlesCount / 10); ++i) {
    NumberOfPages.push(i);
  }
  const handlePages = async (page) => {
    setIsActive(page);
    if (tabs.length !== 3) {
      await dispatch(getPageArticles(page));
    } else {
      console.log(tabs[2], page);
      await dispatch(fetchArticlesByTag({ page, tag: tabs[2] }));
    }
  };
  return (
    <PageContainer>
      {NumberOfPages.map((page) => (
        <PagesBox
          key={page}
          onClick={() => handlePages(page)}
          style={{
            backgroundColor: isActive === page ? "#5cb85c" : "white",
            color: isActive === page ? "white" : "black",
          }}
        >
          {page}
        </PagesBox>
      ))}
    </PageContainer>
  );
}
const PageContainer = styled.div`
  max-width: 70vw;
  margin-left: 40px;
`;
const PagesBox = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  margin-left: 0;
  border-bottom-left-radius: 0.25rem;
  border-top-left-radius: 0.25rem;
  border: 1px solid #ddd;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
`;

export default Pagination;
