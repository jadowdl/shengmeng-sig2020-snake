const GRID_WIDTH = 20;
const GRID_HEIGHT = 20;

const EMPTY_TYPE = 0;
const SNAKE_TYPE = 1;
const APPLE_TYPE = 2;

class Model {

    gameOver = false;

    // "Source of Truth"
    snake = [];   // example: [[1,1], [2,1], [2,2]]
    snakeLength = 2;
    xDirection = 1;
    yDirection = 0;

    appleCoords = [];

    // "Derived Data"
    rows = [];

    constructor(str) {
        if (str) {
            const parse = JSON.parse(str);
            this.snake = parse.snake;
            this.appleCoords = parse.appleCoords;
            this.deriveRows();
        } else {
            this.initializeForGameStart();
        }
    }

    deriveRows() {
      this.rows = [];

      // Initialize to all EMPTY
      for(var row = 0; row < GRID_HEIGHT; row += 1) {
        var columns = [];
        for(var col = 0; col < GRID_WIDTH; col += 1) {
          columns.push(EMPTY_TYPE);
        }
        this.rows.push(columns);
      }

      // example snake == [[1,1], [2,1], [2,2]]
      // Overwrite some grid cells with SNAKE type
      // ("color the table cell green")
      for(var snake_cell = 0; snake_cell < this.snake.length; snake_cell+=1) {
         const [row, col] = this.snake[snake_cell];
         const columns = this.rows[row];
         columns[col] = SNAKE_TYPE;
      }

      const [arow,acol] = this.appleCoords;
      const acolumns = this.rows[arow];
      acolumns[acol] = APPLE_TYPE;
    }

    randomlyMoveApple() {
      const row = parseInt(Math.random() * GRID_HEIGHT);
      const col = parseInt(Math.random() * GRID_WIDTH);

      this.appleCoords = [row,col];

    }
    initializeForGameStart() {
      this.snake = [[14, 14], [14, 15]];
      this.randomlyMoveApple();
      this.deriveRows();
    }

    at(row, col) {
        return this.rows[row][col];
    }
// row is y value of click
    handleClickAt(row, col) {
      if(this.xDirection==0){
        if(col>this.snake[0][1]){
          this.yDirection=0;
          this.xDirection=1;
        }else if(col<this.snake[0][1]){
          this.yDirection = 0;
          this.xDirection = -1;
        }
      }else{
        if(row>this.snake[0][0]){
          this.xDirection = 0;
          this.yDirection = 1;
        }else if(row<this.snake[0][0]){
          this.xDirection = 0;
          this.yDirection = -1;
        }
      }

    }



    serialize() {
        // UNDOES THIS: this.snake = JSON.parse(str);
        return JSON.stringify({
          snake: this.snake,
          appleCoords: this.appleCoords
        });
    }
    movesnake(){
      if (this.gameOver == true){
        return;
      }


      this.snake.unshift([(GRID_HEIGHT+this.snake[0][0]+this.yDirection)%GRID_HEIGHT,
                            (GRID_WIDTH +this.snake[0][1]+this.xDirection)%GRID_WIDTH]);
      if (this.snake[0][0] == this.appleCoords[0] && this.snake[0][1] == this.appleCoords[1]){
        this.snakeLength++;
        this.randomlyMoveApple();
      }
      if (this.snake.length > this.snakeLength){
        this.snake.pop();
      }
      this.deriveRows();
      this.checkGameOver();
    }

    checkGameOver() {
      var snake = this.snake;
      var newHead = snake[0];
      // newHead[0] = newHead[0] + xDirection;
      // newHead[1] = newHead[1] + yDirection;
      for (let i = 1; i < snake.length; i++){
        if (newHead[0] == snake[i][0]){
          if (newHead[1] == snake[i][1]){
            this.gameOver = true;
            return;
          }
        }
      }
      return;
    }
}


exports.GRID_WIDTH = GRID_WIDTH;
exports.GRID_HEIGHT = GRID_HEIGHT;
exports.EMPTY_TYPE = EMPTY_TYPE;
exports.SNAKE_TYPE = SNAKE_TYPE;
exports.APPLE_TYPE = APPLE_TYPE;
exports.Model = Model;
