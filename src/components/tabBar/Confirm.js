import React, {Component, PropTypes} from 'react'
import {
    StyleSheet, 
    Text,
    Button, 
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Constant from '../../common/Constant'
import Blood_Btn from '../button/Blood_Btn'

import BackButton from '../button/BackButton'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    tableView:{
        backgroundColor:'white',
        borderColor:'lightgray',
        borderWidth: 1,
        height: 200,
        marginTop: 10,
        paddingBottom: 10,
    },
    itemtxt:{
        marginTop: 20,
        marginLeft: 15,
        fontSize: 15
    },
    line:{
        backgroundColor:'lightgray',
       
        height: 1,
        marginTop: 20,
    },
    orderview:{
        flexDirection:'row',
        height: 45,
        alignItems: 'center',
    },
    ordertxt:{
        marginLeft: 15,
        fontSize: 15
    },
    ordercosttxt:{
        position:'absolute',
        right: 15,
        fontSize: 15
    },
    deliverycosttxt:{
        color:Constant.APP_COLOR,
        position:'absolute',
        right: 15,
        fontSize: 15
    },
    button:{
        width: Constant.WIDTH_SCREEN - 40,
        height: 50,
        marginTop:40,
        borderRadius: 10,
        backgroundColor:'#1badc0',
        justifyContent:'center',                                            
        alignItems:'center',
    },
    buttonText: {
        color:'white', 
        fontSize:18
    },
})

class Confirm extends Component {
    static navigationOptions = {
        title:'CONFIRM',
        headerTitleStyle:{
            textAlign: 'center',
            alignSelf:'center',
        },
        headerStyle:{
        },
        // headerLeft: <BackButton navigation = {this.props.navigation}/>
    }
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>ORDER SUMMARY</Text>
                <View style = {styles.tableView}>
                    <Text style = {styles.itemtxt}>4 ITEMS</Text>
                    <View style = {styles.line}/>
                    <View style = {styles.orderview}>
                        <Text style = {styles.ordertxt}>Order Total</Text>
                        <Text style = {styles.ordercosttxt}>$400.00</Text>
                    </View>
                    <View style = {styles.orderview}>
                        <Text style = {styles.ordertxt}>Delivery</Text>
                        <Text style = {styles.deliverycosttxt}>Free</Text>
                    </View>
                    <View style = {styles.orderview}>
                        <Text style = {styles.ordertxt}>Total Payable</Text>
                        <Text style = {styles.ordercosttxt}>$400.00</Text>
                    </View>
                </View>

                <TouchableOpacity onPress = {this._onPressLogIn} style = {styles.button}>
                    <Text style = {styles.buttonText}>CHECK OUT</Text>   
                </TouchableOpacity>

            </View>
        );
    }
}




export default connect()(Confirm)