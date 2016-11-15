'use strict';

import React, { Component } from 'react';
import ReactNative from 'react-native';

import{
	StyleSheet,
	View,
	Text,
	Navigator,
	TouchableHighlight,
	TouchableOpacity,
} from 'react-native'; 

const StartButton = require('./components/StartButton'); 
const UInput = require('./components/UInput');
const DisplayLogo = require('./components/DisplayLogo');
const CenterButton = require('./components/CenterButton');
const styles = require('../../styles');


class PassRecoveryPage extends Component {
	render() {
		return (
			<Navigator
				renderScene={this.renderScene.bind(this)}
				/>
		);
	}
renderScene(route,navigator) {
	return(
		<View style={styles.container}>
			<View style={styles.logoSet}>
				<DisplayLogo />
			</View>

		
			<View style={styles.loginInfo}>
						
				<Text style={styles.baseText}>
					<Text style={styles.instructionText}>
						Enter Username or Email
					</Text>
				</Text>
				
				<UInput title=" "/>
				
				<View style={styles.buttons}>
					<CenterButton title="Reset Password" onPress={this.gotoResetPass.bind(this)} />
				</View> 

			</View>
		</View> 
    );
  }
  gotoResetPass() {
	  this.props.navigator.push({
		  id: 'resetpass',
		  name: 'resetpass',
	  });
  }
}




module.exports = PassRecoveryPage;