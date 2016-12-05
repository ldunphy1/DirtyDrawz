import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native'; 

export default class Button extends Component { 
    constructor(props)	{
		super(props);
		this.state = {text: ""};
	}
  static get defaultProps() {
    return {
      title: 'Button'
    };
  }
	render() {
		return( 
		<View style={{
            justifyContent:'center',
            alignItems:'center',
            backgroundColor: '#24CE84',
            borderColor: 'transparent',
            width: 125,
            height: 50,
            borderRadius: 10
        }}>
			<TouchableHighlight
                underlayColor={'#24CE84'}
                onPress={this.props.onPress}>
                <Text style={{
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: 18, 
                    fontWeight:'bold',
                }}>
                    {this.props.title} 
                </Text>
			</TouchableHighlight>
		</View>
		);
	}
}
