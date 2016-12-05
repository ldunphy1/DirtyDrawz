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


// // AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);



// Below this is where your actual app is! 

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
var AccountPage = require('./android/pages/account')
var OrderPage = require('./android/pages/order')
var PricingPage = require('./android/pages/pricing')
var FAQPage = require('./android/pages/faq')

class dirtydrawz extends Component {
	
	constructor(props) {
		super(props);
		this._setNavigatorRef = this._setNavigatorRef.bind(this);
	}
  render() {
		return (
			<Navigator
				initialRoute ={{id:'login', name:'login'}}
				renderScene={this.renderScene.bind(this)}
				/>				 
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
	  if(routeID === 'account') {
		  return ( 
		  <AccountPage
			navigator={navigator} />
			);
	  }
	  if(routeID === 'order')	{
		  return (
		  <OrderPage
			navigator={navigator} />
			);
	  }
	  if(routeID === 'pricing')	{
		  return(
		  <PricingPage
			navigator={navigator} />
			);
	  }
	  if(routeID === 'faq')	{
		  return(
		  <FAQPage
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
  
    _setNavigatorRef(navigator) {
    if (navigator !== this._navigator) {
      this._navigator = navigator;

      if (navigator) {
        var callback = (event) => {
          console.log(
            `NavigatorMenu: event ${event.type}`,
            {
              route: JSON.stringify(event.data.route),
              target: event.target,
              type: event.type,
            }
          );
        };
        // Observe focus change events from the owner.
        this._listeners = [
          navigator.navigationContext.addListener('willfocus', callback),
          navigator.navigationContext.addListener('didfocus', callback),
        ];
      }
    }
  }
}

			
AppRegistry.registerComponent('dirtydrawz', () => dirtydrawz);

// Above this is where your actual app is! thanks you! 

// *
 // * Sample React Native App
 // * https://github.com/facebook/react-native

// 'use strict';

// var React = require('react');
// var SideMenu = require('react-native-side-menu');
// var {
  // AppRegistry,
  // StyleSheet,
  // Text,
  // View,
  // Navigator,
// } from ;

// var ContentView = React.createClass({
  // render: function() {
    // return (
      // <View style={styles.container}>
        // <Text style={styles.welcome}>
          // Welcome to React Native!
        // </Text>
        // <Text style={styles.instructions}>
          // To get started, edit index.ios.js
        // </Text>
        // <Text style={styles.instructions}>
          // Press Cmd+R to reload,{'\n'}
          // Cmd+D or shake for dev menu
        // </Text>
      // </View>
    // );
  // }
// });

// var TestView = React.createClass({
  // render: function() {
    // return (
      // <View style={styles.container}>
        // <Text style={styles.welcome}>
          // Welcome to another page.
        // </Text>
        // <Text style={styles.instructions}>
          // Testing react native side menu with navigator.
        // </Text>
      // </View>
    // );
  // }
// });

// var Menu = React.createClass({
  // about: function() {
    // this.props.menuActions.close();
    // this.props.navigator.push({
      // component: TestView,
      // title: 'Test View',
    // });
  // },

  // render: function() {
    // return (
      // <View style={styles.sidemenu}>
        // <Text style={styles.paddingMenuItem}>Menu</Text>
        // <Text onPress={this.about} style={styles.paddingMenuItem}>About</Text>
      // </View>
    // );
  // }
// });

// var SideMenuTest = React.createClass({
  // render: function() {
    // return (
      // <Navigator
       // initialRoute={{
         // component: Something,
         // title: 'Something',
       // }}
       // configureScene={() => {
         // return Navigator.SceneConfigs.FadeAndroid;
       // }}
       // renderScene={(route, navigator) => {
         // if(route.component) {
           // return React.createElement(route.component, { navigator });
         // }
       // }}/>
    // );
  // }
// });

// var Something = React.createClass({
  // render: function() {
    // var menu = <Menu navigator={this.props.navigator}/>;
    // return (
      // <SideMenu menu={menu}>
        // <ContentView/>
      // </SideMenu>
    // );
  // }
// });

// var styles = StyleSheet.create({
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
  // sidemenu: {
    // paddingTop: 50,
  // },
  // paddingMenuItem: {
    // padding: 10,
  // },
// });

// AppRegistry.registerComponent('SideMenuTest', () => SideMenuTest);
