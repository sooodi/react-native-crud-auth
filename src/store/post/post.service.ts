import axios from "axios";
import { postAddObject } from "./post.types";
import {  request } from "../../hook/useAxios";
import store from "../store";
import { Base_URL } from "../../utils/functionHandler";


const POST_URL = Base_URL+"api/";

const getPosts = async() => {
  try {
    const response = await request.get( POST_URL+ "post/crud/") 
  //  console.log("you have mistake , for example count is 10 but max values is // 5 ", response.count,response?.results.length);
    return response?.results;
 } catch (error) {
    console.log("error", error);
    return null;
  }
 
};

const createPost = async(postData:postAddObject) => {
  
  let uriArray = postData.image.split(".");
  let fileType = uriArray[uriArray.length - 1];
  
  
   var formData: any = new FormData();
      const imageObj = {
        uri: postData.image,
        name: `34567.${fileType}`,
        type: `image/${fileType}`,
      };
      formData.append("title", postData.title);
      formData.append("description", postData.description);
      formData.append("category", 2);
      formData.append("image",imageObj );
 
      const token = store.getState().auth?.userInfo?.token?.access;
   
    
      try {
       let  response=await fetch(POST_URL + "post/crud/", {
          method: "POST",
          headers: {
           
            "Content-Type": "multipart/form-data ",
            Authorization: token ? `JWT ${token}` : "",
          },
    
          credentials: "include",
          body: formData,
        })
      
        // console.log( "createPost xxx", JSON.stringify(response));
        return Promise.resolve("ok");
      } catch (error) {
        console.log("error",error);
        return null;
      }
  
};

const deletePost = async(id:number) => {
      
  try {
    const response = await request.delete(POST_URL + `post/crud/${id}/`);
    return Promise.resolve("ok");
  } catch (error) {
    console.log("error",error);
    Promise.resolve();
  
  }
  
 // localStorage.removeItem("user");
};
const getcategories = async() => {
 
  try {
    const response = await request.get( POST_URL+ "category/") 
    return response;
 } catch (error) {
    console.log("error", error);
    return null;
  }
 
};
const detailPost = async(postId:number) => {
      
  try {
    const response =axios.get(POST_URL +  `post/crud/${postId}`,)
    
    return response;
  } catch (error) {
    console.log("error",error);
    return null;
  }
};
export default {
  getPosts,
  getcategories,
  deletePost,
  createPost,
  detailPost
};