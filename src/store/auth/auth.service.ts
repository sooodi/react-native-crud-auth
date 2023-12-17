import axios from "axios";
import { regiserUserObject } from "./user.types";
import { manipulateAsync } from "expo-image-manipulator";
import { Base_URL } from "../../utils/functionHandler";



const AUTH_URL =Base_URL+ "api/user/";
const headers = {
  'Content-Type': 'application/json; charset=UTF-8',
 
}
const register =async (userData:regiserUserObject) => {
 


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
   
      try {
        let  response=await fetch(Base_URL+"api/user/sign-up/", {
           method: "POST",
           headers: {
            
             "Content-Type": "multipart/form-data ",
            
           },
     
           credentials: "include",
           body: formData,
         })
       
      
         return Promise.resolve("ok");
       } catch (error) {
         console.log("error",error);
         return null;
       }

};

const login = async(email:string, password:string) => {
  
  const userData = {
    email: email,
    password: password
  };
  console.log("userData",userData,AUTH_URL);
  try {
    const response = await axios.post(AUTH_URL + "sign-in/", userData, {
      headers: headers
    });
   
    return Promise.resolve(response?.data);
  } catch (error) {
  
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