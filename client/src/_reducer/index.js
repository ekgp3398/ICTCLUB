import { combineReducers } from "redux"; //Root Reducer에서 여러개의 Reducer를 합쳐줌. 
import user from './user_reducer';

const rootReducer = combineReducers({
    user
})
export default rootReducer;