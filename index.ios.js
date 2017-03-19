import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  View,
  Navigator,
  TouchableOpacity
} from 'react-native'

var LoginPage = require('./src/pages/login')
var RegistrationPage = require('./src/pages/registration')
var PassRecoveryPage = require('./src/pages/passwordRecovery')
var ResetPasswordPage = require('./src/pages/resetPassword')
var SignUpPage = require('./src/pages/signUp')
var AccountPage = require('./src/pages/account')
var OrderPage = require('./src/pages/order')
var PricingPage = require('./src/pages/pricing')
var FAQPage = require('./src/pages/faq')

class dirtydrawz extends Component {

  constructor (props) {
    super(props)
    this._setNavigatorRef = this._setNavigatorRef.bind(this)
    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      passwd: '',
      address: '',
      email: '',
      phone: '',
      zipcode: ''
    }
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
          msger_username={(para) => this.setState({username: para})}
          msger_passwd={(para) => this.setState({passwd: para})}
          test={this.state.first_name}
          navigator={navigator} />
      )
    } else if (route.id === 'register') {
      return (
        <RegistrationPage
          msger_first_name={(para) => this.setState({first_name: para})}
          msger_last_name={(para) => this.setState({last_name: para})}
          msger_address={(para) => this.setState({address: para})}
          msger_email={(para) => this.setState({email: para})}
          msger_phone={(para) => this.setState({phone: para})}
          msger_zipcode={(para) => this.setState({zipcode: para})}
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
          msger_first_name={(para) => this.setState({first_name: para})}
          msger_last_name={(para) => this.setState({last_name: para})}
          msger_address={(para) => this.setState({address: para})}
          msger_email={(para) => this.setState({email: para})}
          msger_phone={(para) => this.setState({phone: para})}
          msger_zipcode={(para) => this.setState({zipcode: para})}
          first_name={this.state.first_name}
          last_name={this.state.last_name}
          email={this.state.email}
          phone={this.state.phone}
          address={this.state.address}
          zipcode={this.state.zipcode}
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

  _setNavigatorRef (navigator) {
    if (navigator !== this._navigator) {
      this._navigator = navigator

      if (navigator) {
        var callback = (event) => {
          console.log(
            `NavigatorMenu: event ${event.type}`,
            {
              route: JSON.stringify(event.data.route),
              target: event.target,
              type: event.type
            }
          )
        }
        // Observe focus change events from the owner.
        this._listeners = [
          navigator.navigationContext.addListener('willfocus', callback),
          navigator.navigationContext.addListener('didfocus', callback)
        ]
      }
    }
  }
}

AppRegistry.registerComponent('dirtydrawz', () => dirtydrawz)
