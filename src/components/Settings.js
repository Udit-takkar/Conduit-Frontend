import React, { useState } from "react";
import styled from "styled-components";
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
import { useHistory } from "react-router-dom";
import { logoutUser } from "../features/authentication/signup";

function Settings() {
  const dispatch = useDispatch();
  const history = useHistory();
  const username = useSelector(getUsername);
  const userEmail = useSelector(getUserEmail);
  const userImg = useSelector(getUserImg) || "";
  const userBio = useSelector(getUserBio);
  const checkError = useSelector(error);
  const [updateForm, setUpdateForm] = useState({
    image: userImg,
    username: username,
    bio: userBio,
    email: userEmail,
    password: "",
  });
  console.log(userBio);
  console.log(updateForm);
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

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    await dispatch(logoutUser());

    history.push("/");
  };
  return (
    <>
      <SettingsContainer>
        <h3>Your Settings</h3>
        <input
          onChange={handleChange}
          name="image"
          type="url"
          placeholder="URL of profile picture"
          value={updateForm.image}
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
          value={updateForm.bio}
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
      <LogOut>
        <button onClick={handleLogout} type="submit">
          Logout
        </button>
      </LogOut>
    </>
  );
}

const SettingsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  > h3 {
    font-size: 30px;
  }

  > input {
    padding: 0.75rem 1.5rem;
    border-radius: 0.3rem;
    border: 1px solid rgba(0, 0, 0, 0.15);
    margin-top: 10px;
    min-width: 40vw;
  }
  > textarea {
    padding: 0.75rem 1.5rem;
    border-radius: 0.3rem;
    border: 1px solid rgba(0, 0, 0, 0.15);
    margin-top: 10px;
    min-width: 40vw;
    min-height: 20vh;
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
const LogOut = styled.div`
  // background-color: blue;
  display: flex;
  justify-content: center;
  margin-right: 350px;
  > button {
    border: 1px solid transparent;
    margin-top: -2.9rem;
    padding: 0.75rem 1.5rem;
    font-size: 1.25rem;
    border-radius: 0.3rem;
    // color: #fff;
    color: #b85c5c;
    background-image: none;
    background-color: transparent;
    border-color: #b85c5c;
    cursor: pointer;
  }
`;

export default Settings;
