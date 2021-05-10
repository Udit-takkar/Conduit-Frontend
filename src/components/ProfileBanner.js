import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getUsername,
  getUserBio,
  getUserImg,
} from "../features/authentication/signup";
import { useSelector } from "react-redux";
import { faCog, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect, Link, useHistory } from "react-router-dom";
import { CheckFollowing } from "../api/CheckFollowing";

function ProfileBanner({ username, LoggedInUsername }) {
  console.log(LoggedInUsername, username);
  const bio = useSelector(getUserBio);
  const [isFollowing, setIsFollowing] = useState(false);
  const history = useHistory();
  const image =
    useSelector(getUserImg) ||
    "https://static.productionready.io/images/smiley-cyrus.jpg";
  const goToSettings = () => {
    history.push("settings");
  };
  const followUser = () => {};
  useEffect(() => {
    const intializeState = async () => {
      const res = await CheckFollowing(username);

      console.log(res);
      // setIsFollowing(res);
    };
    intializeState();
  }, []);

  return (
    <BannerContainer>
      <ProfileDetails>
        <img src={image} alt="profile" />
        <h3>{username}</h3>
        <p>{bio}</p>
      </ProfileDetails>
      {LoggedInUsername !== username ? (
        <button>
          <FontAwesomeIcon icon={faPlus} />
          {isFollowing ? <span>Unfollow</span> : <span>Follow</span>}
        </button>
      ) : (
        <button onClick={goToSettings}>
          <span>
            <FontAwesomeIcon icon={faCog} />
          </span>{" "}
          <span> Edit Profile Settings</span>
        </button>
      )}
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
    z-index: 0;
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
