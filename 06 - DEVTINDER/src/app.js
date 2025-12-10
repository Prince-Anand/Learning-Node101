const express = require("express");
const { validateSignUpData } = require("./helper/validate");
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("./models/user");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  console.log(req.body);

  //  const userdata = new User({
  //   firstName: 1234,
  //   lastName: "Anand1",
  //   email: "pk@gmial.com",
  //   password: "1234"
  // })
  try {
    validateSignUpData(req);
    const { firstName, lastName, email, password } = req.body;

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

// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!validator.isEmail(email)) {
//       throw new Error("Email not valid");
//       // but never reveal that email exist or not, keep it general error ,-> same for other api too
//     }
//     const user = await User.findOne({ email });
//     if (!user) throw new Error("Email not found");

//     // console.log(user.password);
//     const isValidPass = await user.validatePassword(password);
//     if (isValidPass) {
//       //create jwt token

//       // const token = await jwt.sign(
//       //   { _id: user._id },
//       //   "#Secret@Key1ForDevTinder",
//       //   {expiresIn : "7d"}
//       // );
//       const token = await user.getJWT();

//       // add it to cookie and send response to use

//       res.cookie("token", token, {
//         expires: new Date(Date.now() + 7 * 24 * 3600000),
//         httpOnly: true,
//       });
//       // console.log(cookie)

//       // req.cookies;

//       res.send("Login Successfull");
//     } else {
//       throw new Error("Invalid pass Credetial");
//     }
//   } catch (err) {
//     res.status(400).end("Error: " + err.message);
//   }
// });

app.get("/profile", userAuth, async (req, res) => {
  try {
    // **done in middleware**
    // const cookies = req.cookies;
    // const {token} = req.cookies;
    // if (!token){
    //   throw new Error("Invalid token");
    // }

    // const decoded = await jwt.verify(token,"#Secret@Key1ForDevTinder");
    // if (!decoded){
    //   throw new Error("Please Login Again");

    // }
    // const {_id} = decoded;
    // console.log(_id);
    // const user = await User.findById(_id);
    // if (!user){

    //   throw new Error("Please Login Again");
    // }
    // console.log(token);
    const user = req.user; // from middleware
    console.log("Logged User is " + user.firstName);
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong : " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const emailId = req.body.email;
  try {
    const user = await User.find({ email: emailId });
    if (user.length === 0) res.status(404).send("User not found");
    else res.send(user);
  } catch (err) {
    res.send(400).send("Something went wrong");
  }
});

// app.get("/one", async (req, res) => {

//   try {
//     const user = await User.findOne({email: req.body.email});
//     res.send(user);
//   } catch (err) {
//     res.send(400).send("Something went wrong");
//   }
// });

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.send(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.uid;

  try {
    await User.findByIdAndDelete(userId);
    res.send("Deleted User");
  } catch (err) {
    res.send(400).send("Something went wrong");
  }
});

app.patch("/user/:uid", async (req, res) => {
  const userId = req.params?.uid;

  try {
    const data = req.body;
    const ALLOWED_UPDATES = [
      "photoUrl",
      "about",
      "gender",
      "skills",
      "firstName",
      "lastName",
      "age",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) => {
      return ALLOWED_UPDATES.includes(k);
    });
    if (!isUpdateAllowed) {
      throw new Error("Not allowed to update these fields");
    }
    await User.findByIdAndUpdate(userId, req.body, {
      returnDocument: "before",
      runValidators: true,
      // runs validator explicitly for patch req
    });
    res.send("Updated User");
  } catch (err) {
    res.status(400).send("Something went wrong : " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("DB Connection established...");
    app.listen(3000, () => {
      console.log("Listening to port request on Port 3000");
    });
  })
  .catch((err) => {
    console.log("Error!!");
  });
