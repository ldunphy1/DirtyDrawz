'use strict'

import React, { Component } from 'react'
import {
    AppRegistry,
    View,
    Navigator,
    Image,
    TextInput
} from 'react-native'

import Button from '../components/Button'
import styles from './styles'

export default class SignUpPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            email: '',
            password: '',
            repassword: ''
        }
    }

    render() {
        return (
            <Navigator renderScene = { this.renderScene.bind(this) }/>
        )
    }

    renderScene(route, navigator) {
        return ( 
            <View style = { styles.container } >
                <Image source = { require('./resources/Logo.jpg') } style = { styles.logos }/> 
                <View style = { styles.loginInfo } >
                    <TextInput 
                    placeholder = 'Email address'
                    style = { styles.infoText }
                    onChangeText = {(para) => this.setState({ email: para }) }
                    value = { this.state.email }
                    />
                    <TextInput 
                        placeholder = 'Password'
                        style = { styles.infoText }
                        onChangeText = {(para) => this.setState({ password: para }) }
                        value = { this.state.password }
                    />
                    <TextInput 
                        placeholder = 'Re-enter Password'
                        style = { styles.infoText }
                        onChangeText = {(para) => this.setState({ repassword: para }) }
                        value = { this.state.repassword }
                    /> 
                    <View style = { styles.buttons } >
                        <Button title = 'Agree & Register' onPress = { this.gotoRegister.bind(this) }/>
                    </View> 
                </View> 
            </View>
        )
    }
    gotoRegister() {
        this.setState({
            loading: true
        })
        if(this.state.password != this.state.repassword){
            alert("Passwords do not match!")
            this.props.navigator.push({
                id: 'signup',
                name: 'signup'
            })
        }
        else{
            this.props.firebaseApp.auth().createUserWithEmailAndPassword(
                this.state.email,
                this.state.password).then(() => {
                alert('Your account was created!')
                this.setState({
                    loading: false
                })
                this.props.navigator.push({
                    id: 'register',
                    name: 'register'
                })
            }).catch((error) => {
                this.setState({
                    loading: false
                })
                alert('Account creation failed: ' + error)
                this.props.navigator.push({
                    id: 'signup',
                    name: 'signup'
                })
            })
        }
    }
}

AppRegistry.registerComponent('SignUp', () => SignUpPage)