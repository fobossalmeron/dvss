import React from "react";
import styled from "styled-components";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Home from "./Home";
import Contact from "./Contact";

function Container({ location }) {
  return (
    <Wrapper>
    <TransitionGroup className="transition-group">
      <CSSTransition
        key={location.key}
        timeout={{ enter: 425, exit: 175 }}
        classNames="fade"
      >
        <section className="route-section">
          <Switch location={location}>
            <Route exact path="/dvss/" render={()=><Home/>} />
            <Route path="/dvss/contact" component={Contact} />
          </Switch>
        </section>
      </CSSTransition>
    </TransitionGroup>
  </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 4%;

  .fade-enter {
    opacity: 0.01;
    transform: translateY(12px);
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transform: translateY(0px);
    transition: 250ms ease-in all 175ms;
  }

  .fade-exit {
    opacity: 1;
    transform: translateY(0px);
  }

  .fade-exit.fade-exit-active {
    opacity: 0.01;
    transform: translateY(12px);
    transition: all 175ms ease-in;
  }
  div.transition-group {
    position: relative;
  }
  section.route-section {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
`;

export default withRouter(Container);
