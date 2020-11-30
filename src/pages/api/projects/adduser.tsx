import { NextApiRequest, NextApiResponse } from "next";
//import { getDatabase } from "../../../utils/database";
import { findIdKeyByEmail, addUserProject } from "../../../utils/users";
//import { Projects } from "../../../types/Projects";

export default async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  // Will need to check if a new user or not ( maybe before the API endpoint call)
  let rejet=1; // si 1 on va sur la page des erreurs d'ajout user
  
  console.log("Request : ", request.body);

  if (request.body) {
    // recup des datas du formulaire
    rejet=0;
    const add_user_email = request.body.email;
    const admin_email = request.body.user_email;
    const project_idkey = request.body.project_idkey;
    let add_user_idkey=0;
    let add_user_project=0;

    // rejet l'administrateur ne peut pas s'ajouter dan sle projet
    // il est déja ajouter automatiquement à la creation du projet
    if (add_user_email === admin_email) rejet=1;

    // controle existence user dans DB (par son email) pour recuperer son idkey
    if ( rejet === 0) {
      add_user_idkey = await findIdKeyByEmail(add_user_email);
      if (add_user_idkey === 0) {
        rejet=1;
      }
    }

    // ajout du user dans le projet + controle doublon user dans projet
    if ( rejet === 0 ) {
      add_user_project = await addUserProject(add_user_idkey, project_idkey);
      if ( add_user_project === 0) rejet=1;
    }
  } 

  // redirect page projects ou erreur
  if ( rejet === 0 ) {
    response.redirect("/projects");
  } else {
      response.redirect("/projects/adduser/reject");
  }
};
