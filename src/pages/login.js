'use strict'

import React, { Component } from 'react'
import {
  AppRegistry,
  View,
  Navigator,
  Image,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native'

import Button from '../components/Button'
import styles from './styles'

export default class LoginPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      email: '',
      password: ''
    }
  }
  render(){
    const content = this.state.loading ? <ActivityIndicator size = "large"/> :
    <KeyboardAvoidingView behavior="position" style={styles.container}>
      <View style={styles.container}>
          <Image source={require('./resources/Logo.jpg')} style={styles.logos} />
          <View style={styles.loginInfo}>
            <TextInput
              placeholder='Email address'
              style={styles.infoText}
              onChangeText={(para) => this.setState({email:para})}
              value={this.state.email}
            />
            <TextInput
              placeholder='Password'
              style={styles.infoText}
              onChangeText={(para) => this.setState({password:para})}
              value={this.state.password}
              secureTextEntry={true}
            />
            <View style={styles.buttons}>
              <Button title='Login' onPress={this.login.bind(this)} />
              <Button title='Signup' onPress={this.gotoSignUp.bind(this)} />
            </View>
            <View style={styles.buttons}>
              <Button title='Fogot Password' onPress={this.gotoPassRecover.bind(this)} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      return(
        <View style = {styles.container}>{content}</View>
      )
  }
  login(){
    this.setState({
      loading: true
    })
    this.props.firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((userData) => {
      this.setState({
        loading: false
      })
      this.props.navigator.push({
        id: 'order',
        name: 'order'
      })
    }).catch((error) => {
      this.setState({
        loading: false
      })
      alert('Login Failed. Please try again' + error.message)
    })
  }
  gotoSignUp(){
    this.props.navigator.push({
      id: 'signup',
      name: 'signup'
    })
  }
  gotoPassRecover(){
    this.props.navigator.push({
      component: PassRecover
    })
  }
}

AppRegistry.registerComponent('Login', () => Login)
