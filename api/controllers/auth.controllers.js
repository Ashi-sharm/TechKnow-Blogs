import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
//   console.log(req.body);
  const { username, email, password } = await req.body;
  console.log("username", username);
  console.log("email", email);
  console.log("password", password);
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  } else {
    try {
      // Hash the password
      const salt = bcryptjs.genSaltSync(10); // Generate a salt
      const hashedPassword = bcryptjs.hashSync(password, salt); // Hash the password using the generated salt

     
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

     
      await newUser.save();

      res.json("Signup successful");
    } catch (error) {
      next(error);
    }
  }
};

export const signin = async (req, res, next) =>{
  const {email, password} = req.body;

  if (!email || !password || !email ==='' || password ==='') {
     next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({email});
    if(!validUser) {
     return next(errorHandler(404, 'User not found'));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if(!validPassword){
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign(
      {id:validUser._id},'Ashi1821'
    );
      const {password: pass, ...rest} = validUser._doc;
      res.status(200).cookie('access_token', token,{
        httpOnly :true} ).json(rest);

  }catch(error){
    next(error);
  }


};

export const google = async (req, res, next) => {
  const {email, name, googlePhotoUrl} = req.body;
  try {
    const user = await User.findOne({email});
    if(user){
      const token = jwt.sign({id: user._id}, "AIzaSyATJO1juo45uI3b0cRKB0SdA3BfbcsJyyQ");
      const {password, ...rest} = user._doc;
      res.status(200).cookie('access_token', token,{
        httpOnly: true,
      }).json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:name.toLowerCase().split('').join('') +Math.random().toString(9).slice(-4),
          email,
          password: hashedPassword,
          profilePicture: googlePhotoUrl,

        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id}, "AIzaSyATJO1juo45uI3b0cRKB0SdA3BfbcsJyyQ");
        const {password, ...rest} = newUser._doc;
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          } )
          .json(rest);

    }

    
  } catch (error) {
    next(error)
    
  }
};
