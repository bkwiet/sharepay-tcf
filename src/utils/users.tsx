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
  console.log(user);
  return user;
};

export async function newUserIdKey(): Promise<Number> {
  const mongodb = await getDatabase();
  const maxIdKey = await mongodb.db().collection("users").find().sort({user_idkey:-1}).limit(1).toArray();

  // return la nouvelle valeur user_idkey
  let userIdKey =0;
  if (maxIdKey) {
    userIdKey = maxIdKey[0].user_idkey + 1;
  } else {
    userIdKey = 1;
  }
    
  return userIdKey;
}