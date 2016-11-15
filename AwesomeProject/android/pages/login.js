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


class LoginPage extends Component {
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
				<UInput title="Username"/>
				<UInput title="Password"/>
		
				<View style={styles.buttons}>
					<StartButton title="Login" onPress={this.gotoDashboard.bind(this)} />

					<StartButton title="Register" onPress={this.gotoSignUp.bind(this)} />
				</View>
				
				<View style={styles.buttons}>
					<CenterButton title="Forgot Password" onPress={this.gotoPassRecover.bind(this)} />
				</View> 

			</View>
		</View> 
    );
  }
  gotoSignUp() {
	  this.props.navigator.push({
		  id: 'signup',
		  name: 'signup',
	  });
	  
  }
  gotoDashboard() {
	  this.props.navigator.push({
		  component: Dashboard
	  })
  }
  gotoPassRecover() {
	  this.props.navigator.push({
		  id: 'passrecover',
		  name: 'passrecover',
	  });
  }
}



module.exports = LoginPage;