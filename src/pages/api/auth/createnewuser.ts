import { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../utils/database";
import { newUserIdKey } from "../../../utils/users";
import { firstUpper } from "../../../utils/functions";

type User = {
  username: string;
  firstname: string;
  lastname: string;
  phonenum: string;
  user_idkey: Number;
  actif: boolean;
  rib: string;
  date_last_connect: string;
  date_last_payment: string;
  projects: {
    idkey: string;
    name: string;
  }[];
};

export default async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  // Will need to check if a new user or not ( maybe before the API endpoint call)
  const mongodb = await getDatabase();
  console.log("Request : ", request.body);

  if (request.body) {
    const user_email = request.body.user_email;

    const user_idkey = await newUserIdKey();

    const user: User = {
      username: request.body.user_username.toUpperCase(),
      firstname: firstUpper(request.body.user_firstname),
      lastname: firstUpper(request.body.user_lastname),
      phonenum: request.body.user_phonenum,
      user_idkey: user_idkey,
      actif: true,
      rib: "",
      date_last_connect: "",
      date_last_payment: "",
      projects: [],
    };

    // mongodb.db().collection("users").findOne({ email: user_email });
    await mongodb
      .db()
      .collection("users")
      .updateOne({ email: user_email }, { $set: { ...user } })
      .then((result) => console.log("DB ========= ", result))
      .catch((error) => console.log(error))
      .finally(() => response.redirect("/"));
  } else {
    response.redirect("/auth/signin");
  }
};
