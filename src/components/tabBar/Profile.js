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
    AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Constant from '../../common/Constant'
import API from '../../common/API'


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerView:{
        width: Constant.WIDTH_SCREEN,
        height: 150,
    },
    profileBg:{
        width:Constant.WIDTH_SCREEN,
        height: 150,
        resizeMode:'stretch',
        position: 'absolute',
    },
    titleView:{
        flexDirection:'row',
        width:Constant.WIDTH_SCREEN,
        height: 30,
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 20,
    },
    profiletxt:{
        color:'white',
        fontSize: 20,
        fontWeight:'bold',
        backgroundColor: 'transparent',
    },
    setting:{
        width: 22,
        height: 22,
        resizeMode:'contain',
        position:'absolute',
        right: 25,
    },
    profileView:{
        flexDirection:'row',
        height: 60,
        width: Constant.WIDTH_SCREEN,
        marginTop: 20,
    },
    profilePhoto:{
        width: 60,
        height: 60,
        borderRadius: 30,
        marginLeft: 25,
    },
    profilesubView:{
        flexDirection:'column',
        marginLeft: 15,
    },
    username:{
        color:'white',
        fontSize: 20,
        backgroundColor:'transparent',
        fontWeight: 'bold',
    },
    useremail:{
        color:'white',
        fontSize: 15,
        backgroundColor:'transparent',
        marginTop:5,
    },
    listView:{
        flexDirection:'row',
        width: Constant.WIDTH_SCREEN-60,
        height: 80,
        marginLeft: 30,
        alignItems: 'center',
    },
    prescriptionButton:{
        flex: 1,
        flexDirection:'row',
        width: Constant.WIDTH_SCREEN-60,
        height: 80,
        alignItems: 'center',
    },
    ordericon:{
        width: 22,
        height: 22,
        resizeMode:'contain',
    },
    nexticon:{
        width: 18,
        height: 18,
        resizeMode: 'contain',
        position: 'absolute',
        right: 10,
    },
    order:{
        fontSize:17,
        marginLeft: 15,
    },
    line:{
        width: Constant.WIDTH_SCREEN-60,
        height: 1,
        backgroundColor: 'lightgray',
        position:'absolute',
        bottom: 1,
    }
})

class Profile extends Component {
    static navigationOptions = {
        title:'Profile',
        headerTitleStyle:{
            textAlign: 'center',
            alignSelf:'center',
        },
        headerStyle:{
        }
    };

    componentDidMount() {
        AsyncStorage.getItem('USEREMAIL').then((value) =>{
            this.setState({
                name: value
            })
        })
        AsyncStorage.getItem('USERNAME').then((value) =>{
            this.setState({
                email: value
            })
        })
        
    }
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
        }
    }
    

    _onMyPrescription = () => {
        var { navigate } = this.props.navigation;
        navigate ('MyPrescription')
    }
    _onHelp = () => {
        var {navigate} = this.props.navigation
        navigate('Help')
    }
    _onOrders = () => {
        var {navigate} = this.props.navigation
        navigate('Orders')
    }

    render() {
        
        return (
            <View style = {styles.container}>
                <View style = {styles.headerView}>
                    <Image source = {require('../../assets/profile_bg.png')} style = {styles.profileBg}/>
                    <View style = {styles.titleView}>
                        <Text style = {styles.profiletxt}>Profile</Text>
                        <Image source = {require('../../assets/setting.png')} style = {styles.setting}/>
                    </View>
                    <View style = {styles.profileView}>
                        <Image source = {require('../../assets/head_image_default.png')} style = {styles.profilePhoto}/>
                        <View style = {styles.profilesubView}>
                            <Text style = {styles.username}>{this.state.name}</Text>
                            <Text style = {styles.useremail}>{this.state.email}</Text>
                        </View>
                    </View>
                </View>

                <View style = {styles.listView}>
                    <TouchableOpacity onPress = {this._onOrders}  style = {styles.prescriptionButton}>
                        <Image source = {require('../../assets/order.png')} style = {styles.ordericon}/>
                        <Text style = {styles.order}>My Orders</Text>
                        <Image source = {require('../../assets/next.png')} style = {styles.nexticon}/>
                        <View style = {styles.line}/>
                    </TouchableOpacity>
                </View>
                <View style = {styles.listView}>
                    <TouchableOpacity onPress = {this._onMyPrescription}  style = {styles.prescriptionButton}>
                        <Image source = {require('../../assets/ic_prescription.png')} style = {styles.ordericon}/>
                        <Text style = {styles.order}>My Prescription</Text>
                        <Image source = {require('../../assets/next.png')} style = {styles.nexticon}/>
                        <View style = {styles.line}/>
                    </TouchableOpacity>
                </View>
                <View style = {styles.listView}>
                    <TouchableOpacity onPress = {this._onHelp}  style = {styles.prescriptionButton}>
                        <Image source = {require('../../assets/help.png')} style = {styles.ordericon}/>
                        <Text style = {styles.order}>Help</Text>
                        <Image source = {require('../../assets/next.png')} style = {styles.nexticon}/>
                        <View style = {styles.line}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}



const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)