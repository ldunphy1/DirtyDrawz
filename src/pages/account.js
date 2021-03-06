import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,
  Navigator,
  AppRegistry,
  AsyncStorage,
  Picker,
} from 'react-native'
const Item = Picker.Item
import SideMenu from 'react-native-side-menu'
import Menu from '../components/SideMenu/Menu'
import ForbiddenMenu from '../components/SideMenu/ForbiddenMenu'
import Topbar from '../components/SideMenu/Topbar'
import ListItem from '../components/SideMenu/ListItem'
import RegistrationItem from '../components/RegistrationItem'

import Button from '../components/Button'

export default class Account extends Component {
  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !==r2})
    this.state = {
      dataSource: ds.cloneWithRows([
        'package 1', 'package 2', 'Card 1', 'Card 2'
      ]),
      isOpen: false,
      selectedItem: '',
      isEdit: 'text',
      info_first_name: '',
      info_last_name: '',
      info_Email: '',
      info_phone: '',
      info_billing_address: '',
      info_zip: ''
    }
    this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
    this.createUser = this.createUser.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)
  }

  componentDidMount(){
    this.getUserInfo()
  }
  
  createUser(){
    var user = this.props.firebaseApp.auth().currentUser
    this.props.firebaseApp.database().ref('/users/'+user.uid).set({
        email: user.email,
        uid: user.uid,
        firstName: this.state.info_first_name,
        lastName: this.state.info_last_name,
        phone: this.state.info_phone,
        address: this.state.info_billing_address,
        zipcode: this.state.info_zip   
    })
    this.props.firebaseApp.database().ref('/order/'+user.uid).set({
        total_order_number: 0     
    })
    AsyncStorage.setItem("registered", 'true');
    this.props.navigator.push({
        id: 'order',
        name: 'order'
    })
  }

  updateUser(){
    var user = this.props.firebaseApp.auth().currentUser
    var userRef = this.props.firebaseApp.database().ref('/users/'+user.uid).remove()
    this.props.firebaseApp.database().ref('/users/'+user.uid).set({
        email: user.email,
        uid: user.uid,
        firstName: this.state.info_first_name,
        lastName: this.state.info_last_name,
        phone: this.state.info_phone,
        address: this.state.info_billing_address,
        zipcode: this.state.info_zip      
    })
    this.setState({isEdit:'text'})
  }

  getUserInfo(){
    var userId = this.props.firebaseApp.auth().currentUser.uid;
    var userRef = this.props.firebaseApp.database().ref('/users/'+userId)
    userRef.once('value', (snap)=>{
      this.setState({
        info_first_name: snap.child('firstName').val(),
        info_last_name: snap.child('lastName').val(),
        info_phone: snap.child('phone').val(),
        info_billing_address: snap.child('address').val(),
        info_zip: snap.child('zipcode').val()
      })
    })
  }

  updateMenuState (isOpen) {
    this.setState({ isOpen })
  }
  onMenuItemSelected (item) {
    this.setState({
      isOpen: false,
      selectedItem: item
    })
    this.props.navigator.replace({id: item})
  }

  render () {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />
    const forbiddenMenu = <ForbiddenMenu onItemSelected={this.onMenuItemSelected} />
    const content = this.props.page_type=="reg" ? 
    <SideMenu
      forbidden = {true}
      menu={forbiddenMenu}
      isOpen={this.state.isOpen}
      onChange={(isOpen) => this.updateMenuState(isOpen)}>
      <View style={styles.container}>
        <Topbar caption='Create Account' onPressMenuButton={()=>this.setState({isOpen: !this.state.isOpen})}></Topbar>
        <ScrollView automaticallyAdjustContentInsets={false} onScroll={() => { console.log('onScroll!') }} scrollEventThrottle={200}>
          <View style={styles.block}>
              <View>
              <Text style={{fontFamily:'Cochin',fontSize:25}}>Basic Infomation</Text>
              </View>
                <RegistrationItem msger = {(para)=>this.setState({info_first_name: para})} ItemType='textinput' content={this.state.info_first_name} caption="First Name: "/>
                <RegistrationItem msger = {(para)=>this.setState({info_last_name: para})} ItemType='textinput' content={this.state.info_last_name} caption="Last Name:"/>               
                <RegistrationItem msger = {(para)=>this.setState({info_phone: para})} ItemType='textinput' content={this.state.info_phone} caption="Phone Number: "/>
                <RegistrationItem msger = {(para)=>this.setState({info_billing_address: para})} ItemType='textinput' content={this.state.info_billing_address} caption="Address: "/>
                <RegistrationItem msger = {(para)=>this.setState({info_zip: para})} ItemType='textinput' content={this.state.info_zip} caption="Zip Code: "/>  
          </View>
          <View style={{flexDirection:'column',alignItems:'center',padding:20}}>
          <Button title='Create Account' width={70} onPress={()=>this.createUser()} />
          </View>
      </ScrollView>
      </View>
    </SideMenu> 
    :
    <SideMenu
      menu={menu}
      isOpen={this.state.isOpen}
      onChange={(isOpen) => this.updateMenuState(isOpen)}>
      <View style={styles.container}>
        <Topbar caption='Account' onPressMenuButton={()=>this.setState({isOpen: !this.state.isOpen})}></Topbar>
        <ScrollView automaticallyAdjustContentInsets={false} onScroll={() => { console.log('onScroll!') }} scrollEventThrottle={200}>
        <View style={{alignItems:'center',marginTop:15,marginLeft:15,marginRight:15}}>
          {(this.state.isEdit=='text')&&<Button title='Edit' onPress={()=>this.setState({isEdit:'textinput'})} width={70} />}
          {(this.state.isEdit=='textinput')&&<Button title='Save' onPress={()=>this.updateUser()} width={70} />}
        </View>
          <View style={styles.block}>
              <View>
                <Text style={{fontFamily:'Cochin',fontSize:25}}>Basic Infomation</Text>
              </View>
                <RegistrationItem msger = {(para)=>this.setState({info_first_name: para})} ItemType={this.state.isEdit} content={this.state.info_first_name} caption="First Name: "/>
                <RegistrationItem msger = {(para)=>this.setState({info_last_name: para})} ItemType={this.state.isEdit} content={this.state.info_last_name} caption="Last Name:"/>
                <RegistrationItem msger = {(para)=>this.setState({info_phone: para})} ItemType={this.state.isEdit} content={this.state.info_phone} caption="Phone Number: "/>
                <RegistrationItem msger = {(para)=>this.setState({info_zip: para})} ItemType={this.state.isEdit} content={this.state.info_zip} caption="Zip Code: "/>
                <RegistrationItem msger = {(para)=>this.setState({info_billing_address: para})} ItemType={this.state.isEdit} content={this.state.info_billing_address} caption="Address: "/>
          </View>
      </ScrollView>
      </View>
    </SideMenu>
    return(
      <View style = {styles.container}>
          {content}
      </View>
    )
  }
  onValueChange = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    backgroundColor:'#FFFFFF'
  },
  block:{
    flexDirection:'column',
    margin:15,
    padding:10,
    alignItems:'center',
    backgroundColor:'lightskyblue',
    minHeight:150,
    borderRadius:3,
  }
})