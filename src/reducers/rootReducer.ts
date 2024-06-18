import { combineReducers } from "redux";
import authReducer from './slices/authSlice'
import profieReducer from "./slices/profileSlice";
import cartReducer from "./slices/cartSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    profile: profieReducer,
})

export default rootReducer;