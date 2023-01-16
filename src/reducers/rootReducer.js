import { combineReducers } from 'redux';
import restaurantReducer from './restaurantReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  restaurant: restaurantReducer,
  auth: authReducer,
});

export default rootReducer;
