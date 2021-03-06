import { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../utils/database";
import { newProjectIdKey } from "../../../utils/projects";
import { findUserByEmail } from "../../../utils/users";
import { convertDate, firstUpper } from "../../../utils/functions";
import { Users } from "../../../types/users.d";
import { Projects } from "../../../types/projects.d";

export default async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  // Will need to check if a new user or not ( maybe before the API endpoint call)
  const mongodb = await getDatabase();
  console.log("Request CREATEPROJECT: ", request.body);

  if (request.body) {
    // recherche du nouveau projectIdKey
    const newidkey = await newProjectIdKey();

    // recherche du user_IdKey qui cree le project- recherche sur email
    // param1  provient du champ hidden du formulaire projects/create/index
    const data = await findUserByEmail(request.body.param1);

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

    // chargement des infos dans la structure project
    const project: Projects = {
      name: request.body.name.toUpperCase(),
      summary: firstUpper(request.body.summary),
      idkey: newidkey,
      actif: true,
      amount: request.body.amount,
      admin_idkey: user.user_idkey,
      date_opened: convertDate(new Date()),
      date_ended: "",
      users: [
        {
          user_idkey: user.user_idkey,
          firstname: user.firstname,
          lastname: user.lastname,
        },
      ],
      payments: [],
    };

    // ecriture du record dans collection "projects"
    await mongodb
      .db()
      .collection("projects")
      .insertOne({
        name: project.name,
        summary: project.summary,
        idkey: project.idkey,
        actif: project.actif,
        amount: project.amount,
        admin_idkey: project.admin_idkey,
        date_opened: project.date_opened,
        date_ended: project.date_ended,
        users: project.users,
        payments: project.payments,
      })
      .then((result) => console.log("DB ========= ", result))
      .catch((error) => console.log(error));

    // ajout du projet dans la liste des projets du user (le createur du projet et l'administrateur)
    user.projects.push({ idkey: project.idkey, name: project.name });
    console.log(user);

    await mongodb
      .db()
      .collection("users")
      .updateOne({ user_idkey: user.user_idkey }, { $set: { ...user } })
      .catch((error) => console.log(error))
      .finally(() => response.redirect("/projects"));
  } else {
    response.redirect("/auth/signin");
  }
};
