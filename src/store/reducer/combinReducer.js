import { combineReducers } from 'redux';
import { productReducer, categoryReducer } from './reducer'
const reducer = combineReducers({
    productReducer: productReducer,
    categoryReducer: categoryReducer, 
});
export default reducer;


