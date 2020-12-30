import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

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
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
  ${props =>
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
  ${props =>
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

const SubTitle = styled.h1`
  border-bottom: solid 3px #f56a6a;
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0 0 1em 0;
  padding: 0 0.75em 0.5em 0;
`;

function Dialog({
  visible,
  onConfirm,
  onCancel,
  cancelText,
  confrimText,
  title,
  userList,
  target,
  targetOnChange,

  children
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
        <SubTitle>{children}</SubTitle>

        <FormControl
          variant="filled"
          style={{
            width: "100%",
            background: "#fff",
            border: "1px solid #dee2e6",
            marginBottom: "1rem",
            borderRadius: "5px"
          }}
        >
          <InputLabel id="demo-simple-select-filled-label">{title}</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            style={{
              background: "#fff"
            }}
            onChange={targetOnChange}
            value={target || "default"}
          >
            <MenuItem value="default" selected>
              <em>사용자 선택해주세요.</em>
            </MenuItem>

            {userList &&
              userList.map(item => (
                <MenuItem key={item._id} name="list" value={item._id}>
                  {item.username}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

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
