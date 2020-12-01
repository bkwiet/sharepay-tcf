import { getDatabase } from "./database";
import { Users } from "../types/users.d";
import { Projects } from "../types/projects.d";
import { addProjectUser } from "./projects";

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

export async function findIdKeyByEmail(email: string): Promise<number> {
  const mongodb = await getDatabase();
  const user = await mongodb.db().collection("users").findOne({ email: email });
  let user_idkey;
  if (user) {
    user_idkey = user.user_idkey;
  }
  else {
    user_idkey=0;
  }
  return user_idkey;
}

export async function addUserProject(user_idkey: number, project_idkey: number, project_name: string ): Promise<number> {
  console.log(user_idkey);
  console.log(project_idkey);
  console.log(project_name);
  let ret_OK=0; // return 0 si insertion project OK sinon autre valeur
  
  const mongodb = await getDatabase();
  const data = await mongodb.db().collection("users").findOne({ user_idkey: user_idkey });
  
  const user: Users = {
    name: data.name,
    email: data.email,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    user_idkey: data.user_idkey,
    username: data.username,
    firstname: data.firstname,
    lastname: data.lastname,
    rib: data.rib,
    date_last_connect: data.date_last_connect,
    date_last_payment: data.date_last_payment,
    actif: data.actif,
    projects: data.projects,
  };

  // recherche si le projet n'est pas déjà affecté à l'utilisateur
  user.projects.map((projet) => {
    if ( projet.idkey === project_idkey ) ret_OK=1;
  })
  
  // ajout du projet dans la liste des projets/User & maj du user dans la collection "users"
  if ( ret_OK === 0 ) {
    user.projects.push({ idkey: project_idkey, name: project_name });

    await mongodb
      .db()
      .collection("users")
      .updateOne({ user_idkey: user.user_idkey }, { $set: { ...user } })
      .catch( (error) => { console.log(error); ret_OK=1 } )
  }

  // ajout du user dans le projet 
  if (ret_OK === 0 ) {
    ret_OK = await addProjectUser(project_idkey, user.user_idkey, user.firstname, user.lastname);
  }
  // envoie le code retour 
  return ret_OK;
}

export async function findUserProjects(user_idkey: string): Promise<Projects[]> {
  const mongodb = await getDatabase();
  const projects = await mongodb.db().collection("projects").find({ admin_idkey: user_idkey }).toArray();
  return projects;
}
