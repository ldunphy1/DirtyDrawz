/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/*
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class dirty extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('dirty', () => dirty);*/
import React, { Component } from 'react';
import ReactNative from 'react-native';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity,
} from 'react-native';

var LoginPage = require('./android/pages/login')
var RegistrationPage = require('./android/pages/registration')
var PassRecoveryPage = require('./android/pages/passwordRecovery')
var ResetPasswordPage = require('./android/pages/resetPassword')
var SignUpPage = require('./android/pages/signUp')
var AccountPage = require('./android/pages/account')
var OrderPage = require('./android/pages/order')
var PricingPage = require('./android/pages/pricing')
var FAQPage = require('./android/pages/faq')

class dirtydrawz extends Component {
    
    constructor(props) {
        super(props);
        this._setNavigatorRef = this._setNavigatorRef.bind(this);
    }
    render() {
        return (
                <Navigator
                initialRoute ={{id:'login', name:'login'}}
                renderScene={this.renderScene.bind(this)}
                />
                );
    }
    
    renderScene(route, navigator) {
        var routeID = route.id;
        if(routeID === 'login') {
            return (
                    <LoginPage
                    navigator={navigator} />
                    );
        }
        if(routeID === 'register') {
            return (
                    <RegistrationPage
                    navigator={navigator} />
                    );
        }
        if(routeID === 'passrecover') {
            return (
                    <PassRecoveryPage
                    navigator={navigator} />
                    );
        }
        if(routeID === 'resetpass') {
            return (
                    <ResetPasswordPage
                    navigator={navigator} />
                    );
        }
        if(routeID === 'signup') {
            return (
                    <SignUpPage
                    navigator={navigator} />
                    );
        }
        if(routeID === 'account') {
            return (
                    <AccountPage
                    navigator={navigator} />
                    );
        }
        if(routeID === 'order')	{
            return (
                    <OrderPage
                    navigator={navigator} />
                    );
        }
        if(routeID === 'pricing')	{
            return(
                   <PricingPage
                   navigator={navigator} />
                   );
        }
        if(routeID === 'faq')	{
            return(
                   <FAQPage
                   navigator={navigator} />
                   );
        }
        return this.noRoute(navigator);
    }
    noRoute(navigator) {
        return (
                <View styel={{flex:1, alighItems: 'stretch', justifyContent: 'center'}}>
                <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                onPress={() => navigator.pop()}>
                <Text style={{color: 'red', fontWeight: 'bold'}}> Hello please index.js at renderScene I am confused </Text>
                </TouchableOpacity>
                </View>
                );
    }
    
    _setNavigatorRef(navigator) {
        if (navigator !== this._navigator) {
            this._navigator = navigator;
            
            if (navigator) {
                var callback = (event) => {
                    console.log(
                                `NavigatorMenu: event ${event.type}`,
                                {
                                route: JSON.stringify(event.data.route),
                                target: event.target,
                                type: event.type,
                                }
                                );
                };
                // Observe focus change events from the owner.
                this._listeners = [
                                   navigator.navigationContext.addListener('willfocus', callback),
                                   navigator.navigationContext.addListener('didfocus', callback),
                                   ];
            }
        }
    }
}


AppRegistry.registerComponent('dirtydrawz', () => dirtydrawz);
