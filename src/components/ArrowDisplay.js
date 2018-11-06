import React from "react";
import styled, { css } from "styled-components";
import arrowSvg from "../img/arrow.svg";
import equalSvg from "../img/equal.svg";
import { connect } from "./store";

const ArrowSquare = styled.div`
  display: flex;
  flex-direction: column;
  p {
    margin-left: 10px;
    margin-top: 0;
  }
`;

const Arrow = styled.div`
  width: 100px;
  height: 100px;
  margin: 10px;
  border-radius: 5px;
  content: url(${arrowSvg});
  ${props =>
    props.upOrDown === "up" &&
    css`
      background: green;
    `};
  ${props =>
    props.upOrDown === "down" &&
    css`
      background: red;
      transform: rotate(180deg);
    `};
  ${props =>
    props.upOrDown === "equal" &&
    css`
      background: gray;
      content: url(${equalSvg});
    `};
`;

const ArrowDisplay = ({
  valueWentUpOrDown,
  btc_current,
  btc_10_seconds_ago
}) => (
  btc_10_seconds_ago !== 0? 
  <ArrowSquare>
    <Arrow upOrDown={valueWentUpOrDown} />
    {valueWentUpOrDown !== "" ? (
      <p>
        went from {btc_10_seconds_ago} to {btc_current}
      </p>
    ) : null}
  </ArrowSquare> : null
);

export default connect(
  ({ valueWentUpOrDown, btc_current, btc_10_seconds_ago }) => ({
    valueWentUpOrDown,
    btc_current,
    btc_10_seconds_ago
  })
)(ArrowDisplay);
