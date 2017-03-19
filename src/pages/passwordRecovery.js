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


class PassRecoveryPage extends Component {
	constructor(props){
    super(props);
    this.state={
      ID:'',
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
					placeholder='Enter Username or Email'
					style = {styles.infoText}
					onChangeText={(text) => this.setState({ID:text})}
					value={this.state.ID}
				/>
				<View style={styles.buttons}>
					<Button title="Reset Password" onPress={this.gotoResetPass.bind(this)} />
				</View> 

			</View>
		</View> 
    );
  }
  gotoResetPass() {
	  this.props.navigator.push({
		  id: 'resetpass',
		  name: 'resetpass',
	  });
  }
}




module.exports = PassRecoveryPage;