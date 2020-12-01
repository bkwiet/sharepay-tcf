import { getDatabase } from "./database";
import { Projects } from "../types/projects";
import { convertDate } from "../utils/functions";

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


export async function findProjectById(idkey: number): Promise<Projects> {
  const mongodb = await getDatabase();
  const project = await mongodb.db().collection("projects").findOne({ idkey: idkey });
  return project;
}


export async function addProjectUser( idkey:Number, user_idkey:number, user_firstname:string, user_lastname:string ): Promise<number> {

  let ret_OK=0; // return 0 si insertion project OK sinon autre valeur
  const mongodb = await getDatabase();
  const data = await mongodb.db().collection("projects").findOne({ idkey: Number(idkey) });
  if (data) {
    const project: Projects = {
      name: data.name,
      summary: data.summary,
      idkey: data.idkey,
      actif: data.actif,
      amount: data.amount,
      admin_idkey: data.admin_idkey,
      date_opened: data.date_opened,
      date_ended: data.date_ended,
      users: data.users,
      payments: data.payments,
    };

    // ajout du user dans la liste des users du porojet
    project.users.push( { user_idkey: user_idkey, firstname: user_firstname, lastname: user_lastname } )

    await mongodb
      .db()
      .collection("projects")
      .updateOne({ idkey: project.idkey }, { $set: { ...project } })
      .catch( (error) => { console.log(error); ret_OK=1 } )

  } else {
    console.log("data prospect not retrieved");
    ret_OK=1;
  }

  return ret_OK;
}


export async function addProjectPayment( idkey:Number, user_idkey:number, summary:string, amount:number ): Promise<number> {

  let ret_OK=0; // return 0 si insertion project OK sinon autre valeur
  const mongodb = await getDatabase();
  const data = await mongodb.db().collection("projects").findOne({ idkey: Number(idkey) });
  if (data) {
    const project: Projects = {
      name: data.name,
      summary: data.summary,
      idkey: data.idkey,
      actif: data.actif,
      amount: data.amount,
      admin_idkey: data.admin_idkey,
      date_opened: data.date_opened,
      date_ended: data.date_ended,
      users: data.users,
      payments: data.payments,
    };

    // ajout du user dans la liste des users du porojet
    let datepayment=convertDate(new Date());
    console.log(datepayment);
        project.payments.push( { user_idkey: user_idkey, date_payment: datepayment, summary: summary, amount:amount  } )

    await mongodb
      .db()
      .collection("projects")
      .updateOne({ idkey: project.idkey }, { $set: { ...project } })
      .catch( (error) => { console.log(error); ret_OK=1 } )

  } else {
    console.log("data prospect not retrieved");
    ret_OK=1;
  }

  return ret_OK;
}
