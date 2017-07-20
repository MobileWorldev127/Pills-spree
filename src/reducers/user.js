

var initialState = {
  isLoggedIn: false,
  is_registeration_complete: false,
  username: '',
  email: '',
  token: '',
};

function user(state = initialState, action) {
    switch(action.type){
        case 'Set_UserData':
            return {
                ...state,
                isLoggedIn: true,
                username: action.username,
                email:  action.email,
                token: action.token
            }
        default:
            return state
    }


}

module.exports = user;