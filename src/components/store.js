import createStore from "react-waterfall";
//import { devTool} from './devtool';

const store = {
  initialState: {
    btc_current: 0,
    btc_10_seconds_ago: undefined,
    btc_20_seconds_ago: undefined,
    valueWentUpOrDown: "",
    playerBalance: 100,
    bet: 0
  },
  actionsCreators: {
    placeBet: (value, {bet}) => ({
      bet: value
    }),
    setPlayerBalance: (value, { playerBalance }) => ({
      playerBalance: value
    }),
    getBtc: async ({
      btc_current,
      btc_10_seconds_ago,
      btc_20_seconds_ago,
      valueWentUpOrDown
    }) => {
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
      return {
        btc_20_seconds_ago: btc_10_seconds_ago,
        btc_10_seconds_ago: btc_current,
        btc_current: field,
        valueWentUpOrDown: upOrDown
      };
    },
    btcWentUpOrDown: async ({
      btc_current,
      btc_10_seconds_ago,
      valueWentUpOrDown
    }) => {
      var upOrDown = "";
      if (btc_current < btc_10_seconds_ago) {
        upOrDown = "down";
      } else if (btc_current > btc_10_seconds_ago) {
        upOrDown = "up";
      } else {
        upOrDown = "equal";
      }
      return {
        valueWentUpOrDown: upOrDown
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
