import connection from "../config/database.js";

// const User = {};

// User.GetAll = async () => {
//   try {
//     const result = await connection.promise().query("Select * from User");
//     return result;
//   } catch (error) {
//     // console.error('Error', error);
//     throw error;
//   }
// };

async function editUser(userid, email, firstname, lastname, phone) {
  const sql = `UPDATE User SET
    Email = IFNULL(?, email),
    Firstname = IFNULL(?, firstName),
    Lastname = IFNULL(?, lastname),
    Phone = IFNULL(?, phone)
    WHERE User_id = ?`;

  const result = await connection
    .promise()
    .query(sql, [email, firstname, lastname, phone, userid]);
  return result;
}

export default { editUser };
