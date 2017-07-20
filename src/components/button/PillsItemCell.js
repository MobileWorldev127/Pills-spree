//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Constant from '../../common/Constant'

var params = [];
// create a component
class PillsItemCell extends Component {
    constructor(props){
        super(props)
        this.state = {
            cost:'',
            name:'',
            description: '',
            photourl: '',
        }
    }
    
    componentWillMount() {

        var params = this.props.drug.images
        if(params.length > 0){
            var param = params[0]
            // alert(param.mini_url)
            this.setState({
                photourl: param.product_url,
            })
        }else{
            this.setState({
                photourl:''
            })
        }
        
    }
    
    render() {
        const photourl = this.state.photourl
        if(photourl.length > 1){
            return (
                <View style={styles.container}>
                    <View style = {styles.body}>
                        <Image source = {{uri: this.state.photourl}} style = {styles.icon} defaultSource = {require('../../assets/pills1.png')}/>
                        <Text style = {styles.name}>{this.props.drug.name}</Text>
                        <Text style = {styles.des}>{this.props.drug.description}</Text>
                        <Text style = {styles.cost}>{this.props.drug.display_price}</Text>
                    </View>
                </View>
            );
        }
        else{
            return (
                <View style={styles.container}>
                    <View style = {styles.body}>
                        <Image source = {require('../../assets/default.png')} style = {styles.icon}/>
                        <Text style = {styles.name}>{this.props.drug.name}</Text>
                        <Text style = {styles.des}>{this.props.drug.description}</Text>
                        <Text style = {styles.cost}>{this.props.drug.display_price}</Text>
                    </View>
                </View>
            );
        }
        
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        width: (Constant.WIDTH_SCREEN - 20)/2,
        height: (Constant.WIDTH_SCREEN - 20)/2,
    },
    body:{
        width: (Constant.WIDTH_SCREEN - 60)/2,
        height:  (Constant.WIDTH_SCREEN - 60)/2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginLeft:10,
        marginTop: 10,
    },
    icon:{
        width: 60, 
        height: 60, 
        resizeMode:'contain'
    },
    name:{
        fontSize: 15,
        marginTop: 5,
        color:'black',
        fontWeight: 'bold'
    },
    des:{
        fontSize: 13,
        marginTop: 2,
    },
    cost:{
        fontSize: 13,
        marginTop: 2,
        color:'black',
        fontWeight: 'bold'
    },
});

//make this component available to the app
export default PillsItemCell;
