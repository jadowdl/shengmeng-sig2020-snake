const GRID_WIDTH = 4;
const GRID_HEIGHT = 4;

class Model {
    rows = [];

    constructor(str) {
        if (str) {
            this.rows = JSON.parse(str);
        } else {
            this.initializeBoard();
        }
    }

    initializeBoard() {
      this.rows = [];
      for(var row = 0; row < GRID_HEIGHT; row += 1) {
        var cols = [];
        for(var col = 0; col < GRID_WIDTH; col += 1) {
          cols.push(false);
        }
        this.rows.push(cols);
      }
      
    }

    at(row, col) {
        return this.rows[row][col];
    }

    handleClickAt(row, col) {
      // hack for wrap around.
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
      }
    }

    serialize() {
        return JSON.stringify(this.rows);
    }
}


exports.GRID_WIDTH = GRID_WIDTH;
exports.GRID_HEIGHT = GRID_HEIGHT;
exports.Model = Model;
