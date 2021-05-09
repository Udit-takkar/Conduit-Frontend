import React from "react";
import styled from "styled-components";
import {
  getUsername,
  getUserBio,
  getUserImg,
} from "../features/authentication/signup";
import { useSelector } from "react-redux";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect, Link, useHistory } from "react-router-dom";

function ProfileBanner({ username }) {
  const bio = useSelector(getUserBio);
  const history = useHistory();
  const image =
    useSelector(getUserImg) ||
    "https://static.productionready.io/images/smiley-cyrus.jpg";
  const goToSettings = () => {
    history.push("settings");
  };
  return (
    <BannerContainer>
      <ProfileDetails>
        <img src={image} alt="profile" />
        <h3>{username}</h3>
        <p>{bio}</p>
      </ProfileDetails>

      <button onClick={goToSettings}>
        <span>
          <FontAwesomeIcon icon={faCog} />
        </span>{" "}
        Edit Profile Settings
      </button>
    </BannerContainer>
  );
}

const BannerContainer = styled.div`
  background: #f3f3f3;
  padding-top: 1.5rem;
  > button {
    display: inline-block;
    position: absolute;
    right: 10vw;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    border-radius: 0.2rem;
    border: none;
    color: #999;
    border: 1px solid #999;
  }
`;
const ProfileDetails = styled.div`
  display: flex;

  flex-direction: column;
  place-items: center;

  > h3 {
    margin-bottom: 0px;
  }
  > p {
    margin-top: 0px;
  }
  > img {
    width: 100px;
    height: 100px;
    border-radius: 100px;
  }
`;
export default ProfileBanner;
