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
      note:'',
      estimated_price:'0',
      total_order_number:0
    }
  }
                
  componentWillMount(){
    var user = this.props.firebaseApp.auth().currentUser;
    var userRef = this.props.firebaseApp.database().ref('/order/'+user.uid);
    if (this.props.type == -1){
      var tmp_dic = {}
      AsyncStorage.multiGet([
        'info_billing_address',
        'datePickup',
        'dateDropoff',
        'wash_temperature',
        'dry_setting',
        'fragrance_free',
        'add_bleach',
        'sort_colors',
        'Suit',
        'Pants',
        'Shirt',
        'Jacket',
        'Blouse',
        'Goose',
        'note',
        'estimated_price'
      ],(err, values) => {
        values.map( (result, i, value) => {
          tmp_dic[value[i][0]] = value[i][1];
        });
        this.setState(tmp_dic);
      });

      userRef.once('value', (snap)=>{
        this.setState({total_order_number:snap.child('total_order_number').val()});
      });
    }
    else{
      var tmp = 0;
        AsyncStorage.getItem("lookforwhat").then((value) => {
          tmp = value;
        }).done();
        //this.setState({total_order_number:tmp});
        userRef.child(tmp).once('value', (snap)=>{
          this.setState({
            info_billing_address: snap.child('info_billing_address').val(),
            note: snap.child('note').val(),
            datePickup:snap.child('datePickup').val(),
            dateDropoff:snap.child('dateDropoff').val(),
          })
        })
        userRef.child(tmp + '/Laundry').once('value', (snap)=>{
          this.setState({
              wash_temperature:snap.child('wash_temperature').val(),
              dry_setting:snap.child('dry_setting').val(),
              fragrance_free:snap.child('fragrance_free').val(),
              add_bleach:snap.child('add_bleach').val(),
              sort_colors:snap.child('sort_colors').val() 
          })
        });
        userRef.child(tmp + '/Dry_Cleaning').once('value', (snap)=>{
          this.setState({
              Suit:snap.child('Suit').val(),
              Pants:snap.child('Pants').val(),
              Shirt:snap.child('Shirt').val(),
              Jacket:snap.child('Jacket').val(),
              Blouse:snap.child('Blouse').val(),
              Goose:snap.child('Goose').val()
          })
        });
    }

  }
  render(){
    const content = 
      <View style={{flex:1}}>
        <ScrollView automaticallyAdjustContentInsets={false} onScroll={() => { console.log('onScroll!') }} scrollEventThrottle={200}>
          <View style={styles.block}>
            <RegistrationItem ItemType='text' content={this.state.info_billing_address} caption='location: '/>
            <RegistrationItem ItemType='text' content={this.state.note} caption='note: '/>
            <RegistrationItem ItemType='text' content={this.state.datePickup} caption='pick up time: '/>
            <RegistrationItem ItemType='text' content={this.state.dateDropoff} caption='drop off time: '/>
          </View>
          { this.state.wash_temperature + this.state.dry_setting +this.state.sort_colors + this.state.fragrance_free + this.state.add_bleach != '00000'
            &&<View style={styles.block}>
              <View>
              <Text style={{fontFamily:'Cochin',fontSize:25}}>laundry</Text>
              </View>
              {(this.state.wash_temperature != '0')&&<RegistrationItem ItemType='text' content={this.state.wash_temperature} caption='wash temperature: '/>}
              {(this.state.dry_setting != '0')&&<RegistrationItem ItemType='text' content={this.state.dry_setting} caption='dry setting: '/>}
              {(this.state.sort_colors != '0')&&<RegistrationItem ItemType='text' content={this.state.sort_colors} caption='sort colors: '/>}
              {(this.state.fragrance_free != '0')&&<RegistrationItem ItemType='text' content={this.state.fragrance_free} caption='fragrance free: '/>}
              {(this.state.add_bleach != '0')&&<RegistrationItem ItemType='text' content={this.state.add_bleach} caption='add bleach: '/>}
            </View>}
            { this.state.Suit + this.state.Shirt +this.state.Jacket + this.state.Pants + this.state.Blouse + this.state.Goose != '000000'
              &&<View style={styles.block}>
                <View>
                <Text style={{fontFamily:'Cochin',fontSize:25}}>dry cleaning</Text>
                </View>
                {(this.state.Suit != '0')&&<RegistrationItem ItemType='text' content={this.state.Suit} caption='suit number: '/>}
                {(this.state.Shirt != '0')&&<RegistrationItem ItemType='text' content={this.state.Shirt} caption='shirt number: '/>}
                {(this.state.Jacket != '0')&&<RegistrationItem ItemType='text' content={this.state.Jacket} caption='jacket number: '/>}
                {(this.state.Pants != '0')&&<RegistrationItem ItemType='text' content={this.state.Pants} caption='pants number: '/>}
                {(this.state.Blouse != '0')&&<RegistrationItem ItemType='text' content={this.state.Blouse} caption='blouse number: '/>}
                {(this.state.Goose != '0')&&<RegistrationItem ItemType='text' content={this.state.Goose} caption='goose number: '/>}
                <Text style={{fontFamily:'Cochin',fontSize:20}}>estimated price for DRY CLEAN</Text>
                <Text style={{fontFamily:'Cochin',fontSize:15}}>${this.state.estimated_price}</Text>
            </View>}
            <View style = {{flexDirection:'column', justifyContent:'center',alignItems:'center'}}>

            </View>
            <View style = {{flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
            <View style={styles.buttons}>
                <Button title='Back' onPress={this.goBack.bind(this)} />
                {(this.props.type == -1)&&<Button title='Place Order' onPress={this.placeOrder.bind(this)} />}
            </View>
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
    var user = this.props.firebaseApp.auth().currentUser
    var userRef = this.props.firebaseApp.database().ref('/order/'+user.uid)
    userRef.set({
        total_order_number:(this.state.total_order_number + 1)
    })
    var order = this.state.total_order_number
    userRef.child(order).set({
        info_billing_address:this.state.info_billing_address,
        datePickup:this.state.datePickup,
        dateDropoff:this.state.dateDropoff,
        note:this.state.note    
    })
    userRef.child(order).child('Laundry').set({
        wash_temperature:this.state.wash_temperature,
        dry_setting:this.state.dry_setting,
        fragrance_free:this.state.fragrance_free,
        add_bleach:this.state.add_bleach,
        sort_colors:this.state.sort_colors,
    })
    userRef.child(order).child('DryCleaning').set({
        Suit:this.state.Suit,
        Pants:this.state.Pants,
        Shirt:this.state.Shirt,
        Jacket:this.state.Jacket,
        Blouse:this.state.Blouse,
        Goose:this.state.Goose,
    })
    if ((this.state.wash_temperature + this.state.dry_setting +this.state.sort_colors + this.state.fragrance_free + this.state.add_bleach !== '0000') 
    || (this.state.Suit + this.state.Shirt +this.state.Jacket + this.state.Pants + this.state.Blouse + this.state.Goose !== '000000'))
    {
      this.props.navigator.push({
        id:'thank'
      });
    }
    else{
      alert("Please include items to be laundered.")
    }
  }
}
