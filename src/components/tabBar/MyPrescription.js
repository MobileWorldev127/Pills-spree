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
    ScrollView,
    AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Constant from '../../common/Constant'
import PrescriptionCell from '../button/PrescriptionCell';
import API from '../../common/API'

var prescriptionList = []
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bodyView:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        width: Constant.WIDTH_SCREEN,
        padding: 20,
    },
})

class MyPrescription extends Component {
    static navigationOptions = {
        title:'My Prescriptions',
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
            prescriptionList:[]
        }
    }

    componentDidMount() {
        prescriptionList = [];
        AsyncStorage.getItem('TOKEN').then((value) =>{
            REQUEST_URL = API.MYPRESCRIPTION
            fetch(REQUEST_URL, {
                method: 'GET',
                headers: { 
                    'X-Spree-Token': value,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                prescriptionList = responseData.prescriptions

                this.setState({ prescriptionList: prescriptionList})
            }).catch((error) =>{
                console.log(error)
            })
        })
        
    }

    myprescriptionView(){
        const count = this.state.prescriptionList
        if(count == 0){
            return(
                <Text style = {styles.alertTxt}>There is no data</Text>
            );
        }
        else{
            return(
                prescriptionList.map((pill, id) =>
                    <TouchableOpacity onPress = {this._onPill} key = {id}>
                        <PrescriptionCell rowdata = {pill} key = {id}/>
                    </TouchableOpacity>
                )
            );
        }
    }

    render() {
        
        return (
            <View style = {styles.container}>
                <ScrollView>
                    <View style = {styles.bodyView}>
                        
                            {this.myprescriptionView()}
                        
                    </View>
                </ScrollView>
            </View>
        );
    }
}



const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(MyPrescription)