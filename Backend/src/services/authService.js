import e, { json } from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt"


const AuthService ={}

AuthService.login = async (email, password) => {
    //Get current userinformation
    try {
        const userInfo = await User.getProfile(email);
        if (userInfo && userInfo.length > 0 && userInfo[0][0]) {
            const storedPassword = userInfo[0][0].Password;
            if(AuthService.validatePassword(storedPassword, password)){
                delete userInfo[0][0].Password 
                //Add jwt token to userinfo here

                return userInfo;
            }
      } 
    }
      catch (error) {
        throw error
      }

      
}

AuthService.validatePassword = (password1,password2) =>{
    //Passsword handling (We will use bcrypt,add it later)
    console.log(password1,password2)
    if(password1 === password2){

        return true;
    }
    return false;


}

export default AuthService;