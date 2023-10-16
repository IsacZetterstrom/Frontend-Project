import connection from "../config/database.js";

//Get userprofile (promise wrapper på mysql connection)
async function getProfile(email) {
  const [rows] = await connection.execute(
    "SELECT * FROM User WHERE Email = ?",
    [email]
  );
  return rows;
}

/**
 * @Author Isac Zetterström
 * @Description model for editing userinfo
 */
async function editUser(userid, email, firstname, lastname, phone) {
  const [rows] = await connection.execute(
    `UPDATE User SET
      Email = IFNULL(?, email),
      Firstname = IFNULL(?, firstName),
      Lastname = IFNULL(?, lastname),
      Phone = IFNULL(?, phone)
      WHERE User_id = ?`,
    [email, firstname, lastname, phone, userid]
  );
  return rows;
}

export default { editUser, getProfile };
