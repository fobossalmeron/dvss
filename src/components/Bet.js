import React from "react";
import styled from "styled-components";
import { connect, actions } from "./store";
import BetResults from "./BetResults";

const BetContainer = styled.div`
  background-color: lightgray;
  padding: 4%;
  form {
    display: flex;
  }
  h2{
    font-weight:100;
  }
`;

function handleSize(event) {
  actions.betSize(event.target.value);
}

function handleDirection(event) {
  actions.betDirection(event.target.value);
}

function handleSubmit(event) {
  event.preventDefault();
  actions.betOn();
}

function removeAnnouncement(){
  actions.unannounce();
}

const Bet = ({ bet, betIsSet, playerBalance }) => (
  <BetContainer>
    <h2>
      Your bet is <b>{bet.size} satoshis</b> for bitcoin to <b>go {bet.direction}</b>
    </h2>
    {betIsSet === false ? (
      <form onSubmit={event => handleSubmit(event)} onClick={() => removeAnnouncement()}>
        <label>
          Amount:
          <input
            type="text"
            value={bet.size}
            onChange={event => handleSize(event)}
          />
        </label>
        Up or down?
        <label>
          Up
          <input
            type="radio"
            value="up"
            checked={bet.direction === "up"}
            onChange={event => handleDirection(event)}
          />
        </label>
        <label>
          down
          <input
            type="radio"
            value="down"
            checked={bet.direction === "down"}
            onChange={event => handleDirection(event)}
          />
        </label>
        {betIsSet === false && playerBalance !== 0 ? (
          <input type="submit" value="Place bet" />
        ) : null}
        {playerBalance === 0 ? (
          <p>You need more satoshis to play again</p>
        ) : null}
      </form>
    ) : null}
     <BetResults />
  </BetContainer>
);

export default connect(({ bet, betIsSet, playerBalance }) => ({
  bet,
  betIsSet,
  playerBalance
}))(Bet);
