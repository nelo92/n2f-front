import { firestore } from "firebase";

export enum Network {  
  Local ='Local',
  Google = 'Google',
  Facebook = 'Facebook',
  Twitter = 'Twitter',
  Microsoft = 'Microsoft',
  Github = 'Github'
}

export interface User {
  uid: string;
  email: string;
  pwd: string;
  network: Network;
}

export interface Data {
  user_uid: string;
  date: firestore.Timestamp;
  amount: string;
}
export interface DataId extends Data {
  id: string;
}
