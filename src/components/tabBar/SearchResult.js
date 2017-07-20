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
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Constant from '../../common/Constant'
import PillsItemCell from '../button/PillsItemCell'
import API from '../../common/API'

var pillsList = []
var array = []
var productID = ''

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bodyView:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        width: Constant.WIDTH_SCREEN,
        padding: 10,
    },
    alertTxt:{
        width: 105,
        height: 20,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: (Constant.WIDTH_SCREEN - 105)/2,
    }
})

class SearchResult extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.category}`,
        headerTitleStyle:{
            textAlign: 'center',
            alignSelf:'center',
        },
        headerStyle:{
        }
    });

    constructor(props){
        super(props);
        this.state = {
            category: '',
            pillsList: [],
        }
    }

    componentWillMount() {
        this.setState({
            category: this.props.navigation.state.params.category
        })

        {this.initProducts()}

        
    }
    initProducts(){
        var  REQUEST_URL = ''
        pillsList = []
        if(this.props.navigation.state.params.category == "PRODUCT CATEGORIES"){
            REQUEST_URL = API.SERVER_URL + 'products?q[name_start]=' + this.props.navigation.state.params.searchText + '&token=' + API.TOKEN
        }
        else{
            REQUEST_URL = API.SERVER_URL + 'taxons/products?id=' + this.props.navigation.state.params.id + '&token=' + API.TOKEN
        }
        
        fetch(REQUEST_URL, {
            method: 'GET',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            var sproducts = responseData.products
            var product;
            sproducts.map((product, index) =>{
                pillsList.push(product['master']);
            })
            this.setState({ pillsList: pillsList})

        }).catch((error) =>{
            console.log(error)
        })
    }

    _onPill = (pill) => {

        var { ProductResult } = this.props
        ProductResult(pill.id)

        var { navigate } = this.props.navigation;

        navigate('Tab', { isSelectedTab: 'cart' })
    }
    
    generatePillsField(){
        const count = this.state.pillsList
        if(count == 0){
            return(
                <Text style = {styles.alertTxt}>There is no data</Text>
            ); 
        }
        else{
            return(
                pillsList.map((pill, id) =>
                    <TouchableOpacity onPress = {() => this._onPill(pill)} key = {id}>
                        <PillsItemCell drug = {pill} key = {id}/>
                    </TouchableOpacity>
                )
            );
        }
    }

    render() {
        return(
            <View style = {styles.container}>
                <ScrollView>
                    <View style = {styles.bodyView}>
                        
                            {this.generatePillsField()}
                        
                    </View>
                </ScrollView>
                
            </View>
        );
    }
}



const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    ProductResult: (productID) => dispatch({type: 'Product_Result', ID: productID})
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult)