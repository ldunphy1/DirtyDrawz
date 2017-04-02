import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from 'react-native'

import firebaseApp from './src/firebase/client'

import Login from './src/pages/login'
import Signup from './src/pages/signUp'
import Account from './src/pages/account'
import Order from './src/pages/order'
import styles from './src/pages/styles'
import Test from './src/pages/test'

class dirtydrawz extends Component {
  constructor(props){
    super(props)
  }
  componentWillMount(){
    const unsubscribe = firebaseApp.auth().onAuthStateChanged((user) => {
      if(user != null){
        this.setState({
          id: 'order',
          name: 'order'
        })
        return
      }
      this.setState({
        id: 'login',
        name: 'login'
      })
      unsubscribe()
    })
  }
  render(){
      return(
        <Navigator
          initialRoute = {{
            id: 'login',
            name: 'login'
          }}
          configureScene = {() => {
            return Navigator.SceneConfigs.FloatFromRight
          }}
          renderScene = {(route, navigator) => {
            if(route.id === 'login'){
              return (
                <Login
                navigator={navigator}
                firebaseApp={firebaseApp} />
              )
            } else if(route.id === 'signup'){
              return(
                <Signup
                  navigator={navigator}
                  firebaseApp={firebaseApp} />
              )
            } else if(route.id === 'account'){
              return(
                <Account
                  navigator={navigator}
                  firebaseApp={firebaseApp} />
              )
            } else if(route.id === 'order'){
              return(
                <Order
                  navigator={navigator}
                  firebaseApp={firebaseApp} />
              )
            } else if(route.id === 'test'){
              return(
                <Test
                  navigator={navigator}
                  firebaseApp={firebaseApp} />
              )
            }else{
              return (
                <View style = {styles.container}>
                  <ActivityIndicator size = "large" />
                </View>
              )
            }
          }} />
      )
  }
}

AppRegistry.registerComponent('dirtydrawz', () => dirtydrawz)
