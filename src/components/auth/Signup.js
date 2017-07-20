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
import Constant from '../../common/Constant'


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button:{
        width: Constant.WIDTH_SCREEN - 40,
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
        width: Constant.WIDTH_SCREEN - 40,
        marginLeft: 20,
        marginTop: 10,
        borderColor: 'transparent',
        paddingVertical: 0,
        paddingLeft: 5,
        fontSize: 18,
    },
    underLine: {
        width: Constant.WIDTH_SCREEN - 40,
        height: 1,
        backgroundColor: 'gray',
        marginTop: 5,
        marginLeft: 20,
    },
    
})

class Signup extends Component {
    static navigationOptions = {
        title:'SIGNUP',
        headerTitleStyle:{
            textAlign: 'center',
            alignSelf:'center',
        },
        headerStyle:{
        }
    };

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            username:'',
            email: '',
            password:'',
            confirmpassword:'',
        }
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    async onSignup() {
        var { navigate, dispatch } = this.props.navigation;
        // var { dispatch, onLoggedIn } = this.props;
        if (this.state.username == "") {
            alert("Username is empty.");
            return;
        }
        if (this.state.email == "") {
            alert("Email is empty.");
            return;
        }else{
            if (!this.validateEmail(this.state.email)) {
                alert('The e-mail address is not in a valid format');
                return;
            } 
        }
        if (this.state.password == "") {
            alert("Password is empty.");
            return;
        }
        if (this.state.confirmpassword == "") {
            alert("ConfirmPassword is empty.");
            return;
        }

        if (this.state.password.length < 6 || this.state.confirmpassword < 6){
            alert("The password minimum is 6 characters")
            return;
        }

        this.setState({ isLoading: true });

        if(this.state.password != this.state.confirmpassword){
            alert('The password and conformpassword is not matched')
        }
        else{
            REQUEST_URL = API.SERVER_URL + 'users.json'
            fetch(REQUEST_URL, {
                method: 'POST',
                headers: { 
                    'X-Spree-Token': API.TOKEN ,
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    user:{
                        'email':this.state.email, 
                        'password':this.state.password, 
                        'password_confirmation':this.state.confirmpassword,
                    }
                })
            })
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.error){
                    alert('User has already registered.')
                }
                else{
                    try {
                        AsyncStorage.setItem('USEREMAIL', responseData.email);
                    } catch (error) {
                        console.log(error)
                    }
                    navigate('Tab')
                }
            }).catch((error) =>{
                console.log(error)
            })
        }
    }

    render() {
        var { navigate } = this.props.navigation;
        var { username, email, password, confirmpassword } = this.state;
        return (
            <View style={styles.container}>
                <View style = {{marginTop: 40}}>
                    <TextInput
                        style = {styles.inputText}
                        placeholder = 'Name'
                        underlineColorAndroid = 'transparent'
                        value = {username}
                        onChangeText = {(text) => this.setState({username:text})}/>
                    <View style = {styles.underLine}></View>
                </View>
                <View style = {{marginTop: 20}}>
                    <TextInput
                        style = {styles.inputText}
                        onChangeText = {(text) => this.setState({email:text})}
                        placeholder = 'Email'
                        keyboardType = 'email-address'
                        underlineColorAndroid = 'transparent'
                        value = {email}/>
                    <View style = {styles.underLine}></View>
                </View>
                <View style = {{marginTop: 20}}>
                    <TextInput
                        style = {styles.inputText}
                        onChangeText = {(text) => this.setState({password:text})}
                        placeholder = 'Password'
                        secureTextEntry = {true}
                        underlineColorAndroid = 'transparent'
                        value = {password}/>
                    <View style = {styles.underLine}></View>
                </View>
                <View style = {{marginTop: 20}}>
                    <TextInput
                        style = {styles.inputText}
                        onChangeText = {(text) => this.setState({confirmpassword:text})}
                        placeholder = 'Confirm Password'
                        secureTextEntry = {true}
                        underlineColorAndroid = 'transparent'
                        value = {confirmpassword}/>
                    <View style = {styles.underLine}></View>
                </View>
                <TouchableOpacity onPress={() => this.onSignup()} style = {styles.button}>
                    <Text style = {styles.buttonText}>REGISTER</Text>   
                </TouchableOpacity>

            </View>
        );
    }
}



const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)