import connection from "../config/database.js";

const User = {};

User.GetAll = async () => {
  try {
    const result = await connection.promise().query("Select * from User");
    return result;
  } catch (error) {
    // console.error('Error', error);
    throw error;
  }
};

export default User;
