'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';

const styles = require('../../../styles.js')
const constants = styles.constants 
const {StyleSheet, Text, View, TouchableHighlight} = ReactNative; 

class CenterButtonSmall extends Component { 
	render() {
		return( 
		<View style={styles.actionCenterSmall}>
			<TouchableHighlight
			underlayColor={constants.actionColor}
			onPress={this.props.onPress}>
			<Text style={styles.actionText}>{this.props.title} </Text>
			</TouchableHighlight>
		</View> 
		);
	}
}


module.exports = CenterButtonSmall;