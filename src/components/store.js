import createStore from "react-waterfall";
//import { devTool } from './devTool';

const store = {
  initialState: {
    btc_current: 0,
    btc_10_seconds_ago: undefined,
    btc_20_seconds_ago: undefined,
    valueWentUpOrDown: "",
    playerBalance: 2000,
    secondsLeft: 10,
    betIsSet: false,
    announceResults: false,
    results: [
      {
        size: "",
        direction: "😅",
        won: true
      },
      {
        size: "",
        direction: "😅",
        won: true
      }
    ],
    bet: {
      size: 1000,
      direction: "up"
    }
  },
  actionsCreators: {
    unannounce: ({ announceResults }) => ({
      announceResults: false
    }),
    betOn: ({ betIsSet }) => ({
      betIsSet: true
    }),
    betOff: ({ betIsSet }) => ({
      betIsSet: false
    }),
    reduceSeconds: ({ secondsLeft }, _a, value) => ({
      secondsLeft: value
    }),
    betSize: ({ bet, playerBalance }, _a, event) => {
      var actualSize = event;
      if (event > playerBalance) {
        actualSize = playerBalance;
      }
      return {
        bet: { size: actualSize, direction: bet.direction }
      };
    },
    betDirection: ({ bet }, _a, event) => ({
      bet: { direction: event, size: bet.size }
    }),
    setPlayerBalance: ({ playerBalance }, _a, value) => ({
      playerBalance: value
    }),
    getBtc: async ({
      btc_current,
      btc_10_seconds_ago,
      btc_20_seconds_ago,
      valueWentUpOrDown,
      playerBalance,
      announceResults,
      bet,
      betIsSet
    }) => {
      var balance = playerBalance;
      var announcement = announceResults;
      var betPossible = bet.size;

      const response = await fetch(
        "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD"
      );
      const body = await response.json();
      const field = await body["last"];
      var upOrDown = "";
      if (field < btc_current) {
        upOrDown = "down";
      } else if (field > btc_current) {
        upOrDown = "up";
      } else {
        upOrDown = "equal";
      }

      if (betIsSet) {
        if (upOrDown === "equal") {
          balance = playerBalance;
          announcement = true;
          console.log("You TIED");
        } else {
          if (upOrDown === bet.direction) {
            balance += bet.size;
            announcement = true;
            console.log("You WON");
          } else if (upOrDown !== bet.direction) {
            balance -= bet.size;
            announcement = true;
            console.log("You LOST");

            if (balance === 0) {
              betPossible = 0;
            }
          }
        }
      } else {
        announcement = false;
      }
      return {
        btc_20_seconds_ago: btc_10_seconds_ago,
        btc_10_seconds_ago: btc_current,
        btc_current: field,
        valueWentUpOrDown: upOrDown,
        playerBalance: balance,
        betIsSet: false,
        announceResults: announcement,
        bet: { size: betPossible, direction: bet.direction }
      };
    }
  }
};

export const {
  Provider,
  Consumer,
  actions,
  getState,
  connect,
  subscribe
} = createStore(store);
