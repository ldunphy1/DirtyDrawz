'use strict'

import React, { Component } from 'react'
import {
    AppRegistry,
    View,
    Navigator,
    Image,
    TextInput,
    ActivityIndicator,
    TouchableHighlight,
    KeyboardAvoidingView
} from 'react-native'

import Button from '../components/Button'
import styles from './styles'

export default class Signup extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            email: '',
            password: '',
            repassword: ''
        }
    }
    signup(){
        this.setState({
            loading: true
        })
        if(this.state.password != this.state.repassword){
            alert('Passwords do not match!')
            this.props.navigator.push({
                id: 'signup',
                name: 'signup'
            })
        }else{
            this.props.firebaseApp.auth().createUserWithEmailAndPassword(
                this.state.email,
                this.state.password
            ).then(() => {
                alert('Your account was created!')
                this.props.navigator.push({
                    id: 'reg',
                    name: 'reg'
                })
            }).catch((error) => {
                this.setState({
                    loading: false
                })
                alert('Account creation failed: ' + error.message)
            }).then(() => {
                alert('Your account was created!')
                this.props.navigator.push({
                    id: 'reg',
                    name: 'reg'
                    })
                })
        }
    }
    render(){
        const content = this.state.loading ? <ActivityIndicator size = "large" /> :
        <KeyboardAvoidingView behavior="position" style={styles.container}>
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
                        placeholder = 'Confirm Password'
                        style = { styles.infoText }
                        onChangeText = {(para) => this.setState({ repassword: para }) }
                        value = { this.state.repassword }
                    />
                    <View style = { styles.buttons } >
                        <Button title = 'Agree & Register' onPress = { this.signup.bind(this) }/>
                    </View> 
                </View>
            </View>
        </KeyboardAvoidingView>
            return(
                <View style = {styles.container}>
                    {content}
                </View>
            )
    }
}