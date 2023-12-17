


import PostService from "./post.service";
import { ThunkAction } from "redux-thunk";
import {postState_ } from "./post.reducer";
import { postAddObject, postObject } from "./post.types";

import { CATEGORIES_FAIL, CATEGORIES_SUCCESS, CLEAR_FLAG_CREATE_POST, POSTS_FAIL, POSTS_SUCCESS, POST_CREATE_FAIL, POST_CREATE_SUCCESS } from "../types";


export interface CreatePostAction {
  type: typeof POST_CREATE_SUCCESS;
  payload: string;
}
export interface CreateFlagAction {
  type: typeof CLEAR_FLAG_CREATE_POST;
  payload: boolean;
}
export type CreateThunkAction = ThunkAction<
  void,
  postState_,
  CreatePostAction
>;
export interface postsAction {
  type: typeof POSTS_SUCCESS;
  payload: {posts:postObject,afterCreate:false};
}
export interface PostsFailAction {
  type: typeof POSTS_FAIL;
  payload: string;
}
export type PostsThunkAction = ThunkAction<
  void,
  postState_,
  postsAction
>;

export interface CategoriesAction {
  type: typeof CATEGORIES_SUCCESS;
  payload: postAddObject;
}
export interface CategoriesFailAction {
  type: typeof CATEGORIES_FAIL;
  payload: string;
}
export type CategoriesThunkAction = ThunkAction<
  void,
  postState_,
  CategoriesAction
>;


export type PostAction=CreatePostAction  | CategoriesAction | CategoriesFailAction | postsAction | PostsFailAction |CreatePostAction | CreateFlagAction

export function clearFlagNewPost(): PostsThunkAction {
  return async dispatch => {
        dispatch({
          type: CLEAR_FLAG_CREATE_POST,
          payload:false ,
        });
       
  };
}

export function getCategories(): CreateThunkAction {
  return async dispatch => {
    
    PostService.getcategories().then(
      (payload) => {
        if(!payload)
        {
          dispatch({
            type: CATEGORIES_FAIL,
            payload:"error"
          });
      
          return Promise.reject();
        }
        else
        {
        dispatch({
          type: CATEGORIES_SUCCESS,
          payload ,
        });
      
        return Promise.resolve();}
      }
      
    );
  };
}

export function getPosts(afterCreate:boolean): PostsThunkAction {
  return async dispatch => {
    
    PostService.getPosts().then(
      (payload) => {
        if(!payload)
        {
          dispatch({
            type: POSTS_FAIL,
            payload:"error"
          });
      
          return Promise.reject();
        }
        else
        {
        
        dispatch({
          type: POSTS_SUCCESS,
          payload:{posts:payload,afterCreate},
        });
      
        return Promise.resolve();
      }
      }
      
    );
  };
}

export function createPost(postData:postAddObject): CreateThunkAction {
  return async dispatch => {
    
    Promise.resolve( PostService.createPost(postData).then(
      (payload) => {
      
        if(!payload)
        {
          dispatch({
            type: POST_CREATE_FAIL,
          });
      
          return Promise.reject();
        }
        else
        {
          console.log("createPost",payload);
        return Promise.resolve();
      }
      }
      
    )).then(
      () => dispatch(getPosts(true)));
   
  };
}

export function deletePost(id:number): PostsThunkAction {
  return async dispatch => {

    Promise.resolve( PostService.deletePost(id).then(
      (payload) => {
      
        if(!payload)
        {
          dispatch({
            type: POSTS_FAIL,
          });
      
          return Promise.reject();
        }
        else
        {
         
        return Promise.resolve();
      }
      }
      
    )).then(
      () => dispatch(getPosts(true)));
  
  };
}

