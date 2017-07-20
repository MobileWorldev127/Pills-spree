import React, {Component, PropTypes} from 'react'
import {
    StyleSheet, 
    Text,
    Button, 
    View,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    ListView,
    ScrollView,
    Platform,
    AsyncStorage,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Constant from '../../common/Constant'
import Blood_Btn from '../button/Blood_Btn'
import ImagePicker from 'react-native-image-picker';
import API from '../../common/API'
import TabViewExample from './TabViewExample';
import AutoComplete from 'react-native-autocomplete-input'
import AutoSearchCell from '../button/AutoSearchCell'

var pillsList = []
var categoryList = []
var realCategoryList = []
var productNameList = []
var filteredDataList =[]

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerView:{
        width: Constant.WIDTH_SCREEN,
        height: 80,
        backgroundColor: Constant.APP_COLOR,
    },
    orderView:{
        width: Constant.WIDTH_SCREEN,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },
    lineView:{
        width: Constant.WIDTH_SCREEN,
        height: 1,
        backgroundColor: 'gray',
    },
    bodyView:{
        width:Constant.WIDTH_SCREEN,
        flexDirection: 'column',
    },
    categoryView1:{
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    prescription:{
        width: 23,
        height: 25,
        resizeMode: 'contain',
        marginLeft: 20,
    },
    uploadBtn:{
        width: 80,
        height: 30,
        backgroundColor: Constant.APP_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:5,
        position:'absolute',
        right: 20,
    },
    uploadlbl:{
        color:'white'
    },
    ordertxt:{
        marginLeft: 15,
    },
    poptxt:{
        color:'darkgray',
        fontSize: 15,
        marginLeft: 20,
    },
    buttonView:{
        position:'absolute',
        right: 25,
    },
    viewtxt:{
        color:Constant.APP_COLOR,
        fontSize: 16,
    },
    category:{
        marginLeft: 20,
    },
    searchView:{
        backgroundColor: 'white',
        opacity: 0.5,
        width: Constant.WIDTH_SCREEN - 110,
        height: 35,
        position:'absolute',
        left: 20,
        bottom: 20,
        borderRadius:5,
        alignItems:'center',
        flexDirection: 'row',
    },
    searchicon:{
        width: 16,
        height: 16,
        resizeMode: 'contain',
        marginLeft: 15,
    },
    cancelbtn:{
        position:'absolute',
        bottom: 27,
        right: 20,
    },
    canceltxt :{
        color:'white',
        fontSize: 15,
    },
    textinput:{
        marginLeft: 10,
        paddingVertical: 0,
        width: Constant.WIDTH_SCREEN-160,
        color: 'black',
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
    autoView: {
        width: Constant.WIDTH_SCREEN-110,
        borderWidth: 1,
        borderColor: Constant.APP_COLOR,
        backgroundColor: 'white',
        position: 'absolute',
        top: 59,
        left: 20,
    }
})

class Home extends Component {
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
            dataSource1: ds.cloneWithRows(realCategoryList),
            filterDataSource: ds.cloneWithRows(filteredDataList),
            text:'',
            pillsList:[],
            productNameList: [],
            avatarSource: null,
            videoSource: null,
        }
    }

    componentWillMount() {
        filteredDataList = []
        this.getCategoryList();    
    }
    getCategoryList(){
        categoryList = [];
        realCategoryList = []
        REQUEST_URL = API.SERVER_URL + 'taxonomies'
        fetch(REQUEST_URL, {
            method: 'GET',
            headers: { 
                'X-Spree-Token': API.TOKEN ,
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            categoryList = responseData.taxonomies[0].root.taxons
            for(var i=0 ; i<6; i++){
                realCategoryList.push(categoryList[i])
            }
            this.setState({
                dataSource1: this.state.dataSource1.cloneWithRows(realCategoryList)
            })
        }).catch((error) =>{
            console.log(error)
        })     
    }

    _onPressUpload = () => {
        const options = {
            title:'avatar select',
            takePhotoButtonTitle: 'Take Photo',
            chooseFromLibraryButtonTitle: 'Choose from Library',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let PicturePath = response.uri;

                if(PicturePath){
                    var data = new FormData();
                    
                    data.append(
                        'prescription[image]', {
                            uri: PicturePath,
                            name: response.fileName,
                            type: response.type
                        }
                    )
                    AsyncStorage.getItem('TOKEN').then((value) =>{
                        REQUEST_URL = API.UPLOADPRESCRIPTION
                        fetch(REQUEST_URL, {
                            method: 'POST',
                            headers: { 
                                'X-Spree-Token': value,
                                'Content-Type': 'multipart/form-data',
                                'Accept': 'application/json'
                            },
                            body: data

                        })
                        .then((response1) => response1.json())
                        .then((responseData) => {
                            // prescriptionList = responseData.prescriptions

                            console.log(responseData)
                            // this.setState({ prescriptionList: prescriptionList})
                        }).catch((error) =>{
                            console.log(error)
                        })
                    })
                } 
            }
        });

    }

    showAutoView(text){

        this.setState({ text: text });

        this.filterData(text)
    }

    _onBlood = () =>{
        var { navigate } = this.props.navigation; 
        navigate('SearchResult',{category: 'Blood Pressure'})
    }

    _onSubmit = () => {
        var { navigate } = this.props.navigation;
        navigate('SearchResult',{category: 'PRODUCT CATEGORIES', searchText: this.state.text})

    }
    filterData(query){
        if(query.length > 2){
            filteredDataList = []
            var REQUEST_URL = API.SERVER_URL + 'products?q[name_start]=' + query + '&token=' + API.TOKEN

            fetch(REQUEST_URL, {
                method: 'GET',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                // var sproducts = responseData.products
                filteredDataList = []
                console.log(responseData)
                var array = [] 
                array = responseData.products
                if(array.length == 0){
                    filteredDataList = [{'name':'There is no such drug', 'id':'0'}]
                    this.setState({ 
                        filterDataSource: this.state.filterDataSource.cloneWithRows(filteredDataList)
                    })
                    console.log(filteredDataList)
                }else{
                    for(var i = 0 ; i < array.length ; i++){
                        filteredDataList.push(array[i])
                    }
                    this.setState({ 
                        filterDataSource: this.state.filterDataSource.cloneWithRows(filteredDataList)
                    })
                    console.log(filteredDataList)
                }


            }).catch((error) =>{
                console.log(error)
            })
        }
        else{
            filteredDataList = []
            this.setState({ 
                filterDataSource: this.state.filterDataSource.cloneWithRows(filteredDataList)
            })
        }
        
    }
    showSearchAutoView() {
        return(
            <View style = {styles.autoView}>
                <ListView
                    dataSource = {this.state.filterDataSource}
                    renderRow = {(rowdata) => <AutoSearchCell rowData = {rowdata} navigation = {this.props.navigation}/>}
                    enableEmptySections = {true}
                />
            </View>
        )
    }

    _onViewAll = () => {
        // this.setState({ 
        //     dataSource1: this.state.dataSource1.cloneWithRows(categoryList)
        // })
        var { navigate } = this.props.navigation;
        navigate('Tab', { isSelectedTab: 'categories' })
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style = {styles.headerView}>
                    <View style = {styles.searchView}>
                        <Image source = {require('../../assets/search.png')} style = {styles.searchicon}/>
                        <TextInput
                            style={styles.textinput}
                            onChangeText = {(text) => this.showAutoView(text)}
                            value = {this.state.text}
                            placeholder = 'Search Medicines'
                            returnKeyType = 'search'
                            autoCorrect = {true}
                            //onSubmitEditing = {this._onSubmit}
                            underlineColorAndroid = 'transparent'
                        />

                    </View>
                    <TouchableOpacity onPress = {this._onCancel} style = {styles.cancelbtn}>
                        <Text style = {styles.canceltxt}>CANCEL</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.orderView}>
                    <Image style = {styles.prescription} source = {require('../../assets/prescription.png')} />
                    <Text style = {styles.ordertxt}>Order with Prescription</Text>
                    <TouchableOpacity style = {styles.uploadBtn} onPress={this._onPressUpload}>
                        <Text style = {styles.uploadlbl}>UPLOAD</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.lineView} />
                <View style = {styles.bodyView}>
                    <View style = {styles.categoryView1}>
                        <Text style = {styles.poptxt}>Popular Categories</Text>
                        <TouchableWithoutFeedback onPress = {this._onViewAll}><View style = {styles.buttonView}>
                            <Text style = {styles.viewtxt}>VIEW ALL</Text></View>
                        </TouchableWithoutFeedback>
                    </View>
                  
                    <ListView
                        contentContainerStyle = {styles.list1}
                        dataSource = { this.state.dataSource1 }
                        renderRow = {(rowdata) => <Blood_Btn rowData = {rowdata} navigation = {this.props.navigation}/>}
                        enableEmptySections = {true}
                    />
                </View>
                {this.showSearchAutoView()}
                

            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    // navigate: state.props.navigation
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Home)