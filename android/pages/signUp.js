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

const StartButton = require('./components/BottomLeftButton'); 
const UInput = require('./components/UInput');
const DisplayLogo = require('./components/DisplayLogo');
const styles = require('../../styles');


class SignUp extends Component {
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
				<UInput title="Re-enter Password"/>
		
				<View style={styles.buttons}>
					<StartButton title="Agree & Register" onPress={this.gotoRegister.bind(this)} />

				</View>
				

			</View>
		</View> 
    );
  }
  gotoRegister() {
	  this.props.navigator.push({
		  id: 'register',
		  name: 'register',
	  });
	  
  }

}



module.exports = SignUp;