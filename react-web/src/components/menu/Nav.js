import React from "react";

import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const slideRight = keyframes`
    from {
        transform: translateX(30em);
    }
    to {
        transform: translateX(0px);
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

const slideLeft = keyframes`
    from {
        transform: translateX(0px);
    }
    to {
        transform: translateX(30em);
    }
`;

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 900;

  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  @media (max-width: 1080px) {
    /* display: none; */
    ${(props) =>
      props.isClose &&
      css`
        animation-name: ${fadeOut};
        display: none;
      `}
  }

  @media (min-width: 1081px) {
    display: none;
  }
`;

const Menu = styled.nav`
  width: 30em;
  max-width: 30em;
  margin-top: 6em;
  background: blue;
  height: 100%;
  min-height: 100%;
  z-index: 991;
  position: fixed;
  background: #f5f6f7;
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;

  display: flex;
  justify-content: space-between;

  /* position: absolute; */
  /* top: 0; */
  @media (max-width: 1080px) {
    left: -30em;

    /* display: none; */
    ${(props) =>
      props.isClose
        ? css`
            animation-name: ${slideRight};
          `
        : css`
            animation-name: ${slideLeft};
          `}
  }

  @media (min-width: 1081px) {
    left: 0em;
    display: block;
  }
`;

const NavList = styled.ul`
  padding: 1.66667em 1.66667em 1.33333em 1.66667em;
`;

const NavItem = styled.li`
  font-size: 1.5em;
  border-bottom: 0;
  border-bottom: solid 1px rgba(210, 215, 217, 0.75);
  font-weight: bold;
  color: inherit;
  height: 1.5rem;
  line-height: 1.5rem;
  margin-top: 0.25em;
  cursor: pointer;
  display: block;
  color: black;
  padding: 0.625em 0;

  &:active {
    color: #f56a6a;
  }
  &:hover {
    color: #f56a6a;
  }
  &.active {
    color: #f56a6a;
  }
`;

const Logout = styled.button`
  font-size: 1.5em;
  border-bottom: 0;
  border-bottom: solid 1px rgba(210, 215, 217, 0.75);
  font-weight: bold;
  color: inherit;
  margin-top: 0.25em;
  cursor: pointer;
  display: block;
  color: black;
  padding: 0.625em 0;
  background: none;
  border: none;
  border-bottom: solid 1px rgba(210, 215, 217, 0.75);
  width: 100%;
  text-align: left;

  &:active {
    color: #f56a6a;
  }
  &:hover {
    color: #f56a6a;
  }
`;

function Nav({ isClose, navList, logoutBtn, active, isBackGround }) {
  return (
    <>
      <DarkBackground isClose={isClose} onClick={isBackGround}></DarkBackground>
      <Menu isClose={isClose}>
        <NavList>
          {navList.map((nav) => (
            <Link key={nav.id} to={nav.path}>
              <NavItem className={nav.id === active ? "active" : ""}>
                {nav.label}
              </NavItem>
            </Link>
          ))}
          <Logout onClick={logoutBtn}>로그아웃</Logout>
        </NavList>
      </Menu>
    </>
  );
}

export default Nav;
