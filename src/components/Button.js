'use strict'

import React, {Component} from 'react'
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native'

export default class Button extends Component {
  constructor (props) {
    super(props)
    this.state = {text: ''}
  }

  static defaultProps () {
    return {
      title: 'Button'
    }
  }

  render () {
    return (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff5522',
        borderColor: 'transparent',
        width: 125,
        height: 50,
        borderRadius: 10,
        margin: 5
      }}>
        <TouchableHighlight
          underlayColor={'#ff5522'}
          onPress={this.props.onPress}>
          <Text style={{
            color: '#fff',
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold'
          }}>
            {this.props.title}
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}
