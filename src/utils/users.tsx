import { getDatabase } from "./database";
import { Users } from "../types/Users";
import { Projects } from "../types/Projects";

export async function newUserIdKey(): Promise<number> {
  const mongodb = await getDatabase();
  const maxIdKey = await mongodb.db().collection("users").find().sort({ user_idkey: -1 }).limit(1).toArray();

  // calcul du nouveau user_idkey pour creation d'un user dans collection users
  let userIdKey = 0;
  //Fix when you insert a First user in a new database

  if (maxIdKey[0].user_idkey) {
    userIdKey = maxIdKey[0].user_idkey + 1;
  } else {
    userIdKey = 1;
  }
  return userIdKey;
}

export async function findUserById(user_idkey: string): Promise<Users> {
  console.log("appel ouverture getDatabase");
  const mongodb = await getDatabase();
  const user = await mongodb.db().collection("users").findOne({ user_idkey: user_idkey });
  return user;
}

export async function findUserByEmail(email: string): Promise<Users> {
  const mongodb = await getDatabase();
  const user = await mongodb.db().collection("users").findOne({ email: email });
  return user;
}

export async function findUserProjects(user_idkey: string): Promise<Projects[]> {
  const mongodb = await getDatabase();
  const projects = await mongodb.db().collection("projects").find({ admin_idkey: user_idkey }).toArray();
  return projects;
}
