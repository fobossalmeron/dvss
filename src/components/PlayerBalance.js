import React from "react";
import styled from "styled-components";
import { connect } from "./store";

const Balance = styled.div`
  border: 1px solid black;
  border: 1px;
  display: flex;
  align-content: center;
  align-items: center;
  p {
    padding-left: 10px;
  }
`;

const PlayerBalance = ({
  playerBalance
}) => (
  <Balance>
  <h3>Player balance</h3>
  <p>{playerBalance}</p>
</Balance>
);

export default connect(({ playerBalance }) => ({
  playerBalance
}))(PlayerBalance);