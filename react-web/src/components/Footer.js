import React from "react";
import styled from "styled-components";

const CopyRight = styled.footer`
  width: 100%;
  display: inline-block;
  text-align: center;
  height: 10em;
  line-height: 10em;
  min-height: 100%;
  background: ${(props) => props.background || "blue"};

  @media (min-width: 1081px) {
    padding-left: 30em;
    width: calc(100% - 300px);
    display: block;
  }
`;

const Title = styled.h1`
  font-size: 0.75rem;
`;

function Footer({ background }) {
  return (
    <CopyRight background={background}>
      <Title>Copyright © 2020 Team UCMS. All rights reserved.</Title>
    </CopyRight>
  );
}

export default Footer;
