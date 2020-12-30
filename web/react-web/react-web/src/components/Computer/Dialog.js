import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const slideUp = keyframes`
    from {
        transform: translateY(200px);
    }
    to {
        transform: translateY(0px);
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

const slideDown = keyframes`
    from {
        transform: translateY(0px);
    }
    to {
        transform: translateY(200px);
    }
`;

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.8);
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
  ${(props) =>
    props.disappear &&
    css`
      animation-name: ${fadeOut};
    `}
`;

const DialogBlock = styled.div`
  width: 320px;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.125rem;
  }
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;
  ${(props) =>
    props.disappear &&
    css`
      animation-name: ${slideDown};
    `}
`;

const ButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  background: #343a40;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 2.25rem;
  font-size: 1rem;
  & + & {
    margin-left: 1rem;
  }
`;

const ShortMarginButton = styled(StyledButton)`
  & + & {
    margin-left: 0.5rem;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 3rem;
  outline: none;
  border: none;
  font-size: 1rem;
  border-bottom: 1px solid #343a40;
  border-radius: 0;
  -webkit-appearance: none;
  /* margin-bottom: 0.75rem; */
`;

function Dialog({
  visible,
  onConfirm,
  onCancel,
  cancelText,
  confrimText,
  title,
  error,
  isEdit,
  children,
  updateInputs,
  onChange,
}) {
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);
  useEffect(() => {
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  if (!localVisible && !animate) return null;

  return (
    <DarkBackground disappear={!visible}>
      <DialogBlock disappear={!visible}>
        <h3>{title}</h3>
        {error.type === "delete" || error.type === "update" ? (
          <p>{error.description}</p>
        ) : (
          <p>{children}</p>
        )}
        {isEdit && (
          <>
            <Input
              value={updateInputs.classroomName || ""}
              onChange={onChange}
              name="classroomName"
            ></Input>
            <Input
              value={updateInputs.row || ""}
              onChange={onChange}
              name="row"
            ></Input>
            <Input
              value={updateInputs.col || ""}
              onChange={onChange}
              name="col"
            ></Input>
            <Input
              value={updateInputs.comCount || ""}
              onChange={onChange}
              name="comCount"
            ></Input>
          </>
        )}
        <ButtonGroup>
          <ShortMarginButton onClick={onCancel} color="gray">
            {cancelText}
          </ShortMarginButton>
          <ShortMarginButton onClick={onConfirm} color="pink">
            {confrimText}
          </ShortMarginButton>
        </ButtonGroup>
      </DialogBlock>
    </DarkBackground>
  );
}
export default Dialog;
