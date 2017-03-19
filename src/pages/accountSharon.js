/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
const SideMenu = require('./components/react-native-side-menu');
const Menu=require('./components/react-native-side-menu/Menu');

import java.sql.DriverManager;
import com.mysql.jdbc.Connection;
import com.mysql.jdbc.Statement;


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Picker,
  ScrollView,
  ListView,
  Navigator
} from 'react-native';

import RegistrationItem from './components/RegistrationItem';
import Topbar from './components/react-native-side-menu/Topbar';
import ListItem from './components/react-native-side-menu/ListItem';
import Button from './components/Button';

class MenuButton extends Component {
	
	
	
	handlePress(e) {
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}
        style={this.props.style}>
        <Text>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

module.exports = class account extends Component {
  constructor(props){
  
		 private voidsqlCon(){

			    try {

			        Class.forName("com.mysql.jdbc.Driver");  

			        } catch(Exception e) {

			               e.printStackTrace();

			        }
			        
			        try {

			           String url="jdbc:mysql://52.91.107.127:3306/test?user=root&password=Sharon1994928&useUnicode=true&characterEncoding=UTF-8";

			           Connection conn= (Connection) DriverManager.getConnection(url); 

			           Statement stmt=(Statement)conn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
			           super(props);
			           const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !==r2})
			           this.state={
			             dataSource:ds.cloneWithRows([
			               'package 1','package 2','Card 1','Card 2'
			             ]),
			             isOpen:false,
			             selectedItem:'About',
			             servingArea:'Allston',
			             isEdit:'text',
			             info_first_name:'stmt.executeQuery("select firstName from users where customerID=4")',
			             info_last_name:'Han',
			             info_Email:'shawnhan1029@gmail.com',
			             info_phone:'6173312181',
			             info_billing_address:'508 cambridge street',
			             info_zip:'02134'
			           }

			           rs.close();   

			           stmt.close();

			           conn.close();     

			        } catch(Exception e) {

			               e.printStackTrace();

			        }
			        
			        
		 }      
	  
  }

}
  updateMenuState(isOpen) {
    this.setState({ isOpen, });
  }
  
  onMenuItemSelected = (item) => {
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
	this.props.navigator.replace({id: item});
  }
  render() {
	  return	(
	  <Navigator 
		renderScene={this.renderScene.bind(this)}
			/>
		);
  }
  
  renderScene(route, navigator){
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    return (
    <SideMenu 
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <View style={styles.container}>
          <Topbar caption="Account" onPressMenuButton={()=>this.setState({isOpen:!this.state.isOpen})}></Topbar>
          <ScrollView automaticallyAdjustContentInsets={false} onScroll={() => { console.log('onScroll!'); }} scrollEventThrottle={200}>
          <View style={{alignItems:'center',marginTop:15,marginLeft:15,marginRight:15}}> 
            {(this.state.isEdit=='text')&&<Button title="Edit" onPress={()=>this.setState({isEdit:'textinput'})} width={70} />}
            {(this.state.isEdit=='textinput')&&<Button title="Save" onPress={()=>this.setState({isEdit:'text'})} width={70} />}
          </View>
            <View style={styles.block}>
                <View>
                <Text style={{fontFamily:'Cochin',fontSize:25}}>Basic Infomation</Text>
                </View>
                <RegistrationItem ItemType={this.state.isEdit} content={this.state.info_first_name} caption="First Name: "/>
                <RegistrationItem ItemType={this.state.isEdit} content={this.state.info_last_name} caption="Last Name:"/>
                <RegistrationItem ItemType={this.state.isEdit} content={this.state.info_billing_address} caption="Address: "/>
                <RegistrationItem ItemType={this.state.isEdit} content={this.state.info_Email} caption="E-mail: "/>
                <RegistrationItem ItemType={this.state.isEdit} content={this.state.info_phone} caption="Phone Number: "/>
                <RegistrationItem ItemType={this.state.isEdit} content={this.state.info_zip} caption="Zip Code: "/>
                <RegistrationItem ItemType="dropdown" caption="City/Neighborhod: " servingArea={this.state.selectedItem}
                  onSelectChange={(itemValue)=>this.setState({servingArea:itemValue})}/>
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
    );
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
});