import React from "react";
import styled, { keyframes, css } from "styled-components";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;
const ErrorContainer = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: rgb(245, 106, 106);
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeOut};
  animation-fill-mode: forwards;
  ${props =>
    props.children &&
    css`
      animation-name: ${fadeIn};
    `}
`;
const ErrorContents = styled.p`
  margin: 0;
  padding: 0;
  font-size: 1.25rem;
  line-height: 3rem;
  color: #fff;
`;

function Error({ children }) {
  return (
    <ErrorContainer>
      <ErrorContents children={children}>{children}</ErrorContents>
    </ErrorContainer>
  );
}

export default Error;
