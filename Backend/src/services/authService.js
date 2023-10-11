
import User from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwtService from "./jwtService.js";

const AuthService ={}

AuthService.login = async (email, password) => {
    //Get current userinformation
    try {
        const userInfo = await User.getProfile(email);
        if (userInfo && userInfo.length > 0 && userInfo[0][0]) {
            const storedPassword = userInfo[0][0].Password;
            if(AuthService.validatePassword(storedPassword, password)){
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

AuthService.validatePassword = (hashedPassword,password) =>{
    //Passsword handling (We will use bcrypt,add it later)

    if(hashedPassword === password){

        return true;
    }
    return false;
}

export default AuthService;