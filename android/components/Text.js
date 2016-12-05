'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';

const styles = require('../../styles.js')
const constants = styles.constants 
const {StyleSheet, Text, View, TextInput} = ReactNative; 

class UInput extends Component { 
	constructor(props)	{
		super(props);
		this.state = { text: 'Username' }; //{this.props.title};
	}
	render() {
		
		return( 
		<View style={styles.textInput}>
			<TextInput 
				onChangeText={(text) => this.setState({text})}
				value={this.state.text}
			/>
		</View>
		);
	}
}


module.exports = UInput;
