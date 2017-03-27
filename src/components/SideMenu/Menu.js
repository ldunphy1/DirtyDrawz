import React, {Component} from 'react'
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Navigator,
  TouchableOpacity
} from 'react-native'
import Login from '../../pages/login'

const window = Dimensions.get('window')

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#ff5522',
    padding: 20
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
    flexDirection: 'column'
  },
  avatar: {
    width: window.height / 15,
    height: window.height / 15,
    borderRadius: 24,
    flex: 1
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20
  },
  item: {
    fontSize: window.height / 35,
    fontWeight: '300',
    paddingTop: 5
  }
})

export default class Menu extends Component {
  render () {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
      />
    )
  }

  renderScene (route, navigator) {
    return (
      <ScrollView scrollsToTop={true} style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Text style={styles.item}>Your name</Text>
        </View>

    <TouchableOpacity onPress={() => this.props.onItemSelected('order')}>
      <Text
        style={styles.item}>
        Order
      </Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => this.props.onItemSelected('account')}>
      <Text
        style={styles.item}>
        Account
      </Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={ () => this.props.onItemSelected('orderhistory')}>
      <Text style={styles.item}>
      Order history
      </Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={ () => this.props.onItemSelected('pricing')}>
      <Text style={styles.item}>
      Pricing
      </Text>
    </TouchableOpacity>

        <TouchableOpacity onPress={ () => this.props.onItemSelected('faq')}>
      <Text style={styles.item}>
      FAQ
      </Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={ () => this.props.onItemSelected('login')}>
      <Text style={styles.item}>
        Log Out
      </Text>
    </TouchableOpacity>
    {/*<TouchableOpacity onPress={ () => this.logout.bind(this)}>
      <Text style={styles.item}>
        Log Out
      </Text>
    </TouchableOpacity>*/}

      </ScrollView>
    )
  }
  // logout(){
  //   this.props.firebaseApp.auth().signOut().then(() => {
  //     this.props.navigator.push({
  //       component: Login
  //     }
  //   })
  // }
}

Menu.propTypes = {
  onItemSelected: React.PropTypes.func.isRequired
}
