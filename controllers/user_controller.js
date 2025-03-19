import { User } from "../models/user_model.js";
import { userValidator } from "../validators/validator.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { error, value } = userValidator.validate(req.body);
  if (error) {
   return res.status(422).json({ message: error.details[0].message });
  }

  const existingUser = await User.findOne({ email: value.email });
  if (existingUser) {
   return res.status(409).json({ message: "User already registered" });
  } else {
    const hashedPassword = await bcrypt.hash(value.password, 12);
    const newUser = await User.create({
      userName: value.userName,
      email: value.email,
      password: hashedPassword,
    });
   return res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  }
};
