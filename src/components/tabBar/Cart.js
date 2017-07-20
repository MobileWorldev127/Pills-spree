import React, {Component, PropTypes, PureComponent} from 'react'
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
    AsyncStorage,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Constant from '../../common/Constant'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import Confirm from './Confirm'
import API from '../../common/API'
import Instruction from './Instruction'
import Substitute from './Substitute'
import Review from './Review'

var productID = ''
var instructionTxt = ''
var substituteList = []
var review = ''


const FirstRoute = () => <Instruction />
const SecondRoute = () => <Substitute />
const ThirdRoute = () => <Review/>


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerView:{
        width: Constant.WIDTH_SCREEN,
        height: 70,
        backgroundColor: 'white',
        alignItems:'center',
        justifyContent:'center',
    },
    search:{
        width: 22,
        height: 22,
        resizeMode: 'contain',
        position: 'absolute',
        right: 20
    },
    confirm:{
        fontSize: 20
    }, 
    titleView:{
        padding: 30,
    },
    pillName:{
        fontSize: 18,
    },
    pillImage:{
        width: 130,
        height: 80,
        marginLeft: (Constant.WIDTH_SCREEN - 190)/2,
        resizeMode: 'contain',
    },
    costView:{
        flexDirection:'row',
        marginTop:10,
        alignItems:'center',
    },
    destxt:{
        color:'gray',
        fontSize: 13
    },
    costtxt:{
        fontSize: 17,
        fontWeight: 'bold',
        position:'absolute',
        right: 30,
    },
    addView:{
        flexDirection:'row',
        marginTop: 15,
        alignItems:'center',
    },
    plustxt:{
        color:Constant.APP_COLOR,
        fontSize: 30,
    },
    minustxt:{
        color:Constant.APP_COLOR,
        fontSize: 30,
    },
    counttxt:{
        fontSize: 25,
    },
    addCart:{
        width: 120,
        height: 40,
        backgroundColor: Constant.APP_COLOR,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 5,
        position:'absolute',
        right:0,
    },
    addtxt:{
        color: 'white',
        fontSize: 14,
    },
    line:{
        backgroundColor: 'lightgray',
        width: Constant.WIDTH_SCREEN,
        height: 1,
    },
    container1:{
        flex:1,
        width: Constant.WIDTH_SCREEN,
    },
})

class Cart extends Component {
    static navigationOptions = {
        title:'CART',
        headerTitleStyle:{
            textAlign: 'center',
            alignSelf:'center',
        },
        headerStyle:{
        }
    };
    componentDidMount() {
        var { productID } = this.props
        this.fetchView(productID)
    }

    fetchView(productID){
        console.log(productID)
        console.log('cart')
        AsyncStorage.getItem('TOKEN').then((value) =>{
            REQUEST_URL = API.SERVER_URL + 'products/' + productID
            fetch(REQUEST_URL, {
                method: 'GET',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Spree-Token': API.TOKEN,
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                var url = responseData.master.images[0].product_url
                this.setState({
                    totalCost: responseData.price,
                    defaultCost: responseData.price,
                    name: responseData.name,
                    imageURL:url,
                })
            }).catch((error) =>{
                console.log(error)
            })
        })

    }

    constructor(props){
        super(props);
        this.state = {
            totalCount: 1,
            totalCost: '',
            defaultCost: '', 
            index: 0,
            routes: [
                { key: '1', title: 'Instruction' },
                { key: '2', title: 'Substitute' },
                { key: '3', title: 'Review' },
            ],
            name: '',
            imageURL: '',
        }
    }
    
    _onMinus = () => {
        var defaultValue = this.state.defaultCost
        var totalCount = this.state.totalCount
        totalCount --
        if (totalCount < 1){
            totalCount = 1
        } 
        totalCost  = defaultValue * totalCount
        this.setState({
            totalCount: totalCount,
            totalCost: totalCost,
        })
    }
    _onPlus = () =>{
        var defaultValue = this.state.defaultCost
        var totalCount = this.state.totalCount
        totalCount ++,
        totalCost  = defaultValue * totalCount
        this.setState({
            totalCount: totalCount,
            totalCost: totalCost,
        })
    }
    _addCart = () => {
        var { navigate } = this.props.navigation; 
        navigate('Confirm')
    }

    _handleChangeTab = index => this.setState({ index });
    // _renderHeader = props => <TabBar {...props} />;
    _renderHeader = props => 
        <TabBar 
            {...props} 
            indicatorStyle={{backgroundColor:Constant.APP_COLOR}}
            style = {{backgroundColor:'transparent',}}
            labelStyle = {{color:Constant.APP_COLOR, margin:7}}
        />;

    _renderScene = SceneMap({
        '1': FirstRoute,
        '2': SecondRoute,
        '3': ThirdRoute
    });

    render() {
        const Total_Count = this.state.totalCount;
        const Total_Cost = this.state.totalCost;
        return(
            <View style={styles.container}>
                <View style = {styles.headerView}>
                    <Text style = {styles.confirm}>DETAILS</Text>
                    <Image source = {require('../../assets/search.png')} style = {styles.search}/>
                </View>
                <View style = {styles.titleView}>
                    <Text style = {styles.pillName}>{this.state.name}</Text>
                    <Image source = {{uri: this.state.imageURL}} style = {styles.pillImage} defaultSource = {require('../../assets/pills1.png')}/>
                    <View style = {styles.costView}>
                        <Text style = {styles.destxt}>10mg Tablet</Text>
                        <Text style = {styles.costtxt}>${Total_Cost}</Text>
                    </View> 
                    <View style = {styles.addView}>
                        <TouchableOpacity onPress = {this._onMinus}>
                            <Text style = {styles.minustxt}>-</Text>
                        </TouchableOpacity>
                        <Text style = {styles.counttxt}>    {Total_Count}    </Text>
                        <TouchableOpacity onPress = {this._onPlus}>
                            <Text style = {styles.plustxt}>+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {this._addCart} style = {styles.addCart}>
                            <Text style = {styles.addtxt}>ADD TO CART</Text>
                        </TouchableOpacity>
                    </View>         
                </View>
                <View style = {styles.line}/>
                <View style = {styles.container1}>
                    <TabViewAnimated
                        navigationState={this.state}
                        renderScene={this._renderScene}
                        renderHeader={this._renderHeader}
                        onRequestChangeTab={this._handleChangeTab}
                    />
                </View>
            </View>
        );
    }
}



const mapStateToProps = state => ({
    productID: state.product.productID
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)