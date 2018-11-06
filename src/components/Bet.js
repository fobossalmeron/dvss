import React, { Component } from "react";
import styled from "styled-components";
import { connect, actions, Consumer } from "./store";

const BetContainer = styled.div`
  background-color: lightgray;
  padding: 4%;
`;

class Bet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      betSize: 100,
      betUpOrDown: "down"
    };
    this.handleBetValue = this.handleBetValue.bind(this);
    this.handleUpDownChange = this.handleUpDownChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleBetValue(event) {
    this.setState({ betSize: event.target.value });
  }

  handleUpDownChange(event) {
    console.log(event);
    this.setState({ upOrDown: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.betSize);
    event.preventDefault();
  }
  render() {
    return (
      /*<Consumer select={["seconds"]}>
        {({ state, actions }) => (*/
          <BetContainer>
            <h2>
              Your bet is {this.state.betSize} satoshis for bitcoin to go{" "}
              {this.state.upOrDown}
            </h2>
            <form onSubmit={this.handleSubmit}>
              <label>
                Amount:
                <input
                  type="text"
                  value={this.state.betSize}
                  onChange={this.handleBetValue}
                />
              </label>
              Up or down?
              <label>
                Up
                <input
                  type="radio"
                  value="up"
                  checked={this.state.upOrDown === "up"}
                  onChange={this.handleUpDownChange}
                />
              </label>
              <label>
                down
                <input
                  type="radio"
                  value="down"
                  checked={this.state.upOrDown === "down"}
                  onChange={this.handleUpDownChange}
                />
              </label>
              <input type="submit" value="Place bet" />
            </form>
          </BetContainer>/*
        )}
      </Consumer>*/
    );
  }
}

export default Bet;
/*
const TickResults = ({
  btc_current,
  btc_10_seconds_ago,
  btc_20_seconds_ago
}) => <p>holi</p>;

export default connect(
  ({ btc_current, btc_10_seconds_ago, btc_20_seconds_ago }) => ({
    btc_current,
    btc_10_seconds_ago,
    btc_20_seconds_ago
  })
)(TickResults);
*/
