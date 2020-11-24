// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { findOneProject } from "../../src/utils/Projects";
import { findOneUser} from "../../src/utils/Users"

console.log("PAGE HELLO");
findOneUser();
findOneProject();

export default (req, res) => {
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
