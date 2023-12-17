import { Item } from "../../components/DropdownModal";

export interface postAddObject {
 
  title: string;
  description: string;
  category: number;
  image: string;
   
}
export interface postObject {
  id: number;
  title: string;
  description: string;
  category: categoryObj;
  image: string;
  author: authorObj;
          
}
export interface authorObj{
  id: number,
  full_name:string;
}
export interface categoryObj {
  id:number;
  name:  string;
  slug: string;
}

export interface postApiObj {
  categories:categoryObj[];
  posts:postObject[],
  postCreated:boolean
}
export interface categoryDropdownObj 
{ key:string, value: string }