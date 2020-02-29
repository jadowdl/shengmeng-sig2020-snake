const PULSE_TIME = 20; // milliseconds

// const SERVER_URL = "http://10.1.192.229:3000/";
const SERVER_URL = "./";
const BOARD_SUFFIX = "board";
const CLICK_SUFFIX = "click";

export default class Interface {
    pulse = () => {
        this.getFromServer();
        setTimeout(this.pulse, PULSE_TIME);
    };

    constructor(game) {
        this.game = game;
        this.pulse();
    }

    sendClickToServer(row, col) {
        // Fire and forget - wait on pulse to actually pick up the change.
        fetch(SERVER_URL + CLICK_SUFFIX + "?x=" + col + "&y=" + row);
    }

    getFromServer() {
        fetch(SERVER_URL + BOARD_SUFFIX)
            .then(response => response.text())
            .then(data => {
            console.log(data);
            this.game.newBoardState(data);
        });
    }
}
