//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,AsyncStorage,ScrollView } from 'react-native';
import { connect } from 'react-redux'
import API from '../../common/API'

var reviewList = []

// create a component
class Review extends Component {
    constructor(props){
        super(props);
        this.state = {
            Review:'',
            reviewList: [],
        }
    }

    componentWillMount() {
        var { productID } = this.props
        this.fetchReview(productID)
    }

    fetchReview(productID){
        reviewList = []
        AsyncStorage.getItem('TOKEN').then((value) =>{
            REQUEST_URL = API.SERVER_URL + 'products/' + productID + '/reviews.json'

            fetch(REQUEST_URL, {
                method: 'GET',
                headers: { 
                    'X-Spree-Token': API.TOKEN,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                console.log('reviweweewrwerwe')
                console.log(responseData)
                var List = responseData.reviews
                for(var i=0; i<List.length; i++){
                    reviewList.push(List[i].description)
                }
                this.setState({ reviewList: reviewList})
                console.log(reviewList)
            }).catch((error) =>{
                console.log(error)
            })
        })

    }

    OrdersView(){
        const count = this.state.reviewList
        if(count == 0){
            return(
                <View style = {styles.cell}>
                    <Text style = {styles.alertTxt}>There is no data</Text>
                </View>
            );
        }
        else{
            return(
                reviewList.map((pill, id) =>
                    <View style = {styles.cell} key = {id}>
                        <Text >{pill}</Text>
                    </View>
                )
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {/*<View style = {styles.bodyView}>*/}
                        
                            {this.OrdersView()}
                        
                    {/*</View>*/}
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
    cell:{
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
    }
});


const mapStateToProps = state => ({
    productID: state.product.productID
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Review)
