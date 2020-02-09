const PULSE_TIME = 100; // milliseconds

const SERVER_URL = "http://10.1.146.122:3000/";
const BOARD_SUFFIX = "board";

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
        // TODO
    }

    getFromServer() {
        fetch(SERVER_URL + BOARD_SUFFIX)
            .then(response => response.text())
            .then(data => {
            this.game.newBoardState(data);
        });
    }
}
