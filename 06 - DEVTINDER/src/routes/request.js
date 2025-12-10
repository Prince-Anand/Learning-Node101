const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/request",userAuth, async (req, res) => {
    try{
        const user = req.user;
        res.send(`${user.firstName} sent a request to connect!`);
    }
    catch(err){
        res.status(400).send("Error in request handling : " + err.message);
    }
});

module.exports = requestRouter;