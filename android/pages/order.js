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
    this.state={
      dataSource:ds.cloneWithRows([
        'package 1','package 2','Card 1','Card 2'
      ]),
      datePickupB:'2016-12-05 20:00',
      datePickupE:'22:00',
      dateDropoffB:'2016-12-06 20:00',
      dateDropoffE:'22:00',

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
            <View style={{flexDirection:'row'}}>
              <View>

                <Text style={styles.hintText}>From</Text>
                <DatePicker style={{width:150}} date={this.state.datePickup} 
                  mode='datetime' format='YYYY-MM-DD HH:mm' minDate="2016-12-05 20:00" confirmBtnText='Confirm'
                  cancelBtnText='Cancel' showIcon={false} customStyles={{dateInput:{marginLeft:0}}}
                  onDateChange={(date)=>{  this.setState({datePickupB:date})  }}/>
              </View>

              <View>
                <Text style={styles.hintText}>To</Text>
                <DatePicker style={{width:150}} date={this.state.datePickup} 
                  mode='time' format='HH:mm' minDate={this.state.datePickupB} confirmBtnText='Confirm'
                  cancelBtnText='Cancel' showIcon={false} customStyles={{dateInput:{marginLeft:0}}}
                  onDateChange={(date)=>{  this.setState({datePickupE:date})  }}/>
              </View>

            </View>

            <Text style={styles.regularText}>Drop-off Time</Text>
            <View style={{flexDirection:'row'}}>
              <View>

                <Text style={styles.hintText}>From</Text>
                <DatePicker style={{width:150}} date={this.state.datePickup} 
                  mode='datetime' format='YYYY-MM-DD HH:mm' minDate="2016-12-05 20:00" confirmBtnText='Confirm'
                  cancelBtnText='Cancel' showIcon={false}
                  onDateChange={(date)=>{  this.setState({dateDropoffB:date})  }}/>
              </View>

              <View>
                <Text style={styles.hintText}>To</Text>
                <DatePicker style={{width:150}} date={this.state.datePickup} 
                  mode='time' format='HH:mm' minDate={this.state.datePickupB} confirmBtnText='Confirm'
                  cancelBtnText='Cancel' showIcon={false}
                  onDateChange={(date)=>{  this.setState({dateDropoffE:date})  }}/>
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
