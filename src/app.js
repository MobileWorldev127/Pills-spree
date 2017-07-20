//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import Login  from './components/auth/Login'
import AppWithNavigationState from './navigators/AppNavigator'
import userReducers  from './reducers'

let store = createStore(userReducers)

// create a component
class app extends Component {
    render() {
        return (
            <Provider store = {store}>
                <AppWithNavigationState/>
            </Provider>
        );
    }
}


//make this component available to the app
export default app;
