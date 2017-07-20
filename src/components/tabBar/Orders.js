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
import OrdersCell from '../button/OrdersCell';
import API from '../../common/API'

var ordersList = []
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bodyView:{
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        width: Constant.WIDTH_SCREEN,
        padding: 20,
    },
})

class Orders extends Component {
    static navigationOptions = {
        title:'Orders',
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
            ordersList:[]
        } 
    }

    componentDidMount() {
        ordersList = [];
        // AsyncStorage.getItem('TOKEN').then((value) =>{
            REQUEST_URL = API.ORDERS
            fetch(REQUEST_URL, {
                method: 'GET',
                headers: { 
                    'X-Spree-Token': API.TOKEN,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                var List = responseData.orders
                for(var i=0; i<List.length; i++){
                    if(List[i].line_items[0]){
                        ordersList.push(List[i].line_items[0].variant)
                    }
                    
                }
                this.setState({ ordersList: ordersList})
            }).catch((error) =>{
                console.log(error)
            })
        // })
    }

    OrdersView(){
        const count = this.state.ordersList
        if(count == 0){
            return(
                <Text style = {styles.alertTxt}>There is no data</Text>
            );
        }
        else{
            return(
                ordersList.map((pill, id) =>
                    <TouchableOpacity onPress = {this._onPill} key = {id}>
                        <OrdersCell rowdata = {pill} key = {id}/>
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
                        
                            {this.OrdersView()}
                        
                    </View>
                </ScrollView>
            </View>
        );
    }
}



const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Orders)