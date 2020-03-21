const GRID_WIDTH = 50;
const GRID_HEIGHT = 50;

const EMPTY_TYPE = 0;
const SNAKE_TYPE = 1;

class Model {

    // "Source of Truth"
    snake = [];   // example: [[1,1], [2,1], [2,2]]

    xDirection = 1;

    yDirection = 0;
    // "Derived Data"
    rows = [];

    constructor(str) {
        if (str) {
            this.snake = JSON.parse(str);
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
    }

    initializeForGameStart() {
      this.snake = [[5, 5], [5, 6]];
      this.deriveRows();
    }

    at(row, col) {
        return this.rows[row][col];
    }

    handleClickAt(row, col) {

      // This was for Lights Out.
      // Doesn't make sense for snake currently.

      // hack for wrap around.
      /*
      row += GRID_HEIGHT;
      col += GRID_WIDTH;
      const board = this.rows;
      const offsets = [[0,0], [0, 1], [0, -1], [1, 0], [-1, 0]];
      for (var i = 0; i < offsets.length; i+=1) {
        const x = offsets[i][0];
        const y = offsets[i][1];
        const r_index = (row+x)%GRID_HEIGHT;
        const c_index = (col+y)%GRID_WIDTH;
        this.rows[r_index][c_index] = !this.rows[r_index][c_index];
      }*/
    }

    serialize() {
        // UNDOES THIS: this.snake = JSON.parse(str);
        return JSON.stringify(this.snake);
    }
}


exports.GRID_WIDTH = GRID_WIDTH;
exports.GRID_HEIGHT = GRID_HEIGHT;
exports.Model = Model;
