import connection from "../config/database.js";



//Get userprofile (promise wrapper på mysql connection)
 async function getProfile  (Email)  {
  try{
    const [rows, fields] =  await connection.execute(
    'SELECT * FROM User WHERE Email = ?',
    [Email]);
    return [rows]
    }catch(error){
    throw error;
  }
};


async function editUser(userid, email, firstname, lastname, phone) {
  try{
    const [rows, fields] =  await connection.execute(
      `UPDATE User SET
      Email = IFNULL(?, email),
      Firstname = IFNULL(?, firstName),
      Lastname = IFNULL(?, lastname),
      Phone = IFNULL(?, phone)
      WHERE User_id = ?`,
      [email,firstname,lastname,phone,userid]);
    return [rows]
    }catch(error){
    throw error;
  }
}


export default { editUser,getProfile };
