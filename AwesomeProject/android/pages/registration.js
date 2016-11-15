/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

import MyScene from './components/MyScene';
import Button from './components/Button';

class RegistrationPage extends Component {
	render() {
		return (
			<Navigator
				renderScene={this.renderScene.bind(this)}
			/>
		);
	}
renderScene(route,navigator) {
    return (
      <View style={styles.container}>
        <View style={{
          flexDirection:'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <MyScene boxWidth={170} caption="First Name: "/>
          <MyScene boxWidth={170} caption="Last Name:"/>
        </View>
          <MyScene boxWidth={340} caption="Address: "/>
          <MyScene boxWidth={340} caption="E-mail: "/>
          <MyScene boxWidth={340} caption="Phone Number: "/>
          <View style={{
            flexDirection:'row',
            paddingTop: 20,
            justifyContent: 'space-around',
            alignItems: 'center',
            width:300,
          }}>
            <Button title="Back" onPress={this.gotoLogin.bind(this)} />
            <Button title="Register" onpress={"()" ==""> {}}/>
          </View>
      </View>
    );
  }


  gotoLogin() {
	  this.props.navigator.push({
		  id:'login',
		  name:'login',
	  });
	  
  }
  gotoDashboard() {
	  this.props.navigator.push({
		  component: Dashboard
	  })
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'column'
  }
});

module.exports = RegistrationPage; 