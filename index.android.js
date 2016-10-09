import React, { Component } from 'react';
import ReactNative from 'react-native';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

const StartButton = require('./android/components/StartButton'); 
const UInput = require('./android/components/UInput');
const DisplayLogo = require('./android/components/DisplayLogo');
const styles = require('./styles.js');





class AwesomeProject extends Component {
  render() {
    return (
		
		<View style={styles.container}>
			<View style={styles.logoSet}>
				<DisplayLogo />
			</View>
		
			<View style={styles.loginInfo}>
				<UInput title="Username"/>
				<UInput title="Password"/>
		
				<View style={styles.buttons}>
					<StartButton title="Login" onpress={"()" ==""> {}} />

					<StartButton title="Register" onpress={"()" == ""> {}} />
				</View>
			</View>



		</View> 
		
    );
  }
}





			

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
