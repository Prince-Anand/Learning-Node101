const express = require("express");
const profileAuth = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateProfileData} = require("../helper/validate")

profileAuth.get("/profile/view", userAuth, async (req, res) => {
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

profileAuth.patch("/profile/edit", userAuth, async (req, res) => {
    try{
        if (!validateProfileData(req)){
            throw new Error("Can't Update these fields");
        }
        const user = req.user;
        const data = req.body;
        Object.keys(data).forEach(k=>
            user[k] = data[k]
        );

        res.json(
            {
                message: `Data Updated`,
                data : user
            }
        )
    }
    catch(err){
        res.status(400).send("Error in Profile Edit : "+err.message);
    }
});

module.exports = profileAuth;