import connection from "../config/database.js";

/**
 * @Author Isac Zetterström
 * @Description model for registering a user
 */

async function registerUser(email, pass) {
  const [rows] = await connection.execute(
    "INSERT INTO User (Email, Password) VALUES (?, ?)",
    [email, pass]
  );
  return rows;
}

export default { registerUser };
