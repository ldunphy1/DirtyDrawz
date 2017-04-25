'use strict'

import React, { Component } from 'react'
import {
  Text,
  ScrollView,
  View,
  Navigator,
  AsyncStorage
} from 'react-native'

import Button from '../components/Button'
import styles from './styles'
import RegistrationItem from '../components/RegistrationItem'

export default class OrderConfirm extends Component{
  constructor(props){
    super(props)
    this.state = {
      info_billing_address:'',
      datePickup:'',
      dateDropoff:'',
      wash_temperature:'',
      dry_setting:'',
      fragrance_free:'',
      add_bleach:'',
      sort_colors:'',
      Suit:'',
      Pants:'',
      Shirt:'',
      Jacket:'',
      Blouse:'',
      Goose:'',
      note:''
    }
  }
                  /*datePickup:state.datePickup,
                dateDropoff:state.dateDropoff,
                wash_temperature:state.wash_temperature,
                dry_setting:state.dry_setting,
                fragrance_free:state.fragrance_free,
                add_bleach:state.add_bleach,
                sort_colors:state.sort_colors,
                Suit:state.Suit,
                Pants:state.Pants,
                Shirt:state.Shirt,
                Jacket:state.Jacket,
                Blouse:state.Blouse,
                Goose:state.Goose,
                note:state.note */
  componentWillMount(){
    AsyncStorage.getItem("info_billing_address").then((value) => {this.setState({info_billing_address:value});}).done();
    AsyncStorage.getItem("datePickup").then((value) => {this.setState({datePickup:value});}).done();
    AsyncStorage.getItem("wash_temperature").then((value) => {this.setState({wash_temperature:value});}).done();
    AsyncStorage.getItem("dry_setting").then((value) => {this.setState({dry_setting:value});}).done();
    AsyncStorage.getItem("fragrance_free").then((value) => {this.setState({fragrance_free:value});}).done();
    AsyncStorage.getItem("add_bleach").then((value) => {this.setState({add_bleach:value});}).done();
    AsyncStorage.getItem("sort_colors").then((value) => {this.setState({sort_colors:value});}).done();
    AsyncStorage.getItem("order_info").then((value) => {this.setState({order_info:value});}).done();
    AsyncStorage.getItem("Suit").then((value) => {this.setState({Suit:value});}).done();
  }
  render(){
    const content = 
      <View style={{flex:1}}>
        <ScrollView automaticallyAdjustContentInsets={false} onScroll={() => { console.log('onScroll!') }} scrollEventThrottle={200}>
          <View style={styles.block}>
            <RegistrationItem ItemType='text' content={this.state.info_billing_address} caption='location: '/>
            <RegistrationItem ItemType='text' content={this.state.note} caption='note: '/>
          </View>
          <View style={styles.block}>
              <View>
              <Text style={{fontFamily:'Cochin',fontSize:25}}>laundry</Text>
              </View>
              <RegistrationItem ItemType='text' content={this.state.datePickup} caption='pick up time: '/>
              <RegistrationItem ItemType='text' content={this.state.dateDropoff} caption='drop off time: '/>
              <RegistrationItem ItemType='text' content={this.state.wash_temperature} caption='wash temperature: '/>
              <RegistrationItem ItemType='text' content={this.state.dry_setting} caption='dry setting: '/>
              <RegistrationItem ItemType='text' content={this.state.sort_colors} caption='sort colors: '/>
              <RegistrationItem ItemType='text' content={this.state.fragrance_free} caption='fragrance free: '/>
              <RegistrationItem ItemType='text' content={this.state.add_bleach} caption='add bleach: '/>
            </View>
            <View style={styles.block}>
                <View>
                <Text style={{fontFamily:'Cochin',fontSize:25}}>dry cleaning</Text>
                </View>
                <RegistrationItem ItemType='text' content={this.state.Suit} caption='suit number: '/>
                <RegistrationItem ItemType='text' content={this.state.Shirt} caption='shirt number: '/>
                <RegistrationItem ItemType='text' content={this.state.Jacket} caption='jacket number: '/>
                <RegistrationItem ItemType='text' content={this.state.Pants} caption='pants number: '/>
                <RegistrationItem ItemType='text' content={this.state.Blouse} caption='blouse number: '/>
                <RegistrationItem ItemType='text' content={this.state.Goose} caption='goose number: '/>
            </View>
            <View style={styles.buttons}>
                <Button title='Back' onPress={this.goBack.bind(this)} />
                <Button title='Place Order' onPress={this.placeOrder.bind(this)} />
            </View>
          </ScrollView>
        </View>
      return(
        <View style = {{flex:1}}>{content}</View>
      )
  }
  goBack(){
    this.props.navigator.pop()
  }
  placeOrder(){
    var user = this.props.firebaseApp.auth().currentUser;
    var userRef = this.props.firebaseApp.database().ref('/order/'+user.uid);
    var order_number = 0;
    userRef.once('value', (snap)=>{
      order_number = snap.child('total_order_number').val();
    })
    alert(user.id);
    alert('hei');
    this.props.firebaseApp.database().ref('/order/'+user.uid+'/NO'+order_number.toString()).set({
        info_billing_address:this.state.info_billing_address,
        datePickup:this.state.datePickup,
        dateDropoff:this.state.dateDropoff,
        note:this.state.note    
    });
    this.props.firebaseApp.database().ref('/order/'+user.uid+'/NO'+order_number.toString()+'/Laundry').set({
        wash_temperature:this.state.wash_temperature,
        dry_setting:this.state.dry_setting,
        fragrance_free:this.state.fragrance_free,
        add_bleach:this.state.add_bleach,
        sort_colors:this.state.sort_colors,
    })
    this.props.firebaseApp.database().ref('/order/'+user.uid+'/NO'+order_number.toString()+'/Dry_Cleaning').set({
        Suit:this.state.Suit,
        Pants:this.state.Pants,
        Shirt:this.state.Shirt,
        Jacket:this.state.Jacket,
        Blouse:this.state.Blouse,
        Goose:this.state.Goose,
    })
    this.props.firebaseApp.database().ref('/order/'+user.uid).set({
        total_order_number:(order_number + 1)
    });
    this.props.navigator.push({
      id: 'order'
    })
  }
}
