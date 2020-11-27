import { getDatabase } from "./database"

export async function findUserById(user_idkey:string): Promise<void> {
  console.log("appel ouverture getDatabase" );
  const mongodb = await getDatabase();
  const user = await mongodb.db().collection("users").findOne({ user_idkey: user_idkey });
  return user;
};

export async function findUserByEmail( email: string): Promise<void> {
  const mongodb = await getDatabase();
  const user = await mongodb.db().collection("users").findOne({email: email});
  return user;
};

export async function newUserIdKey(): Promise<number> {
  const mongodb = await getDatabase();
  const maxIdKey = await mongodb.db().collection("users").find().sort({user_idkey:-1}).limit(1).toArray();

  // calcul du nouveau user_idkey pour creation d'un user dans collection users
  let userIdKey =0;
  if (maxIdKey) {
    userIdKey = maxIdKey[0].user_idkey + 1;
  } else {
    userIdKey = 1;
  }
    
  return userIdKey;
}