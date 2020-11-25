
import { getDatabase } from "./database"

export async function findProjectById(idkey:string): Promise<void> {
  console.log("appel ouverture getDatabase" );
  console.log("valeur de idkey",idkey);
  const mongodb = await getDatabase();
  const project = await mongodb.db().collection("projects").findOne({idkey: idkey});
  return project;
};