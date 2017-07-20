//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {NavigationActions} from 'react-navigation'
import {connect} from 'react-redux'

// create a component
class BackButton extends Component {
    constructor(props){
        super(props)
    }
    render() {
        var { dispatch } = this.props.navigation;
        return (
            <TouchableOpacity onPress = {() => dispatch(NavigationActions.back())}>  
                <View style={styles.container}>
                    <Image source = {require('../../assets/arrow.png')} style = {styles.icon}/>
                </View>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
    },
    icon:{
        width: 14,
        height: 14,
        marginTop:3,
        marginBottom:3,
        resizeMode:'contain',
    }
});

//make this component available to the app
export default connect()(BackButton);
