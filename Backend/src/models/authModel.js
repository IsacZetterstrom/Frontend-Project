import connection from "../config/database.js";

async function registerUser(email, pass) {

  try{
    const [rows, fields] =  await connection.execute(
    'INSERT INTO User (Email, Password) VALUES (?, ?)',
    [email,pass]);
    return [rows]
    }
    catch(error){
    throw error;
  }
}

export default { registerUser };
