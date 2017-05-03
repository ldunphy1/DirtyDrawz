'use strict'

import React, { Component } from 'react'
import {
  View,
  Navigator,
  Image,
  TextInput,
  AppRegistry,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native'

import Button from '../components/Button'
import styles from './styles'
import Login from './login'

export default class PassRecover extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: ''
    }
  }

  gotoResetPass(){
    this.props.firebaseApp.auth().sendPasswordResetEmail(this.state.email).then(() =>{
      alert('Please check your email to reset your password')
      this.props.navigator.push({
        id: 'login',
        name: 'login'
      })
    }).catch((error) =>{
      alert(error.message)
    })
  }

  render () {
    return (
      <KeyboardAvoidingView behavior="position" style={styles.container}>
        <View style={styles.container}>
          <Image source={require('./resources/Logo.jpg')} style={styles.logos} />
          <View style={styles.loginInfo}>
            <TextInput
              placeholder='Enter Email Address'
              style={styles.infoText}
              onChangeText={(text) => this.setState({email: text})}
              value={this.state.email}
            />
            <View style={styles.buttons}>
              <Button title='Reset Password' onPress={this.gotoResetPass.bind(this)} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }


}