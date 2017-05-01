import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ListView,
  AsyncStorage,
  Navigator
} from 'react-native'

import DatePicker from 'react-native-datepicker'
import Accordion from 'react-native-collapsible/Accordion'

import SideMenu from 'react-native-side-menu'
import Menu from '../components/SideMenu/Menu'
import Topbar from '../components/SideMenu/Topbar'

import RegistrationItem from '../components/RegistrationItem'
import Button from '../components/Button'
import styles from './styles'

var currentTime = new Date()
var day
var year
var hour
var month

const SECTIONS = [
  {
    title: 'Laundry'
  },
  {
    title: 'Dry Cleaning'
  }
]

class CheckBox extends Component {
  handlePress () {
    if (this.props.onPress) {
      this.props.onPress()
    }
  }

  render () {
    if (this.props.checked === true) {
      return (
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <TouchableOpacity onPress={()=>this.handlePress()}>
          <Image source={require('../components/assets/cb_enabled.png')} style={{height:25,width:25}}/>
        </TouchableOpacity>
            <View style={{paddingLeft:20}}>
            <Text style={this.props.labelStyle}>{this.props.label}{this.props.checked}</Text>
          </View>
        </View>
      )
    } else if (this.props.checked === false) {
      return (
        <View style={{flexDirection:'row',alignItems:'center',}}>
        <TouchableOpacity onPress={()=>this.handlePress()}>
          <Image source={require('../components/assets/cb_disabled.png')} style={{height:25,width:25}}/>
        </TouchableOpacity>
            <View style={{paddingLeft:20}}>
            <Text style={this.props.labelStyle}>{this.props.label}{this.props.checked}</Text>
          </View>
        </View>
      )
    }
  }
}

class DryCleanItem extends Component {
  handlePress() {
    if (this.props.onPress) {
      this.props.onPress()
    }
  }

  handlePress2() {
    if (this.props.onPress) {
      this.props.onPress2()
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
        {(this.props.times!=0)&&<View style={{flexDirection:'row', alignItems:'center',justifyContent:'center', position:'absolute',height:30,width:30,borderRadius:15,backgroundColor:'#ff5522',top:0,right:0}}>
          <Text onPress={()=>this.handlePress2()} style={{color: '#fff',fontSize: 15,fontWeight:'bold'}}>{this.props.times}</Text>
        </View>}
        <Text style={{fontSize:15}}>{this.props.name}</Text>
        <Text style={{fontSize:10}}>${this.props.price}/each</Text>
      </View>
    )
  }
}

export default class Order extends Component {
  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !==r2})
    day = currentTime.getDate()
    year = currentTime.getFullYear()
    hour = currentTime.getHours() + 1
    month = currentTime.getMonth() + 1
    var tmp = '' + year
    if (month < 10)
      tmp = tmp + '-0' + month
    else
      tmp = tmp + '-' + month
    if (day < 10)
      tmp = tmp + '-0' + day
    else
      tmp = tmp + '-' + day
    if (hour < 10)
      tmp = tmp + ' ' + hour
    else
      tmp = tmp + ' ' + hour
    tmp = tmp + ':' + '00'
    var tmp1 = this.computeTime(tmp, 0)
    var tmp2 = this.computeTime(tmp1, 24)
    var tmp3 = this.computeTime(tmp1, 2)
    var tmp4 = this.computeTime(tmp2, 2)
    this.state={
      dataSource:ds.cloneWithRows([
        'package 1','package 2','Card 1','Card 2'
      ]),
      servingArea:'',
      minPickup:tmp1,
      minDropoff:tmp2,
      datePickup:tmp1,
      datePickupTo:tmp3,
      dateDropoff:tmp2,
      dateDropoffTo:tmp4,

      Cold:false,
      Warm:false,
      Hot:false,
      wash_temperature:'',

      Low:false,
      Medium:false,
      High:false,
      dry_setting:'',

      FNo:false,
      FYes:false,
      fragrance_free:'',

      ANo:false,
      AYes:false,
      add_bleach:'',

      SNo:false,
      SYes:false,
      sort_colors:'',

      Suit:0,
      Pants:0,
      Shirt:0,
      Jacket:0,
      Blouse:0,
      Goose:0,

      estimated_price:0,
      info_billing_address:'',
      note:''
    }
    this.updateMenuState = this.updateMenuState.bind(this)
    this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
  }
  componentWillMount(){
    var userId = this.props.firebaseApp.auth().currentUser.uid;
    var userRef = this.props.firebaseApp.database().ref('/users/'+userId)
    userRef.once('value', (snap)=>{
      this.setState({
        info_billing_address: snap.child('address').val(),
        servingArea: snap.child('neighborhood').val()  
      })
    })
  }
  updateMenuState (isOpen) {
    this.setState({ isOpen })
  }

  onMenuItemSelected (item) {
    this.setState({
      isOpen: false,
      selectedItem: item,
    })
    if(item === 'logout'){
      this.props.firebaseApp.auth().signOut()
    }
	    this.props.navigator.replace({id:item})
  }
  onClear(){
    this.setState({ 
      Suit:0,
      Pants:0,
      Shirt:0,
      Jacket:0,
      Blouse:0,
      Goose:0
       })
  }
  onPlaceOrder(){
    if ((this.state.Cold||this.state.Warm||this.state.Hot
      ||this.state.Low||this.state.Medium||this.state.High
      ||this.state.FNo||this.state.FYes
      ||this.state.ANo||this.state.AYes
      ||this.state.SNo||this.state.SYes
    ) ||(this.state.Suit+this.state.Pants+this.state.Shirt+this.state.Jacket+this.state.Goose+this.state.Blouse)){
    var estimated_price = 
      + this.state.Suit * 17.95
      + this.state.Pants * 7.95
      + this.state.Shirt * 2.95
      + this.state.Jacket * 12.95
      + this.state.Blouse * 7.95
      + this.state.Goose * 50;

    const order_info = ((this.state.Cold||this.state.Warm||this.state.Hot
      ||this.state.Low||this.state.Medium||this.state.High
      ||this.state.FNo||this.state.FYes
      ||this.state.ANo||this.state.AYes
      ||this.state.SNo||this.state.SYes
    )) 
    ?
    [
    ['info_billing_address', this.state.info_billing_address],
    ['datePickup', this.state.datePickup],
    ['dateDropoff', this.state.dateDropoff],
    ['wash_temperature', this.state.wash_temperature],
    ['dry_setting', this.state.dry_setting],
    ['fragrance_free', this.state.fragrance_free],
    ['add_bleach', this.state.add_bleach],
    ['sort_colors', this.state.sort_colors],
    ['Suit', this.state.Suit.toString()],
    ['Pants', this.state.Pants.toString()],
    ['Shirt', this.state.Shirt.toString()],
    ['Jacket', this.state.Jacket.toString()],
    ['Blouse', this.state.Blouse.toString()],
    ['Goose', this.state.Goose.toString()],
    ['note', this.state.note.toString()],
    ['estimated_price', estimated_price.toString()]
    ]
    :
    [
    ['info_billing_address', this.state.info_billing_address],
    ['datePickup', this.state.datePickup],
    ['dateDropoff', this.state.dateDropoff],
    ['wash_temperature', '0'],
    ['dry_setting', '0'],
    ['fragrance_free', '0'],
    ['add_bleach', '0'],
    ['sort_colors', '0'],
    ['Suit', this.state.Suit.toString()],
    ['Pants', this.state.Pants.toString()],
    ['Shirt', this.state.Shirt.toString()],
    ['Jacket', this.state.Jacket.toString()],
    ['Blouse', this.state.Blouse.toString()],
    ['Goose', this.state.Goose.toString()],
    ['note', this.state.note.toString()],
    ['estimated_price', estimated_price.toString()]
    ];

    AsyncStorage.multiSet(order_info, (err) => {});
    this.props.navigator.push({
        id: 'orderconfirm',
        name: 'orderconfirm'
    });
    }
    else{
      alert("Please include items to be laundered")
    }
  }
  renderHeader(section){
    if ((this.state.Cold||this.state.Warm||this.state.Hot
      ||this.state.Low||this.state.Medium||this.state.High
      ||this.state.FNo||this.state.FYes
      ||this.state.ANo||this.state.AYes
      ||this.state.SNo||this.state.SYes
    )&&(section.title=='Laundry'))
          return(
            <View style={{flex:1,flexDirection:'row',alignItems:'center',margin:1,backgroundColor:'dodgerblue',height:35,paddingLeft:8}}>
            <Image source={require('../components/assets/cb_enabled.png')} style={{height:25,width:25}}/>
              <Text style={{
                color: '#fff',
                fontSize: 15,
                fontWeight:'bold',
                marginLeft:8,
              }}>{section.title}</Text>
            </View>
          )
    if ((this.state.Suit+this.state.Pants+this.state.Shirt+this.state.Jacket+this.state.Goose+this.state.Blouse)>0&&(
      section.title=='Dry Cleaning'
    ))
          return(
            <View style={{flex:1,flexDirection:'row',alignItems:'center',margin:1,backgroundColor:'dodgerblue',height:35,paddingLeft:8}}>
            <Image source={require('../components/assets/cb_enabled.png')} style={{height:25,width:25}}/>
              <Text style={{
                color: '#fff',
                fontSize: 15,
                fontWeight:'bold',
                marginLeft:8,
              }}>{section.title}</Text>
            </View>
          )
    else{
          return(
              <View style={{flex:1,flexDirection:'row',alignItems:'center',margin:1,backgroundColor:'dodgerblue',height:35,paddingLeft:8}}>
              <Image source={require('../components/assets/cb_disabled.png')} style={{height:25,width:25}}/>
                <Text style={{
                  color: '#fff',
                  fontSize: 15,
                  fontWeight:'bold',
                  marginLeft:8
                }}>{section.title}</Text>
              </View>
            );
    }
  }
  renderContent(section){
    if (section.title=='Laundry')
    return(
        <View style={styles.collapiseItem}>
          <Text style={{fontSize: 15,color:'black'}}>Wash Temperature</Text>
          <View style={{margin:3,flexDirection:'row',justifyContent:'space-around'}}>
            <CheckBox label='Cold' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.Cold} onPress={()=>this.setState({wash_temperature:'cold',Cold:!this.state.Cold,Warm:false,Hot:false})}/>
            <CheckBox label='Warm' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.Warm} onPress={()=>this.setState({wash_temperature:'warm',Cold:false,Warm:!this.state.Warm,Hot:false})}/>
            <CheckBox label='Hot' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.Hot} onPress={()=>this.setState({wash_temperature:'hot',Cold:false,Warm:false,Hot:!this.state.Hot})}/>
          </View>

          <Text style={{fontSize: 15,color:'black'}}>Dry Setting</Text>
          <View style={{margin:3,flexDirection:'row',justifyContent:'space-around'}}>
            <CheckBox label='Low' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.Low} onPress={()=>this.setState({dry_setting:'low',Low:!this.state.Low,Medium:false,High:false})}/>
            <CheckBox label='Medium' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.Medium} onPress={()=>this.setState({dry_setting:'medium',Low:false,Medium:!this.state.Medium,High:false})}/>
            <CheckBox label='High' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.High} onPress={()=>this.setState({dry_setting:'high',Low:false,Medium:false,High:!this.state.High})}/>
          </View>

          <Text style={{fontSize: 15,color:'black'}}>Fragrance-free?</Text>
          <View style={{margin:3,flexDirection:'row',justifyContent:'space-around'}}>
            <CheckBox label='No' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.FNo} onPress={()=>this.setState({fragrance_free:'no',FNo:!this.state.FNo,FYes:false})}/>
            <CheckBox label='Yes' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.FYes} onPress={()=>this.setState({fragrance_free:'yes',FNo:false,FYes:!this.state.FYes})}/>
          </View>

          <Text style={{fontSize: 15,color:'black'}}>Add Bleach?</Text>
          <View style={{margin:3,flexDirection:'row',justifyContent:'space-around'}}>
            <CheckBox label='No' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.ANo} onPress={()=>this.setState({add_bleach:'no',ANo:!this.state.ANo,AYes:false})}/>
            <CheckBox label='Yes' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.AYes} onPress={()=>this.setState({add_bleach:'yes',ANo:false,AYes:!this.state.AYes})}/>
          </View>

          <Text style={{fontSize: 15,color:'black'}}>Sort Colors?</Text>
          <View style={{margin:3,flexDirection:'row',justifyContent:'space-around'}}>
            <CheckBox label='No' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.SNo} onPress={()=>this.setState({sort_colors:'no',SNo:!this.state.SNo,SYes:false})}/>
            <CheckBox label='Yes' labelStyle={{fontSize: 15,color:'black'}} checked={this.state.SYes} onPress={()=>this.setState({sort_colors:'yes',SNo:false,SYes:!this.state.SYes})}/>
          </View>
        </View>
        )
    else if (section.title=='Dry Cleaning')
    return(
      <View style={styles.collapiseItem}>
        <Text>Tap item to add to cart. Tap the number to eliminate.</Text>
        <View style={{margin:10,flex:1,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
          <DryCleanItem imageSrc={require('../components/assets/Suit.png')} times={this.state.Suit} onPress={()=>this.setState({Suit:this.state.Suit+1})} onPress2={()=>this.setState({Suit:this.state.Suit-1})} name='Suit' price='17.95'/>
          <DryCleanItem imageSrc={require('../components/assets/Pants.png')} times={this.state.Pants} onPress={()=>this.setState({Pants:this.state.Pants+1})} onPress2={()=>this.setState({Pants:this.state.Pants-1})} name='Pants' price='7.95'/>
          <DryCleanItem imageSrc={require('../components/assets/Shirt.png')} times={this.state.Shirt} onPress={()=>this.setState({Shirt:this.state.Shirt+1})} onPress2={()=>this.setState({Shirt:this.state.Shirt-1})} name='Shirt' price='2.95'/>
        </View>

        <View style={{margin:10,flex:1,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
          <DryCleanItem imageSrc={require('../components/assets/Jacket.png')} times={this.state.Jacket} onPress={()=>this.setState({Jacket:this.state.Jacket+1})} onPress2={()=>this.setState({Jacket:this.state.Jacket-1})} name='Jacket' price='12.95'/>
          <DryCleanItem imageSrc={require('../components/assets/Blouse.png')} times={this.state.Blouse} onPress={()=>this.setState({Blouse:this.state.Blouse+1})} onPress2={()=>this.setState({Blouse:this.state.Blouse-1})} name='Blouse' price='7.95'/>
          <DryCleanItem imageSrc={require('../components/assets/Goose.png')} times={this.state.Goose} onPress={()=>this.setState({Goose:this.state.Goose+1})} onPress2={()=>this.setState({Goose:this.state.Goose-1})} name='Goose' price='50'/>
        </View>
        <Button title='All Clear' onPress={ this.onClear.bind(this)} />
      </View>
      )
  }
  render() {
	  return (
	  <Navigator
		renderScene={this.renderScene.bind(this)}
		/>
		)
  }
  

  computeTime(date, plusHours){
    if (date == '')
      return ''
    year = 1000 * (date.charCodeAt(0) - '0'.charCodeAt()) + 100 * (date.charCodeAt(1) - '0'.charCodeAt()) + 10 * (date.charCodeAt(2) - '0'.charCodeAt()) + date.charCodeAt(3) - '0'.charCodeAt()
    month = 10 * (date.charCodeAt(5) - '0'.charCodeAt()) + date.charCodeAt(6) - '0'.charCodeAt()
    day = 10 * (date.charCodeAt(8) - '0'.charCodeAt()) + date.charCodeAt(9) - '0'.charCodeAt()
    hour = 10 * (date.charCodeAt(11) - '0'.charCodeAt()) + date.charCodeAt(12) - '0'.charCodeAt()
    hour = hour + plusHours
    if (hour > 24){
      day = day + ~~(hour / 24)
      hour = hour % 24
    }
    if (hour > 18){
      day = day + 1
      hour = 8
    }
    if (hour <7){
      hour = 8
    }
    if (day > 30){
      day = 1
      month = month + 1
    }
    if (month > 12){
      month = 1
      year = year + 1
    }
    var tmp = '' + year
    if (month < 10)
      tmp = tmp + '-0' + month
    else
      tmp = tmp + '-' + month
    if (day < 10)
      tmp = tmp + '-0' + day
    else
      tmp = tmp + '-' + day
    if (hour < 10)
      tmp = tmp + ' ' + hour
    else
      tmp = tmp + ' ' + hour
    tmp = tmp + ':' + '00'
    return tmp
  }
  renderScene(route,navigator)	{
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />
    return (
    <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <View style={styles.Ordercontainer}>
          <Topbar caption='Order' onPressMenuButton={()=>this.setState({isOpen:!this.state.isOpen})}></Topbar>
          <ScrollView automaticallyAdjustContentInsets={false} onScroll={() => { console.log('onScroll!') }} scrollEventThrottle={200}>
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
                    var tmp1 = this.computeTime(date, 0)
                    this.setState({datePickup:tmp1})
                    var tmp2 = this.computeTime(date, 2)
                    this.setState({ datePickupTo:tmp2 })
                    var tmp3 = this.computeTime(date, 24)
                    this.setState({ minDropoff:tmp3 })
                    this.setState({ dateDropoff:tmp3 })
                    var tmp4 = this.computeTime(date, 26)
                    this.setState({ dateDropoffTo:tmp4 })
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
                    var tmp1 = this.computeTime(date, 0)
                    this.setState({ dateDropoff:tmp1 })
                    var tmp2 = this.computeTime(date, 2)
                    this.setState({ dateDropoffTo:tmp2 })
                  }}/>
              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:150}}>
                <Text style={styles.hintText}>To: </Text>
                <Text style={styles.regularText}>{this.state.dateDropoffTo}</Text>
              </View>
            </View>
          <RegistrationItem ItemType='dropdown' pickerFlag="T" caption="City/Neighborhod: " servingArea={this.state.servingArea} content={this.state.servingArea}
                  onSelectChange={(itemValue)=>this.setState({servingArea:itemValue})}/>
          <RegistrationItem msger = {(para)=>this.setState({info_billing_address: para})} ItemType='textinput' content={this.state.info_billing_address} caption='Where? '/>
          <RegistrationItem msger = {(para)=>this.setState({note: para})} ItemType='textinput' content={this.state.note} caption='Note: '/>
          <View style = { styles.buttons }>
            <Button title='Continue' onPress={this.onPlaceOrder.bind(this)} />
          </View>
          </View>
        </ScrollView>
        </View>
    </SideMenu>
    )
  }
}
