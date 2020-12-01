import { NextApiRequest, NextApiResponse } from "next";
import { findIdKeyByEmail, addUserProject } from "../../../utils/users";

export default async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  // Will need to check if a new user or not ( maybe before the API endpoint call)
  let rejet=1; // si 1 on va sur la page des erreurs d'ajout user
  
  console.log("Request : ", request.body);

  if (request.body) {
    // recup des datas du formulaire
    rejet=0;
    const add_user_email = request.body.email;
    const param1 = request.body.param1; // n° du projet a affecter
    const param2 = request.body.param2; // nom du projet
    const param3 = request.body.param3; // email de l'administrateur du projet
    let add_user_idkey=0;
    let add_user_project=0;

    // rejet l'administrateur ne peut pas s'ajouter dan sle projet
    // il est déja ajouter automatiquement à la creation du projet
    if (add_user_email === param3) rejet=1;

    // controle existence user dans DB (par son email) pour recuperer son idkey
    if ( rejet === 0) {
      add_user_idkey = await findIdKeyByEmail(add_user_email);
      if (add_user_idkey === 0) {
        rejet=1;
      }
    }

    // ajout du user dans le projet + controle doublon user dans projet
    if ( rejet === 0 ) {
      add_user_project = await addUserProject(add_user_idkey, param1, param2);
      if ( add_user_project != 0) rejet=1;
    }
  } 

  // redirect page projects ou erreur
  if ( rejet === 0 ) {
    response.redirect("/projects");
  } else {
      response.redirect("/projects/adduser/reject");
  }
};
