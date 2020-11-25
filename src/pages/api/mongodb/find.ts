// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { findOneProject } from "../../../utils/Projects";
import { findOneUser } from "../../../utils/Users";

findOneUser();
findOneProject();

export default (req, res) => {
  res.statusCode = 200;
  res.json({ name: "John Doe" });
};
