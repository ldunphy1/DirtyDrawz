import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Navigator
} from 'react-native'

import SideMenu from 'react-native-side-menu'
import Menu from '../components/SideMenu/Menu'
import Topbar from '../components/SideMenu/Topbar'
import Accordion from 'react-native-collapsible/Accordion'

const SECTIONS = [
  {
    title: 'What happens to my laundry?',
    content: 'After you receive your labeled Dirty Drawz bag, fill it with your laundry and then put it in the designated place so that we can pick it up. We take it to our partner Laundromats. There it will be professionally washed with the highest quality detergents, dried with precision, folded with care and returned to you the next day during the same hours that you dropped it off the day before.'
  },
  {
    title: 'What forms of payment do you accept?',
    content: 'We accept Visa, MasterCard, and American Express. Hopefully soon we will also accept school cards and can offer memberships too. All transactions are protected by a 128-bit encryption so there is not worries about safety.'
  },
  {
    title: 'How do I get my laundry picked up?',
    content: 'Dirty Drawz will tell you where to leave your laundry. Check your schedule and have it out there so that we can access it. It’s that easy. If there are any questions you can email us or call us at 1-877-973-7922'
  },
  {
    title: 'What about my plan?',
    content: 'The plan you choose is done by weight so there is a pound limit. We recommend that if you have a lot of laundry that you choose a higher weight so that you won’t have to pay more if you go over. We also have upgrades like a reminder call that other companies don’t offer. Ask us if you have any questions about setting up your plan today.'
  },
  {
    title: 'What if something happens to my laundry?',
    content: 'This should never happen but if it does we will take the necessary steps to make sure if something is missing it gets returned or if something is damaged it gets reimbursed. Dirty Drawz is not responsible for damaged caused by the owner but does offer a insurance program that will protect against pens, gum and things of that nature left in the laundry.'
  },
  {
    title: 'How and when do I get my bag?',
    content: 'Dirty Drawz will give you your laundry bag at your first scheduled pick-up.'
  },
  {
    title: 'Where do I drop-off and pick-up my laundry?',
    content: 'All you have to do is either pick-up or drop-off your Dirty Drawz bag in the entrance of your dorm, house, or apartment building. If you feel comfortable leaving your laundry in a common area or downstairs at the entrance, you can, but we are not responsible for any loss until our employees receive your bag. Dirty Drawz offers a special service that can help with this if you find it a problem. We offer a reminder call to tell you that it is a laundry day for you and that we are ready to pick-up your laundry. We also offer a door-to-door service that leaves the bag right outside your dorm room, apartment, etc.'
  },
  {
    title: 'Contact Us',
    content: 'Call us at 1-877-973-7922 or email at hello@dirtydrawz.com'
  }
]

export default class FAQPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }

    this.updateMenuState = this.updateMenuState.bind(this)
    this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
  }

  _renderHeader (section) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    )
  }

  _renderContent (section) {
    return (
      <View style={styles.content}>
        <Text>{section.title}</Text>
      </View>
    )
  }
  updateMenuState (isOpen) {
    this.setState({ isOpen })
  }

  onMenuItemSelected (item) {
    this.setState({
      isOpen: false,
      selectedItem: item
    })
    this.props.navigator.replace({id: item})
  }

  render () {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
      />
    )
  }
  renderScene (route, navigator) {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <View style={styles.container}>
          <Topbar caption='Account' onPressMenuButton={() => this.setState({isOpen: !this.state.isOpen})} />
          <Accordion
            sections={SECTIONS}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent} />
        </View>
      </SideMenu>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    backgroundColor:'#FFFFFF'
  },
  title: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
})
