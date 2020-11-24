import { getDatabase } from "./database"

export async function findOneUser(): Promise<void> {
  console.log("appel ouverture getDatabase" );
  const mongodb = await getDatabase();
  const requete = await mongodb.db().collection("Users").findOne({user_idkey: "00000001"});
  console.log(requete);
};