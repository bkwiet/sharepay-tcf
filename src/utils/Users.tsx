import { getDatabase } from "./database"

export async function findUserById(user_idkey:string): Promise<void> {
  console.log("appel ouverture getDatabase" );
  const mongodb = await getDatabase();
  const user = await mongodb.db().collection("users").findOne({ user_idkey: user_idkey });
  return user;
};

export async function findUserByEmail( email: string): Promise<void> {
  console.log("appel ouverture getDatabase" );
  const mongodb = await getDatabase();
  const user = await mongodb.db().collection("users").findOne({email: email});
  return user;
};