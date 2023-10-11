import connection from "../config/database.js";


//Get userprofile ( including password to use)
async function getProfile  (Email)  {
  try {
    const [result] = await connection.promise().query('CALL User(?,?,?,?,?,?,?)', ["Select",Email, null,null,null,null,null]);
    return result;
  } catch (error) {
    throw error;
  }
};

export default {getProfile};
