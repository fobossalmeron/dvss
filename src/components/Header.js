import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <Wrapper>
      <ul>
        <li>
          <NavLink exact to="/dvss/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/dvss/contact">Contact</NavLink>
        </li>
      </ul>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  position:fixed;
  z-index: 10;
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    display: inline-block;
    margin-left: 20px;
    a {
      text-decoration: none;
      font-size: 20px;
      color: #333;
      transition: 250ms ease all;
      .active {
        text-decoration: line-through;
      }
    }
    a.active {
      text-decoration: line-through;
      transition: 250ms ease all;
    }
  }
`;

export default Header;
