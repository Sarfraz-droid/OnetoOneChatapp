import { combineReducers } from 'redux'
import AllMessages  from './AllMessages';
import Login from './Login';
const allreducers = combineReducers({
    message: AllMessages,
    Login: Login,
}); 

export default allreducers;