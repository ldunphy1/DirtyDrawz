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
const CenterButtonSmall = require('./components/centerButtonSmall');
const styles = require('../../styles');


class ResetPassword extends Component {
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
						Enter New Password
					</Text>
				</Text>
				
				<UInput title="Password"/>
				<UInput title="Re-enter Password"/>
				
				<View style={styles.buttons}>
					<CenterButtonSmall title="Save" onPress={this.gotoLogin.bind(this)} />
				</View> 

			</View>
		</View> 
    );
  }
  gotoSave() {
	  this.props.navigator.push({
		  id: 'passrecover',
		  name: 'passrecover',
	  });
  }
  gotoLogin() {
	  this.props.navigator.push({
		  id:'login',
		  name:'login',
	  });
	  
  }
}




module.exports = ResetPassword;