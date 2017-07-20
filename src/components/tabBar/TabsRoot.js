import React, { Component } from 'react'
import {connect} from 'react-redux'
import { 
    TabBarIOS, 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    Dimensions } from 'react-native'
import {Tabs, Tab} from 'react-native-elements'

import Cart from './Cart'
import Categories from './Categories'
import Home from './Home'
import Profile from './Profile'
const  { width, height } = Dimensions.get('window')


class TabsRoot extends Component {

    static navigationOptions = {
        title:'Profile',
        header: null
    };

    constructor(props){
        super(props);
        this.state = {
            selectedTab: 'home',
            hideTabBar: true,
        };
        this.changeTab = this.changeTab.bind(this)
    }
    hideTabBar(value) {
        this.setState({
            hideTabBar: value,
        })
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        if(params){
            this.setState({selectedTab:params.isSelectedTab})
        }else{
            this.setState({selectedTab: 'home'})
        }
    }

    changeTab (i) {
        this.setState({selectedTab:i})
    }

  _renderTabContent (key) { 
    switch (key) {
      case 'home':
        return <Home navigation = {this.props.navigation}/>
      case 'categories':
        return <Categories navigation = {this.props.navigation}/>
      case 'cart':
        return <Cart navigation = {this.props.navigation}/>
      case 'profile':
        return <Profile navigation = {this.props.navigation}/>
    }
  }

  render () {
      const {selectedTab} = this.state
      return (
        //   <View style = {styles.container}>
            <Tabs hideTabTouch>
                <Tab
                    selected={selectedTab == 'home'}
                    title = {selectedTab === 'home' ? 'Home' : 'Home'}
                    renderIcon = {() => <Image source = {require('../../assets/home.png')} style = {styles.tabImg}/>}
                    renderSelectedIcon = {() => <Image source = {require('../../assets/home_select.png')} style = {styles.tabImg}/>}
                    onPress = {() => this.changeTab('home')} >
                    {this._renderTabContent('home')}
                </Tab>
                <Tab
                    selected={selectedTab == 'categories'}
                    title = {selectedTab === 'categories' ? 'Categories' : 'Categories'}           
                    renderIcon = {() => <Image source = {require('../../assets/categories.png')} style = {styles.tabImg}/>}
                    renderSelectedIcon = {() => <Image source = {require('../../assets/categories_select.png')} style = {styles.tabImg}/>}
                    onPress = {() => this.changeTab('categories')} >
                    {this._renderTabContent('categories')}
                </Tab>
                <Tab
                    selected={selectedTab == 'cart'}
                    title = {selectedTab === 'cart' ? 'Cart' : 'Cart'}           
                    renderIcon = {() => <Image source = {require('../../assets/cart.png')} style = {styles.tabImg}/>}
                    renderSelectedIcon = {() => <Image source = {require('../../assets/cart_select.png')} style = {styles.tabImg}/>}
                    onPress = {() => this.changeTab('cart')} >
                    {this._renderTabContent('cart')}
                </Tab>
                <Tab
                    selected={selectedTab == 'profile'}
                    title = {selectedTab === 'profile' ? 'Profile' : 'Profile'}           
                    renderIcon = {() => <Image source = {require('../../assets/profile.png')} style = {styles.tabImg}/>}
                    renderSelectedIcon = {() => <Image source = {require('../../assets/profile_select.png')} style = {styles.tabImg}/>}
                    onPress = {() => this.changeTab('profile')} >
                    {this._renderTabContent('profile')}
                </Tab>
            </Tabs>
        // </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: '#F5FCFF',
  },
  welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
  },
  instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
  },
  titleStyle:{
  },
  tabImg:{
      width: 24,
      height: 24,
      paddingBottom: 1,
      resizeMode: 'stretch',
  },
})

const mapStateToProps = (state, ownProps) => ({
    tabs:state.tabreducer,
    // isSelectedTab: state.isSelectedTab
})


export default connect(mapStateToProps)(TabsRoot)