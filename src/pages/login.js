'use strict'

import React, { Component } from 'react'

import {
  AppRegistry,
  View,
  Navigator,
  Image,
  TextInput,
  AsyncStorage
} from 'react-native'

import Button from '../components/Button'
import styles from './styles'

export default class LoginPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }

    this.gotoOrder = this.gotoOrder.bind(this)
  }

  on_username_change (para) {
    this.setState({ username: para })
    this.props.msger_username(para)
  }

  on_passwd_change (para) {
    this.setState({ password: para })
    this.props.msger_passwd(para)
  }

  render () {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
        />
    )
  }

  renderScene (route, navigator) {
    return (
      <View style={styles.container}>
        <Image source={require('./resources/Logo.jpg')} style={styles.logos} />
        <View style={styles.loginInfo}>
          <TextInput
            placeholder='Username'
            style={styles.infoText}
            onChangeText={(para) => this.on_username_change(para)}
            value={this.state.username}
          />
          <TextInput
            placeholder='Password'
            style={styles.infoText}
            onChangeText={(para) => this.on_passwd_change(para)}
            value={this.state.password}
          />

          <View style={styles.buttons}>
            <Button title='Login' onPress={this.gotoOrder.bind(this)} />

            <Button title='Register' onPress={this.gotoSignUp.bind(this)} />
          </View>

          <View style={styles.buttons}>
            <Button title='Forgot Password' onPress={this.gotoPassRecover.bind(this)} />
          </View>
        </View>
      </View>
    )
  }

  gotoOrder () {
    this.setState({
      loading: true
    })
    // Log in and display an alert to tell the user what happened.
    this.props.firebase.auth().signInWithEmailAndPassword(this.state.email,
      this.state.password).then((userData) => {
        this.setState({
          loading: false
        })
        AsyncStorage.setItem('userData', JSON.stringify(userData))
        this.props.navigator.push({
          id: 'order',
          name: 'order'
        })
      }
    ).catch((error) => {
      this.setState({
        loading: false
      })
      alert('Login Failed. Please try again' + error)
    })
  }

  gotoSignUp () {
    this.props.navigator.push({
      id: 'signup',
      name: 'signup'
    })
  }

  gotoPassRecover () {
    this.props.navigator.push({
      id: 'passrecover',
      name: 'passrecover'
    })
  }
}

AppRegistry.registerComponent('Login', () => LoginPage)
