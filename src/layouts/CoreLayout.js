import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Tags from "../components/Tags";
import App from "../App";
import { isUserLoggedIn } from "../features/authentication/signup";
import { useSelector } from "react-redux";

function CoreLayout({ children }) {
  const isLoggedIn = useSelector(isUserLoggedIn);
  return (
    <MainContainer>
      <Header />
      {isLoggedIn === false && <Banner />}
      <FeedAndTagContainer>
        <div>
          <App />
        </div>

        <Tags />
      </FeedAndTagContainer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const FeedAndTagContainer = styled.div`
  display: flex;
  > div {
    flex: 0.75;
  }
  > Tags {
    flex: 0.25;
  }
`;
export default CoreLayout;
