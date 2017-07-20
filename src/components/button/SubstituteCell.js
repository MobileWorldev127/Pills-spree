//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Constant from '../../common/Constant'
import Moment from 'moment'
// create a component
class SubtituteCell extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            cost: '',
            photourl: '',
        }
    }
    
    componentWillMount() {
        var param = this.props.rowdata
        
        this.setState({
            name: param,
        })
    }
    
    render() {

        return (
            <View style={styles.container}>
                <View>
                    <Text style = {styles.datetxt}>{this.state.name}</Text>
                </View>
                <TouchableOpacity style = {styles.buyButton} >
                    <Text style = {{color: 'white'}} >buy now</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        width: Constant.WIDTH_SCREEN - 60,
        height: 50,
        marginTop: 12,
        flexDirection: 'row',
        borderColor: 'lightgray',
        borderWidth: 1,
        alignItems: 'center'
    },
    icon:{
        width: 40,
        height:  30,
        resizeMode:'cover',
        marginLeft: 15,
    },
    datetxt:{
        marginLeft: 15,
        fontSize: 13,
    },
    buyButton: {
        backgroundColor: Constant.APP_COLOR,
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        position: 'absolute',
        right: 15,
    }
});

//make this component available to the app
export default SubtituteCell;
