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
	TextInput
} from 'react-native'; 

const Button = require('./components/Button'); 
const styles = require('./styles');


class SignUp extends Component {
	constructor(props){
    super(props);
    this.state={
      username:'',
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
				<TextInput 
					placeholder = "Username"
					style = {styles.infoText}
					onChangeText={(text) => this.setState({username:text})}
					value={this.state.password}
				/>
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
					<Button title="Agree & Register" onPress={this.gotoRegister.bind(this)} />
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