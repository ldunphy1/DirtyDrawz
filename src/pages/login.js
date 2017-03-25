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
      loaded: false,
      email: '',
      password: ''
    }
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
    this.props.firebaseApp.auth().signInWithEmailAndPassword(
      this.state.email,
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
      this.props.navigator.push({
        id: 'login',
        name: 'login'
      })
      
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
