import React from "react";
import styled, { css } from "styled-components";
import { connect } from "./store";

const BetResults = ({
  bet,
  betIsSet,
  secondsLeft,
  valueWentUpOrDown,
  announceResults,
  playerBalance
}) => {
  var announce = ''
  if (valueWentUpOrDown === "equal"){
    announce = <Announcement equal>Didn't went anywhere, try again!</Announcement>
  } else if (bet.direction === valueWentUpOrDown){
    announce = <Announcement won>You won! <br/>it went <b>{valueWentUpOrDown}</b></Announcement>

  } else {
    announce = <Announcement lost>You lost <br/>it went <b>{valueWentUpOrDown}</b></Announcement>
  }
  var isBetSet = betIsSet ? (
    <p>The bet has been set, waiting {secondsLeft} seconds for results</p>
  ) : null
  var doShowResults = announceResults && !betIsSet ? (
    announce
  ) : null
  return (
    <Results>
    {isBetSet}
    {doShowResults}
  </Results>
  )
}

export default connect(
  ({
    bet,
    valueWentUpOrDown,
    announceResults,
    betIsSet,
    secondsLeft,
    playerBalance
  }) => ({
    bet,
    betIsSet,
    valueWentUpOrDown,
    announceResults,
    secondsLeft,
    playerBalance
  })
)(BetResults);

const Results = styled.div`
  justify-self: flex-end;
  align-self: flex-end;
  justify-content: flex-end;
  padding: 0 3%;
`;

const Announcement = styled.p`
  justify-self: flex-end;
  align-self: flex-end;
  justify-content: flex-end;
  padding: 0 3%;
  font-weight: 500;
  text-align: center;
  padding: 3%;
  ${props =>
    props.lost &&
    css`
      background-color: red;
    `}
    ${props =>
    props.equal &&
    css`
      background-color: gray;
    `}
    ${props =>
    props.won &&
    css`
      background-color: lightgreen;
    `}
`;
