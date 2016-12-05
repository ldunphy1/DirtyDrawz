'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native'; 

class Button extends Component { 
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
            backgroundColor: '#ff5522',
            borderColor: 'transparent',
            width: 125,
            height: 50,
            borderRadius: 10
        }}>
			<TouchableHighlight
                underlayColor={'#ff5522'}
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

module.exports = Button;