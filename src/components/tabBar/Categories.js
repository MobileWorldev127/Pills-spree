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
    ListView,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Constant from '../../common/Constant'
import Blood_Btn from '../button/Blood_Btn'
import API from '../../common/API'

var categoryList = []

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
    lineView:{
        width: Constant.WIDTH_SCREEN,
        height: 1,
        backgroundColor: 'lightgray',
    },
    bodyView:{
        width:Constant.WIDTH_SCREEN,
        flexDirection: 'column',
    },
    uploadlbl:{
        color:'white'
    },

    search:{
        width: 22,
        height: 22,
        resizeMode: 'contain',
        position: 'absolute',
        right: 20
    },
    product:{
        fontSize: 20,
    },
    list1: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        width: Constant.WIDTH_SCREEN,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
    },
})

class Categories extends Component {
    static navigationOptions = {
        title:'HOME',
        headerTitleStyle:{
            textAlign: 'center',
            alignSelf:'center',
        },
        headerStyle:{
        },
    }

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource1: ds.cloneWithRows(categoryList),
        }
    }

    componentWillMount() {
        this.getCategoryList(); 
    }
    getCategoryList(){
        categoryList = [];
        REQUEST_URL = API.SERVER_URL + 'taxonomies?token=' + API.TOKEN
        fetch(REQUEST_URL, {
            method: 'GET',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            categoryList = responseData.taxonomies[0].root.taxons
            console.log(categoryList)
            this.setState({
                dataSource1: this.state.dataSource1.cloneWithRows(categoryList)
            })
        }).catch((error) =>{
            console.log(error)
        })     
    }
    _onPressUpload = () => {
        alert('click upload')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style = {styles.headerView}>
                    <Text style = {styles.product}>PRODUCT CATEGORIES</Text>
                    <Image source = {require('../../assets/search.png')} style = {styles.search}/>
                </View>
                <View style = {styles.lineView} />
                <View style = {styles.bodyView}>

                    <ListView
                        contentContainerStyle = {styles.list1}
                        dataSource = { this.state.dataSource1 }
                        renderRow = {(rowdata) => <Blood_Btn rowData = {rowdata} navigation = {this.props.navigation}/>}
                        enableEmptySections = {true}
                    />
                </View>
            </View>
        );
    }
}



const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Categories)