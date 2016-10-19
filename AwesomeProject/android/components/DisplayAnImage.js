'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';

const styles = require('../../styles.js')
const constants = styles.constants 
const {StyleSheet, View, Image} = ReactNative; 

class DisplayAnImage extends Component {
  render() {
    return (
      <View>
        <Image
          style={styles.logos}
          source={this.image.source}
        />
      </View>
    );
  }
}


module.exports = UInput;