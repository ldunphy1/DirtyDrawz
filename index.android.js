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
import Order from './src/pages/order'
import styles from './src/pages/styles'
import Test from './src/pages/test'

//commented out for testing
/*class dirtydrawz extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Navigator
        initialRoute={{id: 'login', name: 'login'}}
        renderScene={this.renderScene.bind(this)}
      />)
  }

  renderScene (route, navigator) {
    if (route.id === 'login') {
      return (
        <LoginPage
          navigator={navigator}
          firebaseApp={firebaseApp} />
      )
    } else if (route.id === 'register') {
      return (
        <RegistrationPage
          navigator={navigator} />
      )
    } else if (route.id === 'passrecover') {
      return (
        <PassRecoveryPage
          navigator={navigator} />
      )
    } else if (route.id === 'resetpass') {
      return (
        <ResetPasswordPage
          navigator={navigator} />
      )
    } else if (route.id === 'signup') {
      return (
        <SignUpPage
          navigator={navigator} 
          firebaseApp={firebaseApp}/>
      )
    } else if (route.id === 'account') {
      return (
        <AccountPage
          navigator={navigator} />
      )
    } else if (route.id === 'order') {
      return (
        <OrderPage
          navigator={navigator} />
      )
    } else if (route.id === 'pricing') {
      return (
        <PricingPage
          navigator={navigator} />
      )
    } else if (route.id === 'faq') {
      return (
        <FAQPage
          navigator={navigator} />
      )
    }
    return this.noRoute(navigator)
  }

  noRoute (navigator) {
    return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          onPress={() => navigator.pop()}>
          <Text style={{color: 'red', fontWeight: 'bold'}}> Hello please index.js at renderScene I am confused </Text>
        </TouchableOpacity>
      </View>
    )
  }
}*/

class dirtydrawz extends Component {
  constructor(props){
    super(props)
    this.state = {
      page:null
    }
  }
  componentWillMount(){
    const unsubscribe = firebaseApp.auth().onAuthStateChanged((user) => {
      if(user != null){
        this.setState({page: Test})
        return
      }
      this.setState({page: Login})
      unsubscribe()
    })
  }
  render(){
    if(this.state.page){
      return(
        <Navigator
          initialRoute = {{component: this.state.page}}
          configureScene = {() => {
            return Navigator.SceneConfigs.FloatFromRight
          }}
          renderScene = {(route, navigator) => {
            if(route.component){
              return React.createElement(route.component, {navigator, firebaseApp})
            }
          }} />
      )
    } else{
      return (
        <View style = {styles.container}>
          <ActivityIndicator size = "large" />
        </View>
    )
    }
  }
}

AppRegistry.registerComponent('dirtydrawz', () => dirtydrawz)
