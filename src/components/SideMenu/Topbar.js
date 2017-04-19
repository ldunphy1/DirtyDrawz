import React, {Component} from 'react'

import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './styles'

class MenuButton extends Component {
  handlePress (e) {
    if (this.props.onPress) {
      this.props.onPress(e)
    }
  }

  render () {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}
        style={this.props.style}>
        <Text>{this.props.children}</Text>
      </TouchableOpacity>
    )
  }
}

export default class Topbar extends Component {
  render () {
    return (
      <View style={styles.topBar}>
        <MenuButton
          onPress={() => this.props.onPressMenuButton()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            left: 15,
            top: 19,
            width: 32,
            height: 32
          }}>
          <Image source={require('../assets/menu.png')} style={{width: 40, height: 40}}/>
        </MenuButton>
        <Text style={{
          color: '#fff',
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 'bold'
        }}>
          {this.props.caption}
        </Text>
      </View>
    )
  }
}

Topbar.propTypes = {
  onPressMenuButton: React.PropTypes.func.isRequired
}
