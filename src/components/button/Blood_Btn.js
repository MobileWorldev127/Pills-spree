//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Constant from '../../common/Constant'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// create a component
class Blood_Btn extends Component {
    _onCategory = () => {
        const { navigate } = this.props.navigation
        navigate('SearchResult', {category: this.props.rowData.name, id: this.props.rowData.id})
    }
    render() {
        return (
            <TouchableOpacity onPress = {this._onCategory}>
                <View style={styles.container}>
                    <Image source = {require('../../assets/blood_pressure.png')} style = {styles.icon}/>
                    <Text style = {styles.name}>{this.props.rowData.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        width: (Constant.WIDTH_SCREEN - 80)/3,
        height:  (Constant.WIDTH_SCREEN - 80)/3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 10
    },
    icon:{
        width: 40, 
        height: 40, 
        resizeMode:'contain'
    },
    name:{
        fontSize: 11,
        marginTop: 10,
    }
});

//make this component available to the app
export default Blood_Btn;
