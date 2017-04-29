import React, { Component} from 'react'

import {
  StyleSheet,
  View,
  ScrollView,
  ListView,
  Navigator,
  Image,
  Dimensions
} from 'react-native'

import {
  List,
  ListItem
} from 'react-native-elements'

import SideMenu from 'react-native-side-menu'
import Menu from '../components/SideMenu/Menu'
import Topbar from '../components/SideMenu/Topbar'

const window = Dimensions.get('window');

module.exports = class PricingPage extends Component {
  constructor () {
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      isOpen: false
    }
    this.renderRow = this.renderRow.bind(this)
    this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
  }
  renderRow (rowData, sectionID) {
    return (
      <ListItem
        subtitle={rowData.subtitle}
        key={sectionID}
        onPress={log}
        title={rowData.title} />
    )
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
        <View style={styles.supermainContainer}>
          <Topbar caption='Pricing' onPressMenuButton={()=>this.setState({isOpen:!this.state.isOpen})}></Topbar>
      <ScrollView keyboardShouldPersistTaps = 'always' style={styles.mainContainer}>
        <View style={{backgroundColor:'white'}}>
       <Image source={require('../components/assets/Pricing.jpg')} style={{height:300,width:300, alignSelf:'center'}}/>
       </View>
      </ScrollView>
        </View>
      </SideMenu>
    )
  }
}

const styles = StyleSheet.create({
  supermainContainer: {
    flex:1,
    flexDirection:'column',
    backgroundColor:'#FFFFFF'
  },
  mainContainer: {
    backgroundColor: 'white'
  }
})
