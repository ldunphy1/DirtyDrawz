const React = require('react');
const {
  View,
  Image,
  Text,
  TouchableOpacity,
  propTypes
} = require('react-native');
const { Component } = React;
const styles = require('./styles');

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

module.exports = class ListItem extends Component{
    
    render(){
        
        return(
            <View style={{
              flex:1,
              width:320,
              margin:3,
              flexDirection:'row',
              alignItems:'center',
              borderRadius:8,
              height:50,
              paddingLeft:10,
              paddingRight:10,
              backgroundColor: 'rgba(255,255,255,0.5)',
            }}>
              <Text style={{
                flex:100,
                fontWeight:'bold',
                fontSize:18,
              }}>{this.props.caption}</Text>
                        <MenuButton
                            style={{
                            flex:1,
                            flexDirection:'row',
                            alignItems:'center',
                            width:16,
                            height:16,
                        }}>
                        <Image source={require('./assets/arrow.png')} style={{width: 16, height: 16}} />
                        </MenuButton>
            </View>
    )
}}