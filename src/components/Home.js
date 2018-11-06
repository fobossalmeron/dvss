import React, { Component } from "react";
import styled from "styled-components";
import BitcoinGraph from "./BitcoinGraph";
import TickResults from "./TickResults";
import ArrowDisplay from "./ArrowDisplay";
import PlayerBalance from "./PlayerBalance";
import Bet from "./Bet";
import { Provider, Consumer, actions, connect, subscribe } from "./store";

subscribe((action, state) => console.log(action, state));

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      betSize: 100,
      upOrDown: "down",
      seconds: ""
    };
    this.startCountDown = this.startCountDown.bind(this);
    this.tick = this.tick.bind(this);
  }

  getBTCValue() {
    actions.getBtc()
  }
  wentUpOrDown(){
    actions.btcWentUpOrDown()
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
      this.getBTCValue()
    }
    this.secondsRemaining--;
  }

  startCountDown() {
    this.secondsRemaining = 10;
    this.intervalHandle = setInterval(this.tick, 1000);
  }

  componentDidMount = () => {
    this.startCountDown();
    this.getBTCValue();
  }

  componentWillUnmount() {
    clearInterval(this.intervalHandle);
  }

  render() {
    return (
      <Provider>
        <Wrapper>
          <div className="title">dvss</div>
          <section>
            <PlayerBalance/>
            <BitInfo>
              <BitcoinGraph width={300} heght={100} />
              <Timer>{this.state.seconds}</Timer>
              <TickResults />
              <ArrowDisplay/>
            </BitInfo>
            <Bet/>
          </section>
        </Wrapper>
      </Provider>
    );
  }
}

export default connect(({ actions }) => ({ actions }))(Home);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* omitted */
`;

const BitInfo = styled.div`
  display: flex;
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

