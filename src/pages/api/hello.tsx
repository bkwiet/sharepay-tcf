import { findOneProject } from "../../utils/projects";
import { findOneUser} from "../../utils/users"

console.log("PAGE HELLO");
findOneUser();
findOneProject();

export default (req, res) => {
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
