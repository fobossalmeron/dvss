import React, { Component } from "react";
import styled from "styled-components";
import BitcoinGraph from "./BitcoinGraph";
import TickResults from "./TickResults";
import ArrowDisplay from "./ArrowDisplay";
import PlayerBalance from "./PlayerBalance";
import Timer from "./Timer";
import Bet from "./Bet";
import Smooth from "smooth-scrolling";

import { Provider, actions, connect, subscribe } from "./store";

subscribe((action, state) => console.log(action, state));

class Home extends Component {
  constructor(props, state) {
    super(props, state);
    this.startCountDown = this.startCountDown.bind(this);
    this.someCallBack = this.someCallBack.bind(this);
    this.tick = this.tick.bind(this);
    this.section = document.getElementById('#root');
    this.smooth = new Smooth({
      native: true,
      noscrollbar: true,
      section: this.section,
      ease: 0.08
    })
  }

  getBTCValue() {
    actions.getBtc();
  }
  updateSeconds(value) {
    actions.reduceSeconds(value);
  }
  turnBetOff() {
    actions.betOff();
  }
  removeAnnouncement() {
    actions.unannounce();
  }

  tick() {
    var sec = this.secondsRemaining;
    this.updateSeconds(sec);
    if (sec === 0) {
      this.getBTCValue();
      this.updateSeconds(10);
      this.secondsRemaining = 10;
    }
    this.secondsRemaining--;
  }

  startCountDown() {
    this.secondsRemaining = 10;
    this.intervalHandle = setInterval(this.tick, 1000);
  }

  someCallBack(){
    //this.smooth.init();
  }

  componentDidMount = () => {
    this.startCountDown();
    this.getBTCValue();
    this.someCallBack();
    console.log("running smooth")
  };

  componentWillUnmount() {
    clearInterval(this.intervalHandle);
    //this.smooth.destroy();
    console.log("stop smooth")
  }

  render() {
    return (
      <Provider>
        <Wrapper>
          <div className="title">dvss</div>
          <section id="vs-material">
            <PlayerBalance />
            <BitInfo>
              <BitcoinGraph width={300} heght={100} />
              <Timer />
              <TickResults />
              <ArrowDisplay />
            </BitInfo>
            <Bet />
          </section>
        </Wrapper>
      </Provider>
    );
  }
}

export default connect(({ actions, state }) => ({ actions, state }))(Home);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* omitted */
`;

const BitInfo = styled.div`
  display: flex;
`;
