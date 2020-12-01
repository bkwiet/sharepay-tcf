import { ObjectID } from "mongodb";

export type Users = {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  user_idkey: number;
  username: string;
  firstname: string;
  lastname: string;
  rib: string;
  date_last_connect: string;
  date_last_payment: string;
  actif: boolean;
  projects: {
    idkey: number;
    name: string;
  }[];
};

//Hybrid type
export type Sharepay_user = {
  object_id: ObjectID;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  lastname: string;
  phonenum: string;
  actif: boolean;
  projects: {
    idkey: string;
    name: string;
  }[];
};
