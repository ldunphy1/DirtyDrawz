// *
 // * Sample React Native App
 // * https://github.com/facebook/react-native
 // * @flow


// import React, { Component } from 'react';
// import {
  // AppRegistry,
  // StyleSheet,
  // Text,
  // View
// } from 'react-native';

// class AwesomeProject extends Component {
  // render() {
    // return (
      // <View style={styles.container}>
        // <Text style={styles.welcome}>
          // Welcome to React Native!
        // </Text>
        // <Text style={styles.instructions}>
          // Hello World! My name is Alex Bennett! 
		  // This is my first attempt at developing
		  // an Android application! 
        // </Text>
  
      // </View>
    // );
  // }
// }

// const styles = StyleSheet.create({
  // container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  // },
  // welcome: {
    // fontSize: 20,
    // textAlign: 'center',
    // margin: 10,
  // },
  // instructions: {
    // textAlign: 'center',
    // color: '#333333',
    // marginBottom: 5,
  // },
// });

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);

// import React, { Component } from 'react';
// import ReactNative from 'react-native';
// import {
  // AppRegistry,
  // StyleSheet,
  // Text,
  // View
// } from 'react-native';

// const StartButton = require('./android/components/StartButton'); 
// const UInput = require('./android/components/UInput');
// const DisplayLogo = require('./android/components/DisplayLogo');
// const styles = require('./styles.js');





// class AwesomeProject extends Component {
  // render() {
    // return (
		
		// <View style={styles.container}>
			// <View style={styles.logoSet}>
				// <DisplayLogo />
			// </View>
		
			// <View style={styles.loginInfo}>
				// <UInput title="Username"/>
				// <UInput title="Password"/>
		
				// <View style={styles.buttons}>
					// <StartButton title="Login" onpress={"()" ==""> {}} />

					// <StartButton title="Register" onpress={"()" == ""> {}} />
				// </View>
			// </View>



		// </View> 
		
    // );
  // }
// }





			

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);

import React, { Component } from 'react';
import ReactNative from 'react-native';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
} from 'react-native';

var LoginPage = require('./android/pages/login')
var RegistrationPage = require('./android/pages/registration')
var PassRecoveryPage = require('./android/pages/passwordRecovery')
var ResetPasswordPage = require('./android/pages/resetPassword')
var SignUpPage = require('./android/pages/signUp')

class AwesomeProject extends Component {
	// renderScene(route, navigator) { 
		// return <route.component navigator={navigator} /> 
		// }
  render() {
		return (
			<Navigator
				initialRoute ={{id:'login', name:'login'}}
				renderScene={this.renderScene.bind(this)}
				/>
				// configureScene={(route) => {
					// if (route.sceneConfig) {
						// return route.sceneConfig;
					// }
					// return Navigator.SceneConfigs.FloatFromRight;
				 // }} 
				 
			);
  }
  
  renderScene(route, navigator) {
	  var routeID = route.id;
	  if(routeID === 'login') {
		  return (
		  <LoginPage
			navigator={navigator} />
			);
	  }
	  if(routeID === 'register') {
		  return (
		  <RegistrationPage
			navigator={navigator} />
			);
	  }
	  if(routeID === 'passrecover') {
		  return (
		  <PassRecoveryPage
			navigator={navigator} />
		  );
	  }
	  if(routeID === 'resetpass') {
		  return (
		  <ResetPasswordPage
			navigator={navigator} />
			);
	  }
	  if(routeID === 'signup') {
		  return (
		  <SignUpPage
			navigator={navigator} />
			);
	  }
	  return this.noRoute(navigator);
  }
  noRoute(navigator) {
	  return (
	  <View styel={{flex:1, alighItems: 'stretch', justifyContent: 'center'}}>
		<TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
			onPress={() => navigator.pop()}>
			<Text style={{color: 'red', fontWeight: 'bold'}}> Hello please index.js at renderScene I am confused </Text> 
			</TouchableOpacity>
		</View>
		);
  }
}

			
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
