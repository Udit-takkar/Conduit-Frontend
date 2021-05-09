import React, { useState } from "react";
import Header from "./Header";
import styled from "styled-components";
import { postArticle } from "../api/postArticle";
import { Redirect } from "react-router-dom";

function NewPost() {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    body: "",
    tagList: [],
  });
  const [tags, setTags] = useState("");
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await postArticle(formState);

    console.log(typeof res.data);
    // if (typeof res.data === undefined) {
    //   <Redirect to="/profile" />;
    // }
  };
  const handleTags = (e) => {
    setTags(e.target.value);
    const tagsList = tags.split(" ");
    setFormState({ ...formState, tagList: tagsList });
  };
  return (
    <>
      <Header />
      <NewPostContainer>
        <input
          onChange={handleChange}
          value={formState.title}
          placeholder="Article Title"
          name="title"
        />
        <input
          onChange={handleChange}
          value={formState.description}
          placeholder="What's this article about"
          name="description"
        />
        <textarea
          onChange={handleChange}
          value={formState.body}
          placeholder="Write your Article(in markdown)"
          name="body"
        />
        <input
          onChange={handleTags}
          value={tags}
          placeholder="Enter Tags"
          name="tags"
        />
        <button onClick={handleSubmit}>Publish Article</button>
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
