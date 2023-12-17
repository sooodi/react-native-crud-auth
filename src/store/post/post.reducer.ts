
import { CATEGORIES_FAIL, CATEGORIES_SUCCESS, CLEAR_FLAG_CREATE_POST, POSTS_FAIL,POSTS_SUCCESS, POST_CREATE_SUCCESS } from "../types";

import { PostAction,  } from "./post.action";
import { postApiObj } from "./post.types";
export type postState_ = number;

export  const postState:postApiObj = 
    { categories: [], posts:[],postCreated:false};
   
  export default function PostReducer(state = postState, action:PostAction) {
    const { type, payload } = action;
    // console.log("payload ",state.posts.length, payload?.length);
    switch (type) {
      case POST_CREATE_SUCCESS:
        return {
          ...state,
          
        };
        case CATEGORIES_SUCCESS:
          return {
            ...state,
            
            categories: action.payload,
          };
          case CATEGORIES_FAIL:
          return {
            ...state,
            
            categories: [],
          };
          case POSTS_SUCCESS:
          return {
            ...state,
            postCreated:action.payload?.afterCreate,
            posts: action.payload?.posts
          };
          case POSTS_FAIL:
          return {
            ...state,
            
            categories: [],
          };
          case CLEAR_FLAG_CREATE_POST:
          return {
            ...state,
            postCreated:false,
           
          };
      default:
        return state;
    }
  }