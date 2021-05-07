import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import {
  getUsername,
  getUserEmail,
  getUserImg,
  getUserBio,
  update,
  error,
} from "../features/authentication/signup";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../api/updateUser";

function Settings() {
  const dispatch = useDispatch();
  const username = useSelector(getUsername);
  const userEmail = useSelector(getUserEmail);
  const userImg = useSelector(getUserImg);
  const userBio = useSelector(getUserBio);
  const checkError = useSelector(error);
  const [updateForm, setUpdateForm] = useState({
    image: userImg,
    username: username,
    bio: userBio,
    email: userEmail,
    password: "",
  });
  const handleChange = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //add validation here
    const check = await dispatch(update(updateForm));
    console.log(check);
    if (!checkError) {
      console.log(checkError);
    }
  };
  return (
    <>
      <Header />
      <SettingsContainer>
        <h3>Your Settings</h3>
        <input
          onChange={handleChange}
          name="image"
          type="url"
          placeholder="URL of profile picture"
        />
        <input
          onChange={handleChange}
          name="username"
          placeholder="username"
          value={updateForm.username}
        />
        <textarea
          onChange={handleChange}
          name="bio"
          type="text"
          placeholder="Short bio about you"
        />
        <input
          onChange={handleChange}
          name="email"
          placeholder="email"
          value={updateForm.email}
          type="email"
        />
        <input
          onChange={handleChange}
          name="password"
          placeholder="new password"
          type="password"
        />
        <button onClick={handleSubmit} type="submit">
          Update Settings
        </button>
      </SettingsContainer>
    </>
  );
}

const SettingsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > input {
    padding: 0.75rem 1.5rem;
    border-radius: 0.3rem;
    border: 1px solid rgba(0, 0, 0, 0.15);
    margin-top: 10px;
    min-width: 35vw;
  }
  > textarea {
    padding: 0.75rem 1.5rem;
    border-radius: 0.3rem;
    border: 1px solid rgba(0, 0, 0, 0.15);
    margin-top: 10px;
    min-width: 35vw;
    min-height: 15vh;
  }
  > button {
    border: none;
    margin-top: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-size: 1.25rem;
    border-radius: 0.3rem;
    color: #fff;
    background-color: #5cb85c;
    border-color: #5cb85c;
    cursor: pointer;
  }
`;

export default Settings;
