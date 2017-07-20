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
import { NavigationActions } from 'react-navigation'
import API from '../../common/API'
const  { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button:{
        width: width - 40,
        height: 50,
        marginLeft: 20,
        marginTop:50,
        borderRadius: 10,
        backgroundColor:'#1badc0',
        justifyContent:'center',                                            
        alignItems:'center',
    },
    buttonText: {
        color:'white', 
        fontSize:18
    },
    inputText:{
        height: 35,
        width: width - 40,
        marginLeft: 20,
        marginTop: 10,
        borderColor: 'transparent',
        paddingVertical: 0,
        paddingLeft: 5,
        fontSize: 16,
    },
    underLine: {
        width: width - 40,
        height: 1,
        backgroundColor: 'gray',
        marginTop: 5,
        marginLeft: 20,
    },
    
})

class Login extends Component {
    static navigationOptions = {
        title:'LOGIN',
        headerTitleStyle:{
            textAlign: 'center',
            alignSelf:'center',
            justifyContent: 'space-between',
        },
        headerStyle:{
        }
    };

    constructor(props){
        super(props)
        this.state = {
            useremail:'',
            userpassword:''
        }
    }

    _onPressLogIn = ({Login}) => {
        // alert('234')
        REQUEST_URL = API.LOGIN
        fetch(REQUEST_URL, {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                spree_user:{
                    'email':this.state.useremail, 
                    'password':this.state.userpassword, 
                }
            })
        })
        .then((response) => response.json())
        .then((responseData) => {
            if(responseData.error){
                alert('Invalid email or password.')
            }
            else{
                AsyncStorage.setItem('TOKEN', responseData.spree_api_key);
                AsyncStorage.setItem('USEREMAIL', responseData.email);
                AsyncStorage.setItem('USERNAME', responseData.bill_address.full_name);
                
                var { navigate } = this.props.navigation;
                navigate ('Tab')
            }
        }).catch((error) =>{
            console.log(error)
        })
    }

    render() {
        var { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style = {{marginTop: 40}}>
                    <TextInput
                        style = {styles.inputText}
                        onChangeText = {(text) => this.setState({useremail:text})}
                        placeholder = 'Email'
                        keyboardType = 'email-address'
                        underlineColorAndroid = 'transparent'/>
                    <View style = {styles.underLine}></View>
                </View>
                <View style = {{marginTop: 20}}>
                    <TextInput
                        style = {styles.inputText}
                        onChangeText = {(text) => this.setState({userpassword:text})}
                        placeholder = 'Password'
                        secureTextEntry = {true}
                        underlineColorAndroid = 'transparent'/>
                    <View style = {styles.underLine}></View>
                </View>

                <TouchableOpacity onPress = {this._onPressLogIn} style = {styles.button}>
                    <Text style = {styles.buttonText}>LOG IN</Text>   
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => navigate('Signup')}
                    style = {[styles.button, {marginTop:20}]}>
                        <Text style = {styles.buttonText}>REGISTER</Text>   
                </TouchableOpacity>
            </View>
        );
    }
}

// const mapStateToProps = (state, ownProps) => ({})

// const mapDispatchToProps = dispatch => ({
    // Login: (username, email, token) => dispatch({ type: 'Set_UserData', username: username, email: email, token: token})
// })

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Login)