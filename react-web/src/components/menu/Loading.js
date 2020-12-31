import React from "react";

import styled from "styled-components";
import ReactLoading from "react-loading";

const LoadingContainer = styled.div`
  width: 100%;
  height: auto;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Loading({ color }) {
  return (
    <LoadingContainer>
      <ReactLoading type="spin" color={color || "#fff"} />
    </LoadingContainer>
  );
}

export default Loading;
