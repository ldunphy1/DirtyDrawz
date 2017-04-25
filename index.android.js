import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from 'react-native'

import firebaseApp from './src/firebase/client'

import Login from './src/pages/login'
import Signup from './src/pages/signUp'
import Account from './src/pages/account'
import Order from './src/pages/order'
import styles from './src/pages/styles'
import Faq from './src/pages/faq'
import Pricing from './src/pages/pricing'
import OrderConfirm from './src/pages/orderConfirm'
import PassRecover from './src/pages/passwordRecovery'


class dirtydrawz extends Component {
  constructor(props){
    super(props)
    this.state={
      id: ''
    }
  }
  componentWillMount(){
    const unsubscribe = firebaseApp.auth().onAuthStateChanged((user) => {
      if(user != null){
        this.setState({
          id: 'order'
        })
        return
      }
      this.setState({
        id: 'login'
      })
      unsubscribe()
    })
  }
  
  render(){
    if(this.state.id){
      return(
        <Navigator
          initialRoute = {{
            id: this.state.id}}
          configureScene = {() => {
            return Navigator.SceneConfigs.FloatFromRight
          }}
          renderScene = {(route, navigator) => {
            if(route.id === 'passrecover'){
              return(
                <PassRecover
                  navigator={navigator}
                  firebaseApp={firebaseApp} />
              )
            }else if(route.id === 'logout'){
              return (
                <Login
                navigator={navigator}
                firebaseApp={firebaseApp} />
              )
            }else if(route.id === 'login'){
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
            } else if(route.id === 'faq'){
              return(
                <Faq
                  navigator={navigator}
                />
              )
            } else if(route.id === 'pricing'){
              return(
                <Pricing
                  navigator={navigator}
                />
              )
            } else if(route.id === 'orderconfirm'){
              return(
                <OrderConfirm
                  firebaseApp={firebaseApp}
                  navigator={navigator}/>
              )
            }else{
              return (
                <View style = {styles.container}>
                  <ActivityIndicator size = "large" />
                </View>
              )
            }
          }} />
      )}else{
        return (
          <View style = {styles.container}>
            <ActivityIndicator size = "large" />
          </View>
        )
      }
  }
}

AppRegistry.registerComponent('dirtydrawz', () => dirtydrawz)
