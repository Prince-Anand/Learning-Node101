const express = require("express");
const authRouter = express.Router();
// const jwt = require("jsonwebtoken");
const validator = require("validator");
const { validateSignUpData } = require("../helper/validate");
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  console.log(req.body);

  //  const userdata = new User({
  //   firstName: 1234,
  //   lastName: "Anand1",
  //   email: "pk@gmial.com",
  //   password: "1234"
  // })
  try {
    validateSignUpData(req);
    const { firstName, lastName, email, password, age, gender, about, skills } =
      req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    const userdata = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      // photoUrl
    });
    //only 4 field gets added

    await userdata.save();
    res.send("Added one User");
  } catch (err) {
    res.status(400).send("Error in DB saving :" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new Error("Email not valid");
    }
    const user = await User.findOne({ email });
    if (!user) throw new Error("Email not found");

    const isValidPass = await user.validatePassword(password);
    if (isValidPass) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 24 * 3600000),
        httpOnly: true,
      });
      res.send("Login Successfull");
    } else {
      throw new Error("Invalid pass Credetial");
    }
  } catch (err) {
    res.status(400).end("Error: " + err.message);
  }
});

authRouter.post(
  "/logout", (req, res) => {
    // res.clearCookie("token");
    // or i can set cookie with 0 expires time
    res.cookie("token",null,{
      expires : new Date(Date.now())
    })
    res.send("Logged out Successfully");
  }
)


module.exports = authRouter;