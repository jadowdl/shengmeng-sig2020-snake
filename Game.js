import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-material-ui';
import { Dimensions } from 'react-native'
import {GRID_WIDTH, GRID_HEIGHT, Model } from './Model';

import Box from './Box';
import Interface from './Interface';

export default class Game extends React.Component {

  state = {
    board: new Model(),
    iface: new Interface(this),
    serverState: null
  };

  newBoardState = (data) => {
    console.log("-> nBS", new Date().getTime());
    this.setState({
        ...this.state,
        board: new Model(data),
        serverState: data
    });
    console.log("<- nBS", new Date().getTime());
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.serverState !== this.state.serverState;
  }
  
  doClick = (row, col) => {
    // Play game via server...
    this.state.iface.sendClickToServer(row, col);

    // Old code to play game locally, offline.
    // const newModel = new Model(this.state.board.serialize());
    // newModel.handleClickAt(row, col);
    // this.setState({
    //     ...this.state,
    //     board: newModel
    // });
  }

  // componentDidMount() {
  //   for(var i = 0; i < GRID_WIDTH * GRID_HEIGHT; i+= 1) {
  //     var i = parseInt(Math.random() * GRID_HEIGHT);
  //     var j = parseInt(Math.random() * GRID_WIDTH);
  //     // this.doClick(i, j);
  //   }
  // }

  render() {
    console.log("-> render", new Date().getTime());

    // Determine the size (in pixels) of a single Box.
    var {width, height} = Dimensions.get('window')
    width -= 50;
    height -= 50;
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
                  color={this.state.board.at(row, col) ? "#663300" : "#e600e6"}
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

    console.log("<- render", new Date().getTime());

    // Finally, we return the JSX that renders the whole board
    return (
      <View>
        {rows}
      </View>
    );
  }
}
