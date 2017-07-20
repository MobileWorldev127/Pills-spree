//import liraries
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { 
    addNavigationHelpers, 
    StackNavigator } from 'react-navigation'
import LoginScreen from '../components/auth/Login'
import SignupScreen from '../components/auth/Signup'
import HomeScreen from '../components/tabBar/Home'
import TabsRoot from '../components/tabBar/TabsRoot'
import SearchResult from '../components/tabBar/SearchResult'
import TabViewExample from '../components/tabBar/TabViewExample'
import Confirm from '../components/tabBar/Confirm'
import MyPrescription from '../components/tabBar/MyPrescription'
import Help from '../components/tabBar/Help'
import Orders from '../components/tabBar/Orders'

export const AppNavigator = StackNavigator({
    initialRouteName: { screen: LoginScreen },
    Login: { screen: LoginScreen },
    Signup: { screen: SignupScreen },
    Home: { screen: HomeScreen },
    Tab: { screen: TabsRoot },
    SearchResult: { screen: SearchResult },
    TabViewExample: { screen: TabViewExample },
    Confirm: { screen: Confirm },
    MyPrescription: { screen: MyPrescription },
    Help: { screen: Help },
    Orders: { screen: Orders },
});


var AppWithNavigationstate = React.createClass({
    displayName: 'AppWithNavigationstate',
    render(){
        return(
             <AppNavigator />
        );
    },
});


const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn,
})

export default connect(mapStateToProps)(AppWithNavigationstate)
