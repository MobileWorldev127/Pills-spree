//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Constant from '../../common/Constant'
import Moment from 'moment'

var params = [];
// create a component
class PrescriptionCell extends Component {
    constructor(props){
        super(props)
        this.state = {
            date:'',
            photourl: '',
        }
    }
    
    componentWillMount() {

        var param = this.props.rowdata
        console.log(param)
        this.setState({
            photourl: param.image_original,
            // date: param.updated_at,
            date: Moment(param.updated_at).format('LL')
        })
  
    }
    
    render() {
        const photourl = this.state.photourl

        if(photourl.length > 1){
            return (
                <View style={styles.container}>
                    {/*<View style = {styles.body}>*/}
                        <Image source = {{uri: this.state.photourl}} style = {styles.icon} defaultSource = {require('../../assets/pills1.png')}/>
                        <Text style = {styles.datetxt}>{this.state.date}</Text>
                    {/*</View>*/}
                </View>
            );
        }
        else{
            return (
                <View style={styles.container}>
                    {/*<View style = {styles.body}>*/}
                        <Image source = {require('../../assets/default.png')} style = {styles.icon}/>
                        <Text style = {styles.datetxt}>{this.state.date}</Text>
                    {/*</View>*/}
                </View>
            );
        }
        
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        width: (Constant.WIDTH_SCREEN - 40)/2,
        height: (Constant.WIDTH_SCREEN - 40)/2 + 30,
        flexDirection: 'column'
    },
    body:{
        width: (Constant.WIDTH_SCREEN - 80)/2,
        height:  (Constant.WIDTH_SCREEN - 80)/2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginLeft:10,
        marginTop: 10,
    },
    icon:{
        width: (Constant.WIDTH_SCREEN - 80)/2,
        height:  (Constant.WIDTH_SCREEN - 80)/2,
        resizeMode:'cover'
    },
    datetxt:{
        width: (Constant.WIDTH_SCREEN - 80)/2,
        height:  40,
        paddingTop: 10,
        textAlign: 'center',
        backgroundColor: 'white',
        fontSize: 15,
        color:'black',
    },
});

//make this component available to the app
export default PrescriptionCell;
