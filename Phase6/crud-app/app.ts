import {startConnecton} from "./db.js"
import { showMenu } from "./menu.js";
import { showUsers, registerUser, updateUser, deleteUser } from "./user.js";

const main = async () => {
  const connection = await startConnecton();
  while (true) {
    let selectedMenu: string = showMenu();
    if (selectedMenu === "1") {
      await showUsers(connection);
    } else if (selectedMenu === "2") {
      await registerUser(connection)
    } else if (selectedMenu === "3") {
      await updateUser(connection);
    } else if (selectedMenu === "4") {
      await deleteUser(connection);
    } else if (selectedMenu === "5") {
      await connection.end();
      break;
    }
  }
}

(async () => {
  await main();
})();
