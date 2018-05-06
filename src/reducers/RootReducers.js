import { combineReducers } from 'redux';
import SelectDateReducer from '../module/SelectDate/selectDate.reducers/SelectDateReducer';

const rootReducer = combineReducers({
    selectDateReducer : SelectDateReducer,
})

export default rootReducer;