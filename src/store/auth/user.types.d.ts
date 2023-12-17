import { Item } from "../../components/DropdownModal";

export interface userObject {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_active: string;
  image?: string;
   
}
export interface tokenObj {
  refresh: string;
  access: string;
}

export interface apiObj {
  user: userObject;
  token:tokenObj;
}
export interface loginObj {
  userInfo: apiObj;
  isLoggedIn:boolean;
  error:boolean;
}
interface loginAcction {
  type: IActions['GET_ALL_ASSETS'];
  assets: string;
  loading: boolean;
}

export interface regiserUserObject {
 
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  image: string;
   
}