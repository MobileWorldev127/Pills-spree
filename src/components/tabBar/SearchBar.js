import React, {PropTypes} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
    container: {
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

    searchInput: {
        flex: 1,
        height: 35,
        fontSize: 12
    },

    iconContainer: {
        width: 25,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },

    icon: {
        width: 15,
        height: 15
    },


    closeContainer: {
        width: 25,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },

    cancelIcon: {
        width: 10,
        height: 10
    }
});

const SearchBar = ({clear, set, submit, searchText}) => (
    <TouchableWithoutFeedback>
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Image source={require('../assets/icons/search.png')} style={styles.icon}/>
            </View>
            <TextInput
                style={styles.searchInput}
                returnKeyType="search"
                placeholder="search"
                autoCorrect={true}
                value={searchText}
                onChangeText={(text) => set(text)}
                onEndEditing={submit}
             />
        </View>
    </TouchableWithoutFeedback>
);

SearchBar.propTypes = {
    searchText: PropTypes.string.isRequired,
    clear: PropTypes.func.isRequired,
    set: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
};

const mapStateToProps = state => (
    {
        searchText: state.search.searchText
    }
);

const mapDispatchToProps = dispatch => ({
    clear: () => dispatch({type: 'Search_ClearText'}),
    set: (text) => dispatch({type: 'Search_SetText', value: text})
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);