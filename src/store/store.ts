import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import counterReducer from "./auth/CounterReducer";
import AuthReducer from "./auth/auth.reducer";
import PostReducer from "./post/post.reducer";


const reducers = combineReducers({ counter: counterReducer ,auth: AuthReducer,post:PostReducer});

export type State = ReturnType<typeof reducers>;

export default createStore(reducers, applyMiddleware(thunk));