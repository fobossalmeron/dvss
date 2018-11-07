import React from "react";
import styled from "styled-components";
import { connect } from "./store";

const TimerContainer = styled.p`
  height: 150px;
  width: 120px;
  font-weight: 500;
  font-size: 7rem;
  margin-top: 2%;
  margin-right: 2%;
  padding: 0 2%;
  color: white;
  background: #4568dc;
  text-align:center;
  background: linear-gradient(to left, #fbc2eb, #a6c1ee);
`;

const Timer = ({
  secondsLeft
}) => (
  <TimerContainer>{secondsLeft}</TimerContainer>
);

export default connect(
  ({ secondsLeft }) => ({
    secondsLeft
  })
)(Timer);
