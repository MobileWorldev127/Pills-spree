//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Constant from '../../common/Constant'

// create a component
class AutoSearchCell extends Component {
    _onDrug =(id) => {
        if(id == 0){

        }else{
            var { ProductResult } = this.props
            ProductResult(id)
            var { navigate } = this.props.navigation;
            navigate('Tab', { isSelectedTab: 'cart' })
        }
        
    }
    render() {
        return (
            <TouchableOpacity onPress = {() => this._onDrug(this.props.rowData.id)}>
                <View style={styles.container}>
                    <Text>{this.props.rowData.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        width: Constant.WIDTH_SCREEN-110,
        height: 30,
        justifyContent: 'center',
        paddingLeft: 15,
    },
});

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    ProductResult: (productID) => dispatch({type: 'Product_Result', ID: productID})
})

export default connect(mapStateToProps, mapDispatchToProps)(AutoSearchCell)

