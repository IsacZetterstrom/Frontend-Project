import connection from "../config/database.js";

async function registerUser(email, pass) {
  const sql = `INSERT INTO User (Email, Password)
    Values (?,?)`;

  const result = await connection.promise().query(sql, [email, pass]);
  return result;
}

export default { registerUser };
