import React from "react";
import styled from "styled-components";

function Banner() {
  return (
    <BannerContainer>
      <BannerText>
        <h1>conduit</h1>
        <p>A place to share your knowledge.</p>
      </BannerText>
    </BannerContainer>
  );
}
const BannerContainer = styled.div`
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  min-height: 150px;
  background-color: #5cb85c;
`;
const BannerText = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;

  > h1 {
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: 50px;
    color: white;
  }
  > p {
    margin-top: 0px;
    margin-bottom: 0px;
    color: white;
    letter-spacing: 2px;
  }
`;
export default Banner;
