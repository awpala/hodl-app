import { combineReducers } from "redux";
import cryptoReducer from './crypto';

const rootReducer = combineReducers({
  crypto: cryptoReducer,
});

export default rootReducer;
