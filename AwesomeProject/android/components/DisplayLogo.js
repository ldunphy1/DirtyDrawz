'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';

const styles = require('../../styles.js')
const constants = styles.constants 
const {StyleSheet, View, Image} = ReactNative; 

class DisplayLogo extends Component {
  render() {
    return (
      <View>
        <Image
          style={styles.logos}
          source={require('../../Logo.jpg')}
        />
      </View>
    );
  }
}


module.exports = DisplayLogo;