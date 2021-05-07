import React from "react";
import Header from "./Header";
import styled from "styled-components";

function NewPost() {
  return (
    <>
      <Header />
      <NewPostContainer>
        <input placeholder="Article Title" />
        <input placeholder="What's this article about" />
        <textarea placeholder="Write your Article(in markdown)" />
        <input placeholder="Enter Tags" />
        <button>Publish Article</button>
      </NewPostContainer>
    </>
  );
}
const NewPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  margin-top: 3rem;
  > input {
    padding: 0.75rem 1.5rem;
    border-radius: 0.3rem;
    border: 1px solid rgba(0, 0, 0, 0.15);
    margin-top: 10px;
    min-width: 60vw;
    ::placeholder {
      color: rgba(0, 0, 0, 0.55);
    }
  }
  > button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 0.3rem;
    color: #fff;
    background-color: #5cb85c;
    border-color: #5cb85c;
    border: none;
    margin-top: 15px;
    cursor: pointer;
  }
  > textarea {
    padding: 0.75rem 1.5rem;
    border-radius: 0.3rem;
    border: 1px solid rgba(0, 0, 0, 0.15);
    margin-top: 10px;
    min-width: 60vw;
    min-height: 15vh;
    ::placeholder {
      color: rgba(0, 0, 0, 0.55);
    }
  }
`;

export default NewPost;
