/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
const SideMenu = require('./components/react-native-side-menu');
const Menu=require('./components/react-native-side-menu/Menu');

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
import DatePicker from 'react-native-datepicker';
import Accordion from 'react-native-collapsible/Accordion';

import RegistrationItem from './components/RegistrationItem';
import Topbar from './components/react-native-side-menu/Topbar';
import ListItem from './components/react-native-side-menu/ListItem';
import Button from './components/Button';

const styles = require('./styles');
var currentTime = new Date();
var day;
var year;
var hour;
var month;
const SECTIONS=[
  {
    title:'Laundry'
  },
  {
    title:'Dry Cleaning'
  }
];
class CheckBox extends Component {
  handlePress() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }
  
  render() {
    if (this.props.checked==true)
      return (
        <View style={{flexDirection:'row',alignItems:'center',}}>
        <TouchableOpacity onPress={()=>this.handlePress()}>
          <Image source={require('./components/assets/cb_enabled.png')} style={{height:25,width:25}}/>
        </TouchableOpacity>
            <View style={{paddingLeft:20}}>
            <Text style={this.props.labelStyle}>{this.props.label}{this.props.checked}</Text>
          </View>
        </View>
      )
    else if (this.props.checked==false)
      return (
        <View style={{flexDirection:'row',alignItems:'center',}}>
        <TouchableOpacity onPress={()=>this.handlePress()}>
          <Image source={require('./components/assets/cb_disabled.png')} style={{height:25,width:25}}/>
        </TouchableOpacity>
            <View style={{paddingLeft:20}}>
            <Text style={this.props.labelStyle}>{this.props.label}{this.props.checked}</Text>
          </View>
        </View>
      )
  }
}
class DryCleanItem extends Component {
  handlePress() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }

  handlePress2() {
    if (this.props.onPress) {
      this.props.onPress2();
    }
  }
  
  render() {
    return (
      <View style={{flexDirection:'column',alignItems:'center',}}>
      <TouchableOpacity
        onPress={()=>this.handlePress()}
        style={styles.DCITEM}>
        <Image source={this.props.imageSrc} style={styles.DCITEM}/>
      </TouchableOpacity>
        {(this.props.times!=0)&&<View style={{flexDirection:'row', alignItems:'center',justifyContent:'center', position:'absolute',height:20,width:20,borderRadius:10,backgroundColor:'#ff5522',top:0,right:0}}>
          <Text onPress={()=>this.handlePress2()} style={{color: '#fff',fontSize: 15,fontWeight:'bold'}}>{this.props.times}</Text>
        </View>}
        <Text style={{fontSize:15}}>{this.props.name}</Text>
        <Text style={{fontSize:10}}>${this.props.price}/each</Text>
      </View>
    );
  }
}

module.exports = class order extends Component {
  constructor(props){
    super(props); 
    const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !==r2});
    day = currentTime.getDate();
    year = currentTime.getFullYear();
    hour = currentTime.getHours() + 1;
    month = currentTime.getMonth() + 1;
    var tmp = '' + year;
    if (month < 10)
      tmp = tmp + '-0' + month;
    else
      tmp = tmp + '-' + month;
    if (day < 10) 
      tmp = tmp + '-0' + day;
    else
      tmp = tmp + '-' + day;
    if (hour < 10) 
      tmp = tmp + ' ' + hour;
    else
      tmp = tmp + ' ' + hour;
    tmp = tmp + ':' + '00';
    var tmp1 = this.computeTime(tmp, 0);
    var tmp2 = this.computeTime(tmp1, 24);
    var tmp3 = this.computeTime(tmp1, 2);
    var tmp4 = this.computeTime(tmp2, 2);
    this.state={
      dataSource:ds.cloneWithRows([
        'package 1','package 2','Card 1','Card 2'
      ]),
      minPickup:tmp1,
      minDropoff:tmp2,
      datePickup:tmp1,
      datePickupTo:tmp3,
      dateDropoff:tmp2,
      dateDropoffTo:tmp4,

      Cold:false,
      Warm:false,
      Hot:false,

      Low:false,
      Medium:false,
      High:false,

      FNo:false,
      FYes:false,

      ANo:false,
      AYes:false,

      SNo:false,
      SYes:false,

      Suit:0,
      Pants:0,
      Shirt:0,
      Jacket:0,
      Blouse:0,
      Goose:0,
      info_billing_address:'508 cambridge street',

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
	this.props.navigator.replace({id:item});
  }
  
  renderHeader(section){
    if ((this.state.Cold||this.state.Warm||this.state.Hot
      ||this.state.Low||this.state.Medium||this.state.High
      ||this.state.FNo||this.state.FYes
      ||this.state.ANo||this.state.AYes
      ||this.state.SNo||this.state.SYes
    )&&(section.title=="Laundry"))
          return(
            <View style={{flex:1,flexDirection:'row',alignItems:'center',margin:1,backgroundColor:'dodgerblue',height:35,paddingLeft:8}}>
            <Image source={require('./components/assets/cb_enabled.png')} style={{height:25,width:25}}/>
              <Text style={{
                color: '#fff',
                fontSize: 15, 
                fontWeight:'bold',
                marginLeft:8,
              }}>{section.title}</Text>
            </View>
          );
    if ((this.state.Suit+this.state.Pants+this.state.Shirt+this.state.Jacket+this.state.Goose+this.state.Blouse)>0&&(
      section.title=="Dry Cleaning"
    ))
          return(
            <View style={{flex:1,flexDirection:'row',alignItems:'center',margin:1,backgroundColor:'dodgerblue',height:35,paddingLeft:8}}>
            <Image source={require('./components/assets/cb_enabled.png')} style={{height:25,width:25}}/>
              <Text style={{
                color: '#fff',
                fontSize: 15, 
                fontWeight:'bold',
                marginLeft:8,
              }}>{section.title}</Text>
            </View>
          );
    else
          return(
              <View style={{flex:1,flexDirection:'row',alignItems:'center',margin:1,backgroundColor:'dodgerblue',height:35,paddingLeft:8}}>
              <Image source={require('./components/assets/cb_disabled.png')} style={{height:25,width:25}}/>
                <Text style={{
                  color: '#fff',
                  fontSize: 15, 
                  fontWeight:'bold',
                  marginLeft:8,
                }}>{section.title}</Text>
              </View>
            );
  }
  renderContent(section){
    if (section.title=="Laundry")
    return(
        <View style={styles.collapiseItem}>
          <Text style={{fontSize: 15,color:'black'}}>Wash Temperature</Text>
          <View style={{margin:3,flexDirection:'row',justifyContent:'space-around'}}>
            <CheckBox label='Cold' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.Cold} onPress={()=>this.setState({Cold:!this.state.Cold,Warm:false,Hot:false})}/>
            <CheckBox label='Warm' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.Warm} onPress={()=>this.setState({Cold:false,Warm:!this.state.Warm,Hot:false})}/>
            <CheckBox label='Hot' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.Hot} onPress={()=>this.setState({Cold:false,Warm:false,Hot:!this.state.Hot})}/>
          </View>

          <Text style={{fontSize: 15,color:'black'}}>Dry Setting</Text>
          <View style={{margin:3,flexDirection:'row',justifyContent:'space-around'}}>
            <CheckBox label='Low' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.Low} onPress={()=>this.setState({Low:!this.state.Low,Medium:false,High:false})}/>
            <CheckBox label='Medium' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.Medium} onPress={()=>this.setState({Low:false,Medium:!this.state.Medium,High:false})}/>
            <CheckBox label='High' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.High} onPress={()=>this.setState({Low:false,Medium:false,High:!this.state.High})}/>
          </View>

          <Text style={{fontSize: 15,color:'black'}}>Fragrance-free?</Text>
          <View style={{margin:3,flexDirection:'row',justifyContent:'space-around'}}>
            <CheckBox label='No' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.FNo} onPress={()=>this.setState({FNo:!this.state.FNo,FYes:false})}/> 
            <CheckBox label='Yes' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.FYes} onPress={()=>this.setState({FNo:false,FYes:!this.state.FYes})}/>
          </View>

          <Text style={{fontSize: 15,color:'black'}}>Add Bleach? +$1</Text>
          <View style={{margin:3,flexDirection:'row',justifyContent:'space-around'}}>
            <CheckBox label='No' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.ANo} onPress={()=>this.setState({ANo:!this.state.ANo,AYes:false})}/> 
            <CheckBox label='Yes' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.AYes} onPress={()=>this.setState({ANo:false,AYes:!this.state.AYes})}/>
          </View>

          <Text style={{fontSize: 15,color:'black'}}>Sort Colors? +$1</Text>
          <View style={{margin:3,flexDirection:'row',justifyContent:'space-around'}}>
            <CheckBox label='No' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.SNo} onPress={()=>this.setState({SNo:!this.state.SNo,SYes:false})}/>
            <CheckBox label='Yes' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.SYes} onPress={()=>this.setState({SNo:false,SYes:!this.state.SYes})}/>
          </View>
        </View>
        );
    else if (section.title=="Dry Cleaning")
    return(
      <View style={styles.collapiseItem}>
        <Text>Tap item to add to cart. Tap the number to eliminate.</Text>
        <View style={{margin:10,flex:1,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
          <DryCleanItem imageSrc={require('./components/assets/Suit.png')} times={this.state.Suit} onPress={()=>this.setState({Suit:this.state.Suit+1})} onPress2={()=>this.setState({Suit:this.state.Suit-1})} name="Suit" price="14.99"/>
          <DryCleanItem imageSrc={require('./components/assets/Pants.png')} times={this.state.Pants} onPress={()=>this.setState({Pants:this.state.Pants+1})} onPress2={()=>this.setState({Pants:this.state.Pants-1})} name="Pants" price="15.99"/>
          <DryCleanItem imageSrc={require('./components/assets/Shirt.png')} times={this.state.Shirt} onPress={()=>this.setState({Shirt:this.state.Shirt+1})} onPress2={()=>this.setState({Shirt:this.state.Shirt-1})} name="Shirt" price="13.99"/>
        </View>

        <View style={{margin:10,flex:1,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
          <DryCleanItem imageSrc={require('./components/assets/Jacket.png')} times={this.state.Jacket} onPress={()=>this.setState({Jacket:this.state.Jacket+1})} onPress2={()=>this.setState({Jacket:this.state.Jacket-1})} name="Jacket" price="14.99"/>
          <DryCleanItem imageSrc={require('./components/assets/Blouse.png')} times={this.state.Blouse} onPress={()=>this.setState({Blouse:this.state.Blouse+1})} onPress2={()=>this.setState({Blouse:this.state.Blouse-1})} name="Blouse" price="15.99"/>
          <DryCleanItem imageSrc={require('./components/assets/Goose.png')} times={this.state.Goose} onPress={()=>this.setState({Goose:this.state.Goose+1})} onPress2={()=>this.setState({Goose:this.state.Goose-1})} name="Goose" price="13.99"/>
        </View>
      </View>
      );
  }
  render() {
	  return (
	  <Navigator
		renderScene={this.renderScene.bind(this)}
		/>
		);
  }
  computeTime(date, plusHours){
    if (date == '')
      return ''
    year = 1000 * (date.charCodeAt(0) - '0'.charCodeAt()) + 100 * (date.charCodeAt(1) - '0'.charCodeAt()) + 10 * (date.charCodeAt(2) - '0'.charCodeAt()) + date.charCodeAt(3) - '0'.charCodeAt();
    month = 10 * (date.charCodeAt(5) - '0'.charCodeAt()) + date.charCodeAt(6) - '0'.charCodeAt();
    day = 10 * (date.charCodeAt(8) - '0'.charCodeAt()) + date.charCodeAt(9) - '0'.charCodeAt();
    hour = 10 * (date.charCodeAt(11) - '0'.charCodeAt()) + date.charCodeAt(12) - '0'.charCodeAt();
    hour = hour + plusHours;
    if (hour > 24){
      day = day + ~~(hour / 24);
      hour = hour % 24
    }
    if (hour > 18){
      day = day + 1;
      hour = 8;
    }
    if (hour <7){
      hour = 8;
    }
    if (day > 30){
      day = 1;
      month = month + 1;
    }
    if (month > 12){
      month = 1;
      year = year + 1;
    }
    var tmp = '' + year;
    if (month < 10)
      tmp = tmp + '-0' + month;
    else
      tmp = tmp + '-' + month;
    if (day < 10) 
      tmp = tmp + '-0' + day;
    else
      tmp = tmp + '-' + day;
    if (hour < 10) 
      tmp = tmp + ' ' + hour;
    else
      tmp = tmp + ' ' + hour;
    tmp = tmp + ':' + '00';
    return tmp;
  }
  renderScene(route,navigator)	{
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

    return (
    <SideMenu 
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <View style={styles.Ordercontainer}>
          <Topbar caption="Order" onPressMenuButton={()=>this.setState({isOpen:!this.state.isOpen})}></Topbar>
          <ScrollView automaticallyAdjustContentInsets={false} onScroll={() => { console.log('onScroll!'); }} scrollEventThrottle={200}>
          <View>
              <Accordion 
                sections={SECTIONS}
                renderHeader={this.renderHeader.bind(this)}
                renderContent={this.renderContent.bind(this)}
                laundryType={this.state.laundryType}
              />
          </View>
          <View style={{alignItems:'center',margin:5}}>
            <Text style={styles.regularText}>Pick-up Time</Text>
            <View style={{flexDirection:'row',alignItems:'center',marginTop:10, marginBottom:10}}>
                <Text style={styles.hintText}>From: </Text>
                <DatePicker style={{width:140, backgroundColor:'dodgerblue'}} date={this.state.datePickup} 
                  mode='datetime' format='YYYY-MM-DD HH:mm' minDate={this.state.minPickup} confirmBtnText='Confirm'
                  cancelBtnText='Cancel' showIcon={false} customStyles={{dateInput:{marginLeft:0}}}
                  onDateChange={(date)=>{ 
                    var tmp1 = this.computeTime(date, 0);this.setState({datePickup:tmp1});  
                    var tmp2 = this.computeTime(date, 2);this.setState({ datePickupTo:tmp2 });
                    var tmp3 = this.computeTime(date, 24);this.setState({ minDropoff:tmp3 });
                    this.setState({ dateDropoff:tmp3 });
                    var tmp4 = this.computeTime(date, 26);this.setState({ dateDropoffTo:tmp4 });
                  }}/>
                  <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:150}}>
                    <Text style={styles.hintText}>To: </Text>
                    <Text style={styles.regularText}>{this.state.datePickupTo}</Text>
                  </View>
            </View>
            <Text style={styles.regularText}>Drop-off Time</Text>
            <View style={{flexDirection:'row',alignItems:'center', marginTop:10, marginBottom:10}}>
                <Text style={styles.hintText}>From: </Text>
                <DatePicker style={{width:140,backgroundColor:'dodgerblue'}} date={this.state.dateDropoff} 
                  mode='datetime' format='YYYY-MM-DD HH:mm' minDate={this.state.minDropoff} confirmBtnText='Confirm'
                  cancelBtnText='Cancel' showIcon={false}
                  onDateChange={(date)=>{
                    var tmp1 = this.computeTime(date, 0);this.setState({ dateDropoff:tmp1 });
                    var tmp2 = this.computeTime(date, 2);this.setState({ dateDropoffTo:tmp2 });
                  }}/>
              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:150}}>
                <Text style={styles.hintText}>To: </Text>
                <Text style={styles.regularText}>{this.state.dateDropoffTo}</Text>
              </View>
            </View>
          <RegistrationItem ItemType="textinput" content={this.state.info_billing_address} caption="Where? "/>
          <RegistrationItem ItemType="textinput" content="" caption="Note: "/>
          <View style={{margin:30}}>
          <Button width={150} title="Place Order" onpress={"()" ==""> {}}/>
          </View>
          </View>
        </ScrollView>
        </View>
    </SideMenu>
    );
  }
}
