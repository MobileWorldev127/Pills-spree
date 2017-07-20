//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Constant from '../../common/Constant'
import Moment from 'moment'
import TabViewExample from '../tabBar/TabViewExample';

var params = [];
// create a component
class OrdersCell extends Component {
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
        var imageArray = []
        imageArray = param.images
        if(imageArray.length > 0){
            this.setState({
                photourl: param.images[0].product_url,
                name: param.name,
                cost: param.display_price,
            })
        }else{
            this.setState({
                name: param.name,
                cost: param.display_price,
            })
        }
    }
    
    render() {
        const photourl = this.state.photourl

        if(photourl.length > 1){
            return (
                <View style={styles.container}>
                    <Image source = {{uri: this.state.photourl}} style = {styles.icon} defaultSource = {require('../../assets/pills1.png')}/>
                    <View>
                        <Text style = {styles.datetxt}>{this.state.name}</Text>
                        <Text style = {styles.datetxt}>{this.state.cost}</Text>
                    </View>
                    <TouchableOpacity style = {styles.buyButton} >
                        <Text >Buy it again</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else{
            return (
                <View style={styles.container}>

                    <Image source = {require('../../assets/default.png')} style = {styles.icon}/>
                    <View>
                        <Text style = {styles.datetxt}>{this.state.name}</Text>
                        <Text style = {styles.datetxt}>{this.state.cost}</Text>
                    </View>
                    <TouchableOpacity style = {styles.buyButton} >
                        <Text >Buy it again</Text>
                    </TouchableOpacity>

                </View>
            );
        }
        
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        width: Constant.WIDTH_SCREEN - 60,
        height: 60,
        marginTop: 20,
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
export default OrdersCell;
