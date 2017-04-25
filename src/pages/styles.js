const React = require('react-native')
const {StyleSheet,Dimensions} = React
const constants = {
  actionColor: '#FF5522'
};
const window = Dimensions.get('window');

var styles = StyleSheet.create({
  container: {
		backgroundColor: '#FFFFFF',
		flexDirection:'column',
		alignItems:'center',
		justifyContent:'space-around',
		width:window.width,
		height:window.height,
		padding:10,
  },
	Ordercontainer: {
    flex:1,
    flexDirection:'column',
    backgroundColor:'#FFFFFF'
  },
	collapiseItem:{
    flexDirection:'column',
    backgroundColor:'#e9f2f7',
    minHeight:330,
    padding:10,
  },
  DCITEM:{
    height:70,
    width:70,
  },
  buttons: {
	  flexDirection:'row',
	  alignItems:'center',
	  justifyContent:'space-around',
	  borderWidth:0,
	  width: window.width*5/6,
	  height: 60
  },
  regularText:{
	  fontSize: window.height/40,
	  color: 'black',
  },
  titleText:{
	  color: 'black',
	  textAlign: 'center',
      fontSize: window.height/30,
      fontWeight:'bold',
  },
  hintText:{
	  color: 'black',
	  fontSize: window.height/60,
  },
  
  loginInfo: {
	  flexDirection: 'column',
	  alignItems: 'center',
		justifyContent: 'center',
	  width:window.width/1.2,
  },
  
  infoText: {
  color: '#000000',
	textAlign: 'center',
	fontSize: 18,
	height: 40,
	width: 200,
	borderColor: 'black',
	borderWidth: 1,
	marginBottom: 10,
	backgroundColor: '#FFFFFF',
	padding: 7,
	borderRadius:4
  },
  
  logos: {
	  width:window.width/2,
	  height: window.width/2.5,  
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

module.exports = styles
module.exports.constants = constants;