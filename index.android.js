import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  View,
  Navigator,
  TouchableOpacity
} from 'react-native'

import firebase from './src/firebase/client'

import LoginPage from './src/pages/login'
import RegistrationPage from './src/pages/registration'
import PassRecoveryPage from './src/pages/passwordRecovery'
import ResetPasswordPage from './src/pages/resetPassword'
import SignUpPage from './src/pages/signUp'
import AccountPage from './src/pages/account'
import OrderPage from './src/pages/order'
import PricingPage from './src/pages/pricing'
import FAQPage from './src/pages/faq'

class dirtydrawz extends Component {

  constructor (props) {
    super(props)
    // this._setNavigatorRef = this._setNavigatorRef.bind(this)
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
          firebase={firebase} />
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
          navigator={navigator} />
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
      <View style={{flex: 1, alighItems: 'stretch', justifyContent: 'center'}}>
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          onPress={() => navigator.pop()}>
          <Text style={{color: 'red', fontWeight: 'bold'}}> Hello please index.js at renderScene I am confused </Text>
        </TouchableOpacity>
      </View>
    )
  }

  // _setNavigatorRef (navigator) {
  //   if (navigator !== this._navigator) {
  //     this._navigator = navigator
  //
  //     if (navigator) {
  //       import callback = (event) => {
  //         console.log(
  //           `NavigatorMenu: event ${event.type}`,
  //           {
  //             route: JSON.stringify(event.data.route),
  //             target: event.target,
  //             type: event.type
  //           }
  //         )
  //       }
  //       // Observe focus change events from the owner.
  //       this._listeners = [
  //         navigator.navigationContext.addListener('willfocus', callback),
  //         navigator.navigationContext.addListener('didfocus', callback)
  //       ]
  //     }
  //   }
  // }
}

AppRegistry.registerComponent('dirtydrawz', () => dirtydrawz)
