import React from "react";
import { connect } from "./store";

const TickResults = ({
  btc_current,
  btc_10_seconds_ago,
  btc_20_seconds_ago
}) => (
  <div>
    {btc_20_seconds_ago !== 0 && btc_20_seconds_ago !== undefined ? (
      <p>{"20 seconds ago: " + btc_20_seconds_ago + "USD"}</p>
    ) : null}
    {btc_10_seconds_ago !== 0 && btc_10_seconds_ago !== undefined ? (
      <p>{"10 seconds ago: " + btc_10_seconds_ago + "USD"}</p>
    ) : null}
    <p>
      BTC Value {btc_current}
      USD
    </p>
  </div>
);

export default connect(
  ({ btc_current, btc_10_seconds_ago, btc_20_seconds_ago }) => ({
    btc_current,
    btc_10_seconds_ago,
    btc_20_seconds_ago
  })
)(TickResults);