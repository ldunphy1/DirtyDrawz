const React = require('react');
const {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Navigator,
  TouchableOpacity,
} = require('react-native');
const { Component } = React;

const window = Dimensions.get('window');
const uri = 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwi_67f7_4fQAhXE5SYKHYIvBD4QjRwIBw&url=http%3A%2F%2Fonehallyu.com%2Ftopic%2F53349-idols-puppiespets-you-like-most%2Fpage-2&psig=AFQjCNELamlZ9KCvj_qpH8slwbeOe6ybDQ&ust=1478104842244551';


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
    flexDirection:'column',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
});

module.exports = class Menu extends Component {
  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };
  
  constructor(props) {
	  super(props);
  }
  
  render() {
	  return(
	  <Navigator
		renderScene={this.renderScene.bind(this)}
		/>
		);
  }

  renderScene(route,navigator)	{
    return (
      <ScrollView scrollsToTop={true} style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={require('./assets/Husky.png')}/>
          <Text>Your name</Text>
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
			<Text>
			Order history
			</Text>
		</TouchableOpacity>
		
		<TouchableOpacity onPress={ () => this.props.onItemSelected('pricing')}>
			<Text>
			Pricing
			</Text>
		</TouchableOpacity>
		
        <TouchableOpacity onPress={ () => this.props.onItemSelected('faq')}>
			<Text>
			F&Q
			</Text>
		</TouchableOpacity>
		
		<TouchableOpacity onPress={ () => this.props.onItemSelected('login')}>
			<Text>
				Log Out
			</Text>
		</TouchableOpacity>
		
      </ScrollView>
    );
  }
};
