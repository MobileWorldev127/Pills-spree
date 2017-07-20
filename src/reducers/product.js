var initialState = {
    productID: '',
    productName: ''
};

function product(state = initialState, action) {
    switch(action.type){
        case 'Product_Result':
            return {
                ...state,
                productID: action.ID,
                productName: action.NAME,
            };
        default:
            return state
    }
}

module.exports = product;