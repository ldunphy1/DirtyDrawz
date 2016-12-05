import React, { Component } from 'react';
import { View, Text, Navigator,TextInput,StyleSheet } from 'react-native';

export default class MyScene extends Component {
  constructor(props)	{
		super(props);
		this.state = {text: ""};
	}
  static get defaultProps() {
    return {
      title: 'MyScene'
    };
  }

  render() {
    return (
		<View style={{
		  flexDirection:'row',
      borderColor: 'powderblue',
      alignItems:'center',
      borderWidth: 2,
      height: 40,
      width: this.props.boxWidth,
      borderRadius: 3
    }}>
      <View style={{flex:1,flexDirection:'row',justifyContent:'center',width:100}}>
        <Text> 
          {this.props.caption} 
        </Text>
      </View>
			<TextInput
      style={{
        flex: 100,
      }}
      value={this.state.text}
			/>
		</View>
    )
  }
}