import React from "react";

import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import styled from "styled-components";

const LoadingContainer = styled.div`
  width: 100%;
  height: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Loading() {
  return (
    <LoadingContainer>
      <HourglassEmptyIcon></HourglassEmptyIcon>
    </LoadingContainer>
  );
}

export default Loading;
