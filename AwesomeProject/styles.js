const React = require('react-native')
const {StyleSheet} = React
const constants = {
  actionColor: '#FF5522'
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  buttons: {
	  flex: 1,
	  flexDirection:'row',
	  alignItems:'center',
	  justifyContent:'space-between',
	  borderWidth:0,
	  width: 400,
	  height: 60
  },
  
  action: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
	width: 125,
	height: 50,
	margin: 40,
	paddingBottom:40,
	paddingTop: 10,
	paddingLeft: 20,
	paddingRight: 20,
	borderRadius: 10
  },
  actionCenter: {
	  backgroundColor: constants.actionColor, 
	  borderColor: 'transparent',
	  width: 150,
	  height: 60,
	  margin: 130,
	  paddingBottom:40,
	  paddingTop: 5,
	  paddingLeft: 20,
	  paddingRight:20,
	  borderRadius: 10
  },
  actionCenterSmall: {
	  backgroundColor: constants.actionColor, 
	  borderColor: 'transparent',
	  width: 125,
	  height: 50,
	  margin: 130,
	  paddingBottom:40,
	  paddingTop: 10,
	  paddingLeft: 20,
	  paddingRight:20,
	  borderRadius: 10
  },
  actionBottomLeft: {
	  backgroundColor: constants.actionColor, 
	  borderColor: 'transparent',
	  width: 150,
	  height: 50,
	  margin: 40,
	  paddingBottom:40,
	  paddingTop: 2,
	  paddingLeft: 20,
	  paddingRight:20,
	  borderRadius: 10
	  
  },
  actionText: {
    color: '#fff',
	textAlign: 'center',
	fontSize: 18, 
	fontWeight:'bold',
  },
  baseText: {
	  fontFamily: 'Cochin',
  },
  instructionText: {
	  fontSize: 30,
  },
  
  loginInfo: {
	  flex:0,
	  flexDirection: 'column',
	  alignItems: 'center',
	  margin: 20
  },
  
  infoText: {
    color: '#000000',
	textAlign: 'center',
	fontSize: 18,
	height: 40,
	width: 400,
	borderColor: 'black',
	borderWidth: 1,
	marginBottom: 10,
	backgroundColor: '#FFFFFF',
	padding: 7,
	borderRadius:4
  },
  
  logos: {
	  width:325,
	  height: 250,  
  },
  
  logoSet: {
	  flex:0,
	  flexDirection: 'column',
	  alignItems: 'center',
	  margin:50
  }
  
})

module.exports = styles
module.exports.constants = constants;