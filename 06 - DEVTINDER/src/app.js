const express = require("express");

const User = require("./models/user");
const connectDB = require("./config/database");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);

  const userdata = new User(req.body);
  //  const userdata = new User({
  //   firstName: 1234,
  //   lastName: "Anand1",
  //   email: "pk@gmial.com",
  //   password: "1234"
  // })
  try {
    await userdata.save();
    res.send("Added one User");
  } catch (err) {
    res.status(400).send("Error in DB saving :" + err.message);
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
