import React, { Component } from 'react'

import {
  StyleSheet,
  View,
  ScrollView,
  ListView,
  Navigator
} from 'react-native'

import {
  List,
  ListItem
} from 'react-native-elements'

import {
  Topbar,
  Menu
} from 'react-native-side-menu'

const log = () => console.log('this is an example method')

const list1 = [
  {
    title: 'Annual Package',
    subtitle: '24 washes/academic year'
  },
  {
    title: 'One-Time Order'
  }
]

class PricingPage extends Component {
  constructor () {
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(list1),
      isOpen: false
    }
    this.renderRow = this.renderRow.bind(this)
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

  renderScene (route,navigator) {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />
    return (
  <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <View style={styles.supermainContainer}>
          <Topbar caption='Pricing' onPressMenuButton={()=>this.setState({isOpen:!this.state.isOpen})}></Topbar>
      <ScrollView keyboardShouldPersistTaps style={styles.mainContainer}>
        <List>
          <ListView
            renderRow={this.renderRow}
            dataSource={this.state.dataSource}/>
        </List>
      </ScrollView>
    </View>
    </SideMenu>
    )
  }
}

styles = StyleSheet.create({
  supermainContainer:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#FFFFFF'
  },
  mainContainer: {
    backgroundColor: '#ebedf1'
  }
})

module.exports = PricingPage
