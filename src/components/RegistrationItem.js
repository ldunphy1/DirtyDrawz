import React, { Component } from 'react';
import { View, Text, Navigator,TextInput,StyleSheet,Picker} from 'react-native';
const Item = Picker.Item;
export default class RegistrationItem extends Component {
  constructor(props){
    super(props);
    this.state={
      text: "",
      color: 'red'
    }
  }

  static get defaultProps() {
    return {
      title: 'RegistrationItem'
    };
  }
  on_change_content(para){
    this.setState({text:para});
    this.props.msger(para);
  }

  render() {
    if (this.props.ItemType=="textinput")
      return (
        <View style={styles.container}>
          <View style={styles.caption}>
            <Text style={{ color:'rgba(0,0,0,1)'}}>
              {this.props.caption}
            </Text>
          </View>
          <View style={{flex:100}}>
            <TextInput
                placeholder={this.props.content}
                style={{flex: 100}}
                onChangeText={(para) => this.on_change_content(para)}
                value={this.state.text}
              />
            </View>
        </View>
      )
    else if (this.props.ItemType=="dropdown")
      return (
      <View style={styles.container}>
        <View style={styles.caption}>
          <Text style={{ color:'rgba(0,0,0,1)'}}>
            {this.props.caption}
          </Text>
        </View>
        <View style={{flex:100}}>
              <View style={styles.pickerContainer}>
                <Picker style={{height:30, width:120}}
                selectedValue={this.props.servingArea}
                onValuechange={(_,itemValue)=>{this.props.onSelectChange(itemValue)}}
                mode="dropdown">
                <Item label="Allston" value="Ca" />
                <Item label="Cambridge" value="As" />
                </Picker>
              </View>
          </View>
      </View>
      )
    else
    return (
      <View style={styles.container}>
        <View style={styles.caption}>
          <Text style={{ color:'rgba(0,0,0,1)'}}>
            {this.props.caption}
          </Text>
        </View>
        <View style={{flex:100}}>
                <Text style={{ color:'rgba(0,0,0,1)'}}>
                  {this.props.content}
                </Text>
          </View>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
      flex:1,
		  flexDirection:'row',
      alignItems:'center',
      height: 40,
      backgroundColor: 'rgba(255,255,255,1)',
      margin:3,
      borderRadius:5,
      borderWidth:1
  },
  caption:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    width:110
  },
  pickerContainer:{
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  }
});
