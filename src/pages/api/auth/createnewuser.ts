import { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../utils/database";
type User = {
  username: string;
  lastname: string;
  phonenum: string;
  actif: boolean;
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

    const user: User = {
      username: request.body.user_firstname,
      lastname: request.body.user_lastname,
      phonenum: request.body.user_phonenum,
      actif: true,
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
