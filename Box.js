import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export default class Box extends React.Component {
  render() {
    const { width, height, color, row, col, clickHandler} = this.props;

    return <TouchableOpacity style={{width, height, backgroundColor:color}}
                 onPress={()=>{
                     console.log("Click");
                     clickHandler(row, col);
                 }}/>;
  }
}
