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
import Faq from './src/pages/faq'
import Pricing from './src/pages/pricing'

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
            } else if(route.id === 'reg'){
              return(
                <Account
                  page_type = 'reg'
                  navigator={navigator}
                  firebaseApp={firebaseApp} />
            )
            } else if(route.id === 'account'){
              return(
                <Account
                  page_type = 'acc'
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
            } else if(route.id === 'faq'){
                <Faq
                  navigator={navigator}
                />
            } else if(route.id === 'pricing'){
                <Pricing
                  navigator={navigator}
                />
            } else{
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
