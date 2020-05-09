const PULSE_TIME = 20; // milliseconds

// Some chatter that Contants.manifest needs to come from a different package?
import Constants from "expo-constants";
const { manifest } = Constants;

// https://docs.expo.io/workflow/how-expo-works/
// https://create-react-app.dev/docs/proxying-api-requests-in-development/ - doesn't work in
// expo, but would have been nice.
// Instead https://stackoverflow.com/questions/61569586/unifying-localhost-dev-api-server-access-for-expo-app-across-android-ios-and-w.  Not sure how this works with prod environment, but for
// web we'll use webpack proxy, and otherwise just call directly to same machine, different port.

const SERVER_URL = (() => {
  // TODO - detect prod env, return ptowngames.com

  // Android / IOS - no CORS issue.
  if (!!manifest.debuggerHost) {
    // prod - no CORS issue on android/ios.
    if (true) {
      return "http://ptowngames.com:3000/";
    }
    //return "http://"+manifest.debuggerHost.split(`:`).shift().concat(`:3000/`);
  } 
  // Expo Web client, making use of webpack.config.js for devServer proxy.
  else {
    return "./";
  }
})();

const BOARD_SUFFIX = "board";
const CLICK_SUFFIX = "click";
const RESET_SUFFIX = "reset";

export default class Interface {
    fetchCount = 0;

    pulse = () => {
        this.getFromServer();
        // setTimeout(this.pulse, PULSE_TIME);
    };

    constructor(game) {
        this.game = game;
        //this.pulse();
        setInterval(this.pulse, PULSE_TIME);
    }

    sendClickToServer(row, col) {
        // Fire and forget - wait on pulse to actually pick up the change.
        fetch(SERVER_URL + CLICK_SUFFIX + "?x=" + col + "&y=" + row); 
    }

    sendResetToServer(row, col) {
        // Fire and forget - wait on pulse to actually pick up the change.
        fetch(SERVER_URL + RESET_SUFFIX); 
    }
    getFromServer() {
        if (this.fetchCount > 20) {
            console.log('TOO MANY board/ REQUEST QUEUED');
            return;
        }
        this.fetchCount += 1;
        fetch(SERVER_URL + BOARD_SUFFIX)
            .then(response => {
                this.fetchCount -= 1;
                return response.text()
            }).then(data => {
                this.game.newBoardState(data);
            }
        );
    }
}
