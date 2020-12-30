import React from "react";
import { MdMenu } from "react-icons/md";
import styled from "styled-components";

const Nav = styled.header`
  width: 100%;
  height: 6em;
  display: inline-flex;

  justify-content: center;
  align-items: center;
  background: #fff;
  z-index: 1000;
  position: fixed;
  border-bottom: solid 2px #f56a6a;
`;

const MenuBtn = styled.div`
  position: absolute;
  left: 0;
  margin-left: 0.5rem;
  &:hover {
    cursor: pointer;
  }
  @media (min-width: 1081px) {
    display: none;
  }
  display: block;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin: 0;
  padding: 0;
  border: 0;
  font-weight: 700;
  /* font-size: 100%; */
  /* font: inherit; */

  color: #3d4449;
`;
function Header({ isMenu }) {
  return (
    <Nav>
      <MenuBtn>
        <MdMenu
          onClick={isMenu}
          className="menuBtn"
          size="3em"
          color="#343a40"
        ></MdMenu>
      </MenuBtn>
      <Title>
        <a href="/">UCMS</a>
      </Title>
    </Nav>
  );
}

export default Header;
