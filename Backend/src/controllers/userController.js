import User from "../models/userModel.js";
import userModel from "../models/userModel.js";

const GetAll = async (req, res) => {
  try {
    const users = await User.GetAll();
    console.log(users[0]);
    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function editUser(req, res) {
  const { userid, email, firstname, lastname, phone } = req.body;
  try {
    const result = await userModel.editUser(
      userid,
      email,
      firstname,
      lastname,
      phone
    );
    res.status(200).send({ message: "Information edited!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "A problem when editing users credentials occured" });
  }
}

export default { GetAll, editUser };
