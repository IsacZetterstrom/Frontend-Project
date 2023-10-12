
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwtService from "./jwtService.js";


async function login  (email, password) {
    //Get current userinformation
    try {
        const userInfo = await userModel.getProfile(email);
        if (userInfo && userInfo.length > 0 && userInfo[0][0]) {
            const storedPassword = userInfo[0][0].Password;
            if(await validatePassword(storedPassword, password)){
                delete userInfo[0][0].Password
                delete userInfo[0][0].User_id 
                //Add jwt token to userinfo here
                const token = jwtService.generateToken(userInfo[0][0].Email)
                return token;
            }
      } 
    }
      catch (error) {
        throw error
      }

      
}

async function validatePassword  (hashedPassword,password) {
    //Passsword handling (We will use bcrypt,add it later)
    const isMatch = await bcrypt.compare(password,hashedPassword);
    if(isMatch){
        return true;
    }
    return false;
}

export default {login, validatePassword};