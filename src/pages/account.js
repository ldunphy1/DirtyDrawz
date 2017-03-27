import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,
  Navigator,
  AppRegistry
} from 'react-native'

import SideMenu from 'react-native-side-menu'
import Menu from '../components/SideMenu/Menu'
import Topbar from '../components/SideMenu/Topbar'
import ListItem from '../components/SideMenu/ListItem'

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
      selectedItem: 'About',
      servingArea: 'Allston',
      isEdit: 'text',
      info_first_name: this.props.first_name,
      info_last_name: this.props.last_name,
      info_Email: this.props.email,
      info_phone: this.props.phone,
      info_billing_address: this.props.address,
      info_zip: this.props.zipcode
    }
    this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
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
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
      />
    )
  }

  on_change_first_name (para) {
    this.setState({info_first_name: para})
    this.props.msger_first_name(para)
  }

  on_change_last_name (para) {
    this.setState({info_last_name: para})
    this.props.msger_last_name(para)
  }

  on_change_address (para) {
    this.setState({info_billing_address: para})
    this.props.msger_address(para)
  }

  on_change_email (para) {
    this.setState({info_Email: para})
    this.props.msger_email(para)
  }

  on_change_phone (para) {
    this.setState({info_phone: para})
    this.props.msger_phone(para)
  }

  on_change_zipcode (para) {
    this.setState({info_zip: para})
    this.props.msger_zipcode(para)
  }

  renderScene (route,navigator) {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <View style={styles.container}>
          <Topbar caption='Account' onPressMenuButton={()=>this.setState({isOpen: !this.state.isOpen})}></Topbar>
          <ScrollView automaticallyAdjustContentInsets={false} onScroll={() => { console.log('onScroll!') }} scrollEventThrottle={200}>
          <View style={{alignItems:'center',marginTop:15,marginLeft:15,marginRight:15}}>
            {(this.state.isEdit=='text')&&<Button title='Edit' onPress={()=>this.setState({isEdit:'textinput'})} width={70} />}
            {(this.state.isEdit=='textinput')&&<Button title='Save' onPress={()=>this.setState({isEdit:'text'})} width={70} />}
          </View>
            <View style={styles.block}>
                <View>
                <Text style={{fontFamily:'Cochin',fontSize:25}}>Basic Infomation</Text>
                </View>
            </View>
            <View style={styles.block}>
              <View>
                <Text style={{fontFamily:'Cochin',fontSize:25}}>Payment Information</Text>
              </View>
              <ListView style={{flex:1}}
                dataSource={this.state.dataSource}
                renderRow={(rowData)=><ListItem caption={rowData}></ListItem>}
              />
            </View>
        </ScrollView>
        </View>
      </SideMenu>
    )
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