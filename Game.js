import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-material-ui';
import { Dimensions } from 'react-native'

import Box from './Box';

const GRID_WIDTH = 4;
const GRID_HEIGHT = 4;

export default class Game extends React.Component {
  makeInitialBoard = () => {
    var rows = [];
    for(var row = 0; row < GRID_HEIGHT; row += 1) {
      var cols = [];
      for(var col = 0; col < GRID_WIDTH; col += 1) {
        cols.push(false);
      }
      rows.push(cols);
    }
    
    return rows;
  };

  doClick = (row, col) => {
    // hack for wrap around.
    row += GRID_HEIGHT;
    col += GRID_WIDTH;

    const board = this.state.board;
    const offsets = [[0,0], [0, 1], [0, -1], [1, 0], [-1, 0]];
    for (var i = 0; i < offsets.length; i+=1) {
      var x = offsets[i][0];
      var y = offsets[i][1];
      board[(row+x)%GRID_HEIGHT][(col+y)%GRID_WIDTH] = 
          !board[(row+x)%GRID_HEIGHT][(col+y)%GRID_WIDTH];
    }
    this.setState({...this.state, board});
  }

  state = {
    board: this.makeInitialBoard()
  };

  // componentDidMount() {
  //   for(var i = 0; i < GRID_WIDTH * GRID_HEIGHT; i+= 1) {
  //     var i = parseInt(Math.random() * GRID_HEIGHT);
  //     var j = parseInt(Math.random() * GRID_WIDTH);
  //     // this.doClick(i, j);
  //   }
  // }

  render() {	
    // Determine the size (in pixels) of a single Box.
    var {width, height} = Dimensions.get('window')
    width -= 100;
    height -= 100;
    width = Math.min(width, height);
    height = width;
 
    // Create a grid of Box components, one row at a time.
    var rows = [];
    for(var row = 0; row < GRID_HEIGHT; row += 1) {

      // For each row, we define each cell per column individually.
      var cols = [];
      for(var col = 0; col < GRID_WIDTH; col += 1) {      
         cols.push(
             <Box width={width/GRID_WIDTH}
                  height={height/GRID_HEIGHT}
                  color={this.state.board[row][col] ? "#ff0000" : "#00ff00"}
                  row={row}
                  col={col}
                  clickHandler={this.doClick}/>
         );
      }
      

      // Now we add the whole row as a single View component. 
      rows.push(
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              {cols}
          </View>
      );
    }
    
    // If you need to add text in the return'd value, here's an example:
    //    <Text style={{color:"#ff00ff"}}> Changed the text here </Text>

    // Finally, we return the JSX that renders the whole board
    return (
      <View>
        {rows}
      </View>
    );
  }
}
