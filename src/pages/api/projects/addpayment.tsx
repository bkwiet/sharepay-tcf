import { NextApiRequest, NextApiResponse } from "next";
import { findIdKeyByEmail } from "../../../utils/users";
import { addProjectPayment } from "../../../utils/projects";

export default async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  // Will need to check if a new user or not ( maybe before the API endpoint call)
  let ret_OK = 1; // si 1 on va sur la page des erreurs d'ajout user

  console.log("Request : ", request.query);

  if (request.query) {
    // recup des datas du formulaire
    ret_OK = 0;
    const amount: number = parseInt(String(request.query.amount));
    const summary: string = String(request.query.summary);
    const idkey: number = parseInt(String(request.query.idkey)); // n° du projet a affecter
    const user_email: string = String(request.query.email); // email du user qui paie
    let user_idkey = 0;

    console.log(amount);
    console.log(idkey);
    console.log(user_email);
    console.log(summary);

    if (amount != 0) {
      // recherche dun idkey du user qui paie
      user_idkey = await findIdKeyByEmail(user_email);
      if (user_idkey === 0) {
        ret_OK = 1;
      }

      // ajout du paiement dans le projet
      ret_OK = await addProjectPayment(idkey, user_idkey, summary, amount);
    }
  }

  // redirect page projects ou erreur
  if (ret_OK === 0) {
    response.redirect("/projects");
  } else {
    response.redirect("/projects/addpayment/reject");
  }
};
