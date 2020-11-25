
import { getDatabase } from "./database"

export async function findOneProject(): Promise<void> {
  console.log("appel ouverture getDatabase" );
  const mongodb = await getDatabase();
  const requete = await mongodb.db().collection("projects").findOne({idkey: "00000001"});
  console.log(requete);
};