import React, { Component } from 'react'

import {
  StyleSheet,
  View,
  ScrollView,
  ListView,
  Navigator,
  AsyncStorage
} from 'react-native'

import {
  List,
  ListItem
} from 'react-native-elements'

import SideMenu from 'react-native-side-menu'
import Menu from '../components/SideMenu/Menu'
import Topbar from '../components/SideMenu/Topbar'


var list1 = []

module.exports = class OrderHistory extends Component {
  constructor () {
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(list1),
      isOpen: false,
      total_order_number:10
    }
    this.renderRow = this.renderRow.bind(this)
    this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
  }


    componentWillMount(){
        var user = this.props.firebaseApp.auth().currentUser;
        var userRef = this.props.firebaseApp.database().ref('/order/'+user.uid);
        userRef.once('value', (snap)=>{
        this.setState({total_order_number:snap.child('total_order_number').val()});
        });
        alert(this.state.total_order_number);
        for(var count = this.state.total_order_number - 1; count > -1; count--){
            //var tmp_ref = this.props.firebaseApp.database().ref('/order/'+user.uid+'/' + count.toString());
            //tmp_ref.once('value', (snap)=>{
            this.list1.push(
                {
                    title: 'Order Number: ' + count.toString(),
                    //subtitle: 'pick up date: ' + snap.child('datePickup').val(),
                    ID:count
                }
            )
            //});
        }
  }

  onPressItem(id){
      AsyncStorage.setItem("lookforwhat", id);
      this.props.navigator.push({
        id: 'orderdetail',
       });
  }
  renderRow (rowData, sectionID) {
    return (
      <ListItem
        subtitle={rowData.subtitle}
        key={sectionID}
        onPress={()=>this.onPressItem(rowData.ID)}
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
          <Topbar caption='Order History' onPressMenuButton={()=>this.setState({isOpen:!this.state.isOpen})}></Topbar>
            <ScrollView keyboardShouldPersistTaps = 'always' style={styles.mainContainer}>
                <List>
                <ListView
                    renderRow={this.renderRow}
                    dataSource={this.state.dataSource} />
                </List>
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
    backgroundColor: '#ebedf1'
  }
})
