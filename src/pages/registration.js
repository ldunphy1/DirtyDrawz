import React, { Component } from 'react'
import {
  View,
  Navigator,
  Dimensions
} from 'react-native'

import {
  Topbar,
  SideMenu,
  Menu
} from 'react-native-side-menu'

import RegistrationItem from '../components/RegistrationItem'
import Button from '../components/Button'
import styles from './styles'

const window = Dimensions.get('window')

module.exports = class registration extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      selectedItem: 'About',
      servingArea: 'Allston'
    }
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

  renderScene (route, navigator) {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <View style={styles.Ordercontainer}>
          <Topbar
            caption='Registration'
            onPressMenuButton={() => this.setState({ isOpen: !this.state.isOpen })}
          />

          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              width: window.width * 4 / 5
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <RegistrationItem
                  style={{width: window.width * 4 / 10}}
                  msger={(para) => this.props.msger_first_name(para)}
                  ItemType='textinput'
                  caption='First Name: ' />
                <RegistrationItem
                  style={{width: window.width * 4 / 10}}
                  msger={(para) => this.props.msger_last_name(para)}
                  ItemType='textinput'
                  caption='Last Name:' />
              </View>
              <RegistrationItem
                ItemType='textinput'
                msger={(para) => this.props.msger_address(para)}
                caption='Address: ' />
              <RegistrationItem
                ItemType='textinput'
                msger={(para) => this.props.msger_email(para)}
                caption='E-mail: ' />
              <RegistrationItem
                ItemType='textinput'
                msger={(para) => this.props.msger_phone(para)}
                caption='Phone Number: ' />
              <RegistrationItem
                ItemType='textinput'
                msger={(para) => this.props.msger_zipcode(para)}
                caption='Zip Code: ' />
              <RegistrationItem
                ItemType='dropdown'
                caption='City/Neighborhood: '
                servingArea={this.state.selectedItem}
                onSelectChange={(itemValue) => this.setState({ servingArea: itemValue })} />
              <View style={{
                flexDirection: 'row',
                paddingTop: 20,
                justifyContent: 'space-around',
                alignItems: 'center',
                width: 300
              }}>
                <Button
                  width={300}
                  title='Save Information'
                  onPress={this.gotoOrder.bind(this)} />
              </View>
            </View>
          </View>
        </View>
      </SideMenu>
    )
  }

  gotoOrder () {
    this.props.navigator.push({
      id: 'order',
      name: 'order'
    })
  }
}
