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
      var actualSize = parseFloat(event);
      if (event > playerBalance) {
        actualSize = parseFloat(playerBalance);
      }
      return {
        bet: { size: actualSize, direction: bet.direction }
      };
    },
    betDirection: ({ bet }, _a, event) => ({
      bet: { direction: event, size: bet.size }
    }),
    setPlayerBalance: ({ playerBalance }, _a, value) => ({
      playerBalance: parseFloat(value)
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
      var balance = parseFloat(playerBalance);
      var announcement = announceResults;
      var betPossible = parseFloat(bet.size);

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

          var balanceForConsole3 = parseFloat(playerBalance)
          console.log("You bet: " + bet.direction + 
                      " it went: " + upOrDown + 
                      "\n So you TIED, your balance went from " + balance +
                      " to " + balanceForConsole3)


          balance = parseFloat(playerBalance);
          announcement = true;
          console.log("You TIED");
        } else {
          if (upOrDown === bet.direction) {

            var balanceForConsole = balance + parseFloat(bet.size)
            console.log("You bet: " + bet.direction + 
                        " it went: " + upOrDown + 
                        "\n So you WON, your balance went from " + balance +
                        " to " + balanceForConsole)

            balance += parseFloat(bet.size);
            announcement = true;
          } else if (upOrDown !== bet.direction) {

            var balanceForConsole2 = balance - parseFloat(bet.size)
            console.log("You bet: " + bet.direction + 
                        " it went: " + upOrDown + 
                        "\n So you LOST, your balance went from " + balance +
                        " to " + balanceForConsole2)

            balance -= parseFloat(bet.size);
            announcement = true;

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
