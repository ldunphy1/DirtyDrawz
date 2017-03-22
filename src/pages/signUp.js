'use strict'
import React, { Component } from 'react'
import {
    View,
    Navigator,
    Image,
    TextInput
} from 'react-native'
import Button from '../components/Button'
import styles from './styles'
import firebaseApp from '../firebase/client'

export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: true,
            email: '',
            password: '',
            repassword: ''
        }
    }
    signUp() {
        this.setState({
            loaded: false
        })
        firebaseApp.createUser({
            'email': this.state.email,
            'password': this.state.password,
        }, (error, userData) => {
            if (error) {
                switch (error.code) {
                    case "EMAIL_TAKEN":
                        alert("The new user account cannot be created because the email is already in use.")
                        break
                    case "INVALID_EMAIL":
                        alert("The specified email is not a valid email.")
                        break
                    default:
                        alert("Error creating user.")
                }
            }else {
                alert("Your account was created!")
            }
            this.setState({
                email: '',
                password: '',
                repassword: '',
                loaded: ''
            })
        })
    }
    gotoRegister() {
        this.props.navigator.push({
            id: 'register',
            name: 'register'
        })
    }

    render() {
        return ( <
            Navigator renderScene = { this.renderScene.bind(this) }
            />
        )
    }

    renderScene(route, navigator) {
        return ( 
            <View style = { styles.container } >
                <Image 
                    source = { require('./resources/Logo.jpg') }
                    style = { styles.logos } 
                /> 
                <View style = { styles.loginInfo } >
                    <TextInput 
                        placeholder = 'Email address'
                        style = { styles.infoText }
                        onChangeText = {(text) => this.setState({ email: text })}
                        value = { this.state.email }
                    /> 
                    <TextInput 
                        placeholder = 'Password'
                        style = { styles.infoText }
                        onChangeText = {(text) => this.setState({ password: text })}
                        value = { this.state.password }
                        secureTextEntry = { true }
                    /> 
                    <TextInput 
                        placeholder = 'Re-enter Password'
                        style = { styles.infoText }
                        onChangeText = {(text) => this.setState({ repassword: text })}
                        value = { this.state.repassword }
                    /> 
                    <View style = { styles.buttons } >
                        <Button 
                            title = 'Agree & Register'
                            onPress = { this.gotoRegister.bind(this) }
                        /> 
                    </View> 
                </View> 
            </View>
        )
    }
}

module.exports = SignUp