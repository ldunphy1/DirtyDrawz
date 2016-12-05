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

const Button = require('./components/Button'); 
const UInput = require('./components/UInput');
const DisplayLogo = require('./components/DisplayLogo');
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
					<Button title="Login" onPress={this.gotoOrder.bind(this)} />

					<Button title="Register" onPress={this.gotoSignUp.bind(this)} />
				</View>
				
				<View style={styles.buttons}>
					<Button title="Forgot Password" onPress={this.gotoPassRecover.bind(this)} />
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
  gotoOrder() {
	  this.props.navigator.push({
		  id: 'order',
		  name: 'order',
	  });
  }
  gotoPassRecover() {
	  this.props.navigator.push({
		  id: 'passrecover',
		  name: 'passrecover',
	  });
  }
}



module.exports = LoginPage;