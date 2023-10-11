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

export default { editUser,getProfile };
