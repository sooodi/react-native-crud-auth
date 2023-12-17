import { Action, ActionCreator, Dispatch } from "redux";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  
} from "../types";


import AuthService from "./auth.service";
import { ThunkAction } from "redux-thunk";
import { authState ,loginInitState} from "./auth.reducer";
import { apiObj, regiserUserObject } from "./user.types";
import { setDatas } from "../asyncStorage.service";


export interface LoginAction {
  type: typeof LOGIN_SUCCESS |typeof LOGIN_FAIL ;
  payload: apiObj;
}
export interface LogoutAction {
  type: typeof LOGOUT;
  payload: string;
}
export interface RegisterAction {
  type: typeof REGISTER_SUCCESS;
  payload: string;
}

export type LoginThunkAction = ThunkAction<
  void,
  authState,
  LoginAction
>;
export type LogouyThunkAction = ThunkAction<
  void,
  authState,
  LogoutAction
>;
export type RegisterThunkAction = ThunkAction<
  void,
  authState,
  RegisterAction
>;
// export function increment(amount: number): CounterThunkAction {
//   return async dispatch => {
//     dispatch({ type: INCREMENT, amount });
//   };
// }
export type LogoutThunkAction = ThunkAction<
  void,
  authState,
  LogoutAction
>;
export type AuthAction=LoginAction | LogoutAction |RegisterAction

export function logout(userInfo: apiObj): LogoutThunkAction {
  
  return async dispatch => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload:userInfo ,
    });
   
};
};

export function isLogin(userInfo: apiObj): LoginThunkAction {
  return async dispatch => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload:userInfo ,
        });
       
  };
}
export function login(email:string, password:string,rememberMe:boolean): LoginThunkAction {
  return async dispatch => {
    
    AuthService.login(email, password).then(
      (payload) => {
      
        if(!payload)
        {
          dispatch({
            type: LOGIN_FAIL,
            payload:"fail" ,
          });
      
          return Promise.resolve();
        }
        else
        {
         
        dispatch({
          type: LOGIN_SUCCESS,
          payload ,
        });
        if(rememberMe)
          setDatas("@userinformation",payload).then()
        return Promise.resolve();
      }
      }
      
    );
  };
}

export function register(userData:regiserUserObject): RegisterThunkAction {
  return async dispatch => {
    
    AuthService.register(userData).then(
      (payload) => {
    
        if(!payload)
        {
          dispatch({
            type: REGISTER_FAIL,
          });
      
          return Promise.reject();
        }
        else
        {
         
        // dispatch({
        //   type: REGISTER_SUCCESS,
        //   payload ,
        // });
          // setDatas("@userinformation",payload).then()
        return Promise.resolve();
      }
      }
      
    );
  };
}



// export const register = (username, email, password)  => {
//   return  (dispatch:Dispatch) => {
//   AuthService.register(username, email, password).then(
//     (response) => {
//       dispatch({
//         type: REGISTER_SUCCESS,
//       });

//       dispatch({
//         type: SET_MESSAGE,
//         payload: response.data.message,
//       });

//       return Promise.resolve();
//     },
//     (error) => {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       dispatch({
//         type: REGISTER_FAIL,
//       });

//       dispatch({
//         type: SET_MESSAGE,
//         payload: message,
//       });

//       return Promise.reject();
//     }
//   );
//   }
// };

