import { getDatabase } from "./database";

export async function findProjectById(idkey: Number): Promise<void> {
  console.log("appel ouverture getDatabase");
  console.log("valeur de idkey", idkey);
  const mongodb = await getDatabase();
  const project = await mongodb.db().collection("projects").findOne({ idkey: idkey });
  return project;
}

export async function newProjectIdKey(): Promise<number> {
  const mongodb = await getDatabase();
  const maxIdKey = await mongodb.db().collection("projects").find().sort({ idkey: -1 }).limit(1).toArray();

  // return la nouvelle valeur user_idkey
  let IdKey = 0;
  if (maxIdKey.length !== 0) {
    IdKey = maxIdKey[0].idkey + 1;
  } else {
    IdKey = 1;
  }

  return IdKey;
}
