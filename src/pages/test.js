'use strict'
import{
    AppRegistry,
    ActivityIndicator,
    View
} from 'react-native'
import React, {Component} from 'react'
import Login from './login'
import styles from './styles'
import Button from '../components/Button'

export default class Test extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true
        }
    }
    componentWillMount(){
        const userData = this.props.firebaseApp.auth().currentUser
        this.setState({
            user: userData,
            loading: false
        })
    }
    render(){
        const content = this.state.loading ? <ActivityIndicator size = "large"/> :
        this.state.user &&
        <View style={styles.buttons}>
        <Button title='Logout' onPress={this.logout.bind(this)} />
        </View>
        return(
            <View style = {styles.container}>
                {content}
            </View>
        )
    }
    logout(){
        this.props.firebaseApp.auth().signOut().then(() => {
            this.props.navigator.push({
                id: 'login',
                name: 'login'
            })
        })
    }
}
