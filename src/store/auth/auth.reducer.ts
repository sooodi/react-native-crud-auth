import { getData, getDatas } from "../asyncStorage.service";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from "../types";
import { AuthAction,  } from "./auth.action";
import { loginObj } from "./user.types";
export type authState = number;

 
export  const loginInitState:loginObj = 
    { isLoggedIn: false, userInfo: null,error:false };
  
  export default function AuthReducer(state = loginInitState, action:AuthAction) {
    const { type, payload } = action;

    switch (type) {
      // case REGISTER_SUCCESS:
      //   return {
      //     ...state,
      //     isLoggedIn: false,
      //   };
      // case REGISTER_FAIL:
      //   return {
      //     ...state,
      //     isLoggedIn: false,
      //   };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          error:false,
          userInfo: payload,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          error:true,
          userInfo: null,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          error:false,
          userInfo: null,
        };
      default:
        return state;
    }
  }