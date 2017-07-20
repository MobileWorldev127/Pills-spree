var { combineReducers } = require('redux');

import user from './user';
import tabreducer from './tabreducer';
import product from './product'

module.exports = combineReducers({
    user,
    tabreducer,
    product,
 });