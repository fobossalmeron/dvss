import React, { Component } from "react";
import styled, { css } from "styled-components";
import BitcoinGraph from "./BitcoinGraph";
// import Arrow from "./Arrow";
import arrowSvg from "../img/arrow.svg";
import ba from "bitcoinaverage";

var publicKey = "OGMwNGJjM2RkMzQzNDhkYmEzZDY1ZmQwYzM3ODM1Y2M";
var secretKey =
  "OTQ1YzIyNDIwNjhjNDczY2JkYWU0ZjJjNjlkY2YwYTMzYjQ2MGQ3YmRhOGI0NzNjOTA3YzRlYTI1OTRiYTVjZA";

const restClient = ba.restfulClient(publicKey, secretKey);

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      betSize: 100,
      bitcoinWentUpOrDown: "",
      upOrDown: "down",
      seconds: "10",
      bitcoinValue: 0,
      previousBitcoinValue1: 0,
      previousBitcoinValue2: 0
    };
    this.startCountDown = this.startCountDown.bind(this);
    this.tick = this.tick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpDownChange = this.handleUpDownChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  tick() {
    var sec = this.secondsRemaining;
    this.setState({
      seconds: sec
    });
    if (sec < 10) {
      this.setState({
        seconds: "0" + this.state.seconds
      });
    }
    if (sec === 0) {
      this.setState({
        seconds: 10
      });
      this.secondsRemaining = 10;
      this.fetchBP();
    }
    this.secondsRemaining--;
  }

  startCountDown() {
    this.intervalHandle = setInterval(this.tick, 1000);
    this.secondsRemaining = 10;
  }
  componentDidMount() {
    this.startCountDown();
    this.fetchBP();
  }
  componentWillUnmount() {
    clearInterval(this.tick);
  }

  comparePrice() {
    if (this.state.bitcoinValue < this.state.previousBitcoinValue1) {
      this.setState({
        bitcoinWentUpOrDown: "down"
      });
    } else if (this.state.bitcoinValue > this.state.previousBitcoinValue1) {
      this.setState({
        bitcoinWentUpOrDown: "up"
      });
    } else {
      this.setState({
        bitcoinWentUpOrDown: "equal"
      });
    }
  }

  fetchBP() {
    var symbol_set = "global";
    var symbol = "BTCUSD";
    var myself = this;
    restClient.getTickerDataPerSymbol(
      symbol_set,
      symbol,
      function(response) {
        var json = JSON.parse(response);
        var value = json["last"];
        myself.setState(
          {
            previousBitcoinValue2: myself.state.previousBitcoinValue1
          },
          () =>
            myself.setState(
              {
                previousBitcoinValue1: myself.state.bitcoinValue
              },
              () =>
                myself.setState({ bitcoinValue: value }, () =>
                  myself.comparePrice()
                )
            )
        );
      },
      function(error) {
        console.log(error);
      }
    );
  }

  /*fetchBitcoinPrice() {
    console.log("fetching for bitcoin value..");
    fetch("https://api.blockchain.info/stats")
      .then(results => {
        return results.json();
      })
      .then(data => {
        var value = data["market_price_usd"];
        console.log("bitcoin value is: " + value);
        this.setState({ previousBitcoinValue: this.state.bitcoinValue }, () =>
          this.setState({ bitcoinValue: value })
        );
      });
  }*/

  handleChange(event) {
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
    var previous1 =
      this.state.previousBitcoinValue1 !== 0 ? (
        <p>
          previous 10s bitcoin value: {this.state.previousBitcoinValue1}
          USD
        </p>
      ) : (
        ""
      );
    var previous2 =
      this.state.previousBitcoinValue2 !== 0 ? (
        <p>
          previous 20x bitcoin value: {this.state.previousBitcoinValue2}
          USD
        </p>
      ) : (
        ""
      );
    var wentup = this.state.bitcoinWentUpOrDown === "up" ? "went up" : "";
    var wentdown = this.state.bitcoinWentUpOrDown === "down" ? "went down" : "";
    var wentequal =
      this.state.bitcoinWentUpOrDown === "equal" ? "went equal" : "";
    return (
      <Wrapper>
        <div className="title">dvss</div>
        <section>
          <Balance>
            <h3>Player balance</h3>
            <p>{this.props.playerBalance}</p>
          </Balance>
          <BitInfo>
            <BitcoinGraph width={300} heght={100} />
            <Timer>{this.state.seconds}</Timer>
            <div>
              {previous2}
              {previous1}
              <p>
                bitcoin is right now at {this.state.bitcoinValue}
                USD
              </p>
            </div>

            <ArrowSquare>
              <Arrow upOrDown={this.state.bitcoinWentUpOrDown} />
              <p>
                went {wentup} {wentdown} {wentequal}
              </p>
            </ArrowSquare>
          </BitInfo>
          <Bet>
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
                  onChange={this.handleChange}
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
          </Bet>
        </section>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* omitted */
`;
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
      content: "";
    `};
`;

const BitInfo = styled.div`
  display: flex;
`;

const Bet = styled.div`
  background-color: lightgray;
  padding: 4%;
`;
const Timer = styled.div`
  height: 150px;
  width: 120px;
  font-weight: 500;
  font-size: 7rem;
  margin-top: 2%;
  margin-right: 2%;
  padding: 0 2%;
  color: white;
  background: #4568dc;
  background: linear-gradient(to left, #fbc2eb, #a6c1ee);
`;

export default Home;
