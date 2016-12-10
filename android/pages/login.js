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
const styles = require('./styles');

class LoginPage extends Component {
	constructor(props){
    super(props);
    this.state={
      username:'',
	  password:'',
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
					value={this.state.username}
				/>
				<TextInput 
					placeholder = "Password"
					style = {styles.infoText}
					onChangeText={(text) => this.setState({password:text})}
					value={this.state.password}
				/>

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