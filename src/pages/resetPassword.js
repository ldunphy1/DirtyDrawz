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
	Image,
	TextInput,
} from 'react-native'; 

const Button = require('./components/Button'); 
const UInput = require('./components/UInput');
const DisplayLogo = require('./components/DisplayLogo');
const styles = require('./styles');


class ResetPassword extends Component {
	constructor(props){
    super(props);
    this.state={
	  password:'',
	  repassword:'',
    }
  }
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
			<Image source={require('./resources/Logo.jpg')} style={styles.logos} />
			<View style={styles.loginInfo}>		
				<Text style={styles.regularText}>
				Enter New Password
				</Text>
				<TextInput 
					placeholder = "Password"
					style = {styles.infoText}
					onChangeText={(text) => this.setState({password:text})}
					value={this.state.password}
				/>
				<TextInput 
					placeholder = "Re-enter Password"
					style = {styles.infoText}
					onChangeText={(text) => this.setState({repassword:text})}
					value={this.state.password}
				/>
				
				<View style={styles.buttons}>
					<Button title="Save" onPress={this.gotoLogin.bind(this)} />
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