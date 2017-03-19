

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

module.exports = class Topbar extends Component{
    
  static propTypes = {
    onPressMenuButton: React.PropTypes.func.isRequired
  };
    render(){
        
        return(
            <View style={styles.topBar}>
                        <MenuButton onPress={()=>this.props.onPressMenuButton()}
                            style={{
                            flexDirection:'row',
                            alignItems:'center',
                            position:'absolute',
                            left:15,
                            top:19,
                            width:32,
                            height:32,
                        }}>
                        <Image source={require('./assets/menu.png')} style={{width: 32, height: 32}} />
                        </MenuButton>
                        <Text style={{
                            color: '#fff',
                            textAlign: 'center',
                            fontSize: 18, 
                            fontWeight:'bold',
                        }}>{this.props.caption}</Text>
            </View>
    )
}}