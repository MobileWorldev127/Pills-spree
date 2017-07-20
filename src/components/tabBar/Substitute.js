//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,AsyncStorage,ScrollView, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux'
import SubstituteCell from '../button/SubstituteCell';
import API from '../../common/API'
import Constant from '../../common/Constant'

var substituteList = []

// create a component
class Substitute extends Component {
    constructor(props){
        super(props);
        this.state = {
            substituteList:[]
        } 
    }

    componentWillMount() {
        var { productID } = this.props
        this.fetchSubstitute(productID)
    }

    fetchSubstitute(productID){
        substituteList = [];
        // AsyncStorage.getItem('TOKEN').then((value) =>{
            REQUEST_URL = API.SERVER_URL + 'products/' + productID + '/substitutes.json'
            // REQUEST_URL = 'http://pills.uz/api/products/1/substitutes.json'
            fetch(REQUEST_URL, {
                method: 'GET',
                headers: { 
                    'X-Spree-Token': API.TOKEN,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                var List = responseData.products
                for(var i=0; i<List.length; i++){
                    substituteList.push(List[i].name)
                }
                this.setState({ substituteList: substituteList})
            }).catch((error) =>{
                console.log(error)
            })
        // })
    }

    OrdersView(){
        const count = this.state.substituteList
        if(count == 0){
            return(
                <Text style = {styles.alertTxt}>There is no data</Text>
            );
        }
        else{
            return(
                substituteList.map((pill, id) =>
                    <TouchableOpacity onPress = {this._onPill} key = {id}>
                        <SubstituteCell rowdata = {pill} key = {id}/>
                    </TouchableOpacity>
                )
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style = {styles.bodyView}>
                        
                            {this.OrdersView()}
                        
                    </View>
                </ScrollView>
            </View>
        );
    }
}

// define your styles
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
});


const mapStateToProps = state => ({
    productID: state.product.productID
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Substitute)
