import React, { useState } from "react";
import styled from "styled-components";

function ProfilePagination({ articlesCount, getPageArticles }) {
  const NumberOfPages = [];
  for (let i = 1; i <= Math.ceil(articlesCount / 10); ++i) {
    NumberOfPages.push(i);
  }
  const [isActive, setIsActive] = useState(1);
  const handlePages = async (page) => {
    setIsActive(page);
    await getPageArticles(page);
  };

  return (
    <Container>
      {NumberOfPages.map((page) => (
        <PagesBox
          key={page}
          onClick={() => handlePages(page)}
          style={{
            backgroundColor: isActive === page ? " #5cb85c" : "white",
            color: isActive === page ? "white" : "black",
          }}
        >
          {page}
        </PagesBox>
      ))}
    </Container>
  );
}

const Container = styled.div``;
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

export default ProfilePagination;
