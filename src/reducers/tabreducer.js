
const homeIcon = {
    scale: 1,
    uri: '../../assets/home.png'
}
const categoriesIcon = {
    scale: 1,
    uri: '../../assets/categories.png'
}
const cartIcon = {
    scale: 1,
    uri: '../../assets/cart.png'
}
const profileIcon = {
    scale: 1,
    uri: '../../assets/profile.png'
}

const tabs = [
  { key: 'home', icon: homeIcon, title: 'Home' },
  { key: 'categories', icon: categoriesIcon, title: 'Categories' },
  { key: 'cart', icon: cartIcon, title: 'Cart' },
  { key: 'profile', icon: profileIcon, title: 'Profile' }
]

const initialState = {
  index: 0,
  tabs
}

function tabsNav (state = initialState, action) {
  if (action.index === state.index) return state
  switch (action.type) {
    case 'CHANGE_TAB':
      return {
        ...state,
        index: action.index
      }
    default:
      return state
  }
}

export default tabsNav
