import connection from "../config/database.js";

const User = {};
//Get userprofile ( including password to use)
User.getProfile = async (Email) => {
  try {
    const [result] = await connection.promise().query('CALL User(?,?,?,?,?,?,?)', ["Select",Email, null,null,null,null,null]);
    return result;
  } catch (error) {
    throw error;
  }
};

export default User;
