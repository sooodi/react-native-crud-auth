import axios from "axios";
import { regiserUserObject } from "./user.types";
import { manipulateAsync } from "expo-image-manipulator";
import store from "../store";

const AUTH_URL = "https://rn-api.codebnb.me/api/user/";
const headers = {
  'Content-Type': 'application/json; charset=UTF-8',
 
}
const register =async (userData:regiserUserObject) => {
 

  console.log("register",userData);
  let resizedImage = userData.image;

  // const manipulateResult = await manipulateAsync(
  //   userData.image,
  //   [],
  //   { compress: 0.2 } // from 0 to 1 "1 for best quality"
  // );
  // resizedImage = manipulateResult.uri;

  let uriArray = resizedImage.split(".");
  let fileType = uriArray[uriArray.length - 1];

  var formData: any = new FormData();
  const dataImage = {
    uri: resizedImage,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  };
  
      formData.append("first_name", userData.first_name);
      formData.append("last_name", userData.last_name);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("image",dataImage );
     
      console.log("dataImage",dataImage);
      try {
        let  response=await fetch("https://rn-api.codebnb.me/api/user/sign-up/", {
           method: "POST",
           headers: {
            
             "Content-Type": "multipart/form-data ",
            
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
//        fetch("https://rn-api.codebnb.me/api/user/sign-up/", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "multipart/form-data ",
//         },

//         credentials: "include",
//         body: formData,
    
// })
//          .then((response) => response.json())
//         .then((responseJson) => {
        
//           console.log("responseJson....",responseJson);
         
//         })
//         .catch((error) => {
        
//           console.error(error);
//         });
 
};

const login = async(email:string, password:string) => {
  
  const userData = {
    email: email,
    password: password
  };
  console.log("userData",userData);
  try {
    const response = await axios.post(AUTH_URL + "sign-in/", userData, {
      headers: headers
    });
    console.log("login__",response?.data);
    return Promise.resolve(response?.data);
  } catch (error) {
    console.log("error",error);
    return Promise.resolve();
  }

};

const logout = async(refresh_token:string) => {
      
  const userData = {
    refresh_token: refresh_token
    
  };
  try {
    const response = await axios.post(AUTH_URL + "logout/", userData, {
      headers: headers
    });
    
    return response;
  } catch (error) {
    console.log("error",error);
    return null;
  }
};

export default {
  register,
  login,
  logout,
};