//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,AsyncStorage,ScrollView } from 'react-native';
import { connect } from 'react-redux'
import API from '../../common/API'

// create a component
class Instruction extends Component {
    constructor(props){
        super(props);
        this.state = {
            instruction:'',
        }
    }

    componentWillMount() {
        var { productID } = this.props
        this.fetchInstruction(productID)
    }

    fetchInstruction(productID){
        AsyncStorage.getItem('TOKEN').then((value) =>{
            REQUEST_URL = API.SERVER_URL + 'products/' + productID + '/instructions.json'

            fetch(REQUEST_URL, {
                method: 'GET',
                headers: { 
                    'X-Spree-Token': API.TOKEN,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    instruction: responseData.pharmacology_action,
                })

            }).catch((error) =>{
                console.log(error)
            })
        })

    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text>{this.state.instruction}</Text>
                </ScrollView>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent', 
        padding: 20
    },
});


const mapStateToProps = state => ({
    productID: state.product.productID
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Instruction)
