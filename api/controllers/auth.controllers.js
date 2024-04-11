// import User from "../models/user.model.js";
// import bcryptjs from 'bcryptjs';
// import { errorHandler } from "../utils/error.js";

// export const signup = async (req, res, next) => {
//     const{ username, email, password} = req.body;

//     if( !username || !email || !password || username === '' || email ==='' || password ==='')
//     {
//         next(errorHandler(400, 'All fields are required'));
//         }

//         const hashedPassword = bcryptjs.hashSync(password,10);

//         const newUser = new User({
//             username,
//             email,
//             password: hashedPassword,

//         });

//         try {

//             await newUser.save();
//         res.json('Signup successful');

//         } catch (error) {
//             next(error);

//         }

// };
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

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
