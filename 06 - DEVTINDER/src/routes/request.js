const express = require("express");
const mongoose = require("mongoose");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest")
const requestRouter = express.Router();
const User = require("../models/user")

requestRouter.post("/request/send/:status/:userId",userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;
        const status = req.params.status;
        const toUserId = req.params.userId;
        const fromUserId = loggedInUser._id;

        const ALLOWED_STATUS = ["ignored","interested"];

        if (!ALLOWED_STATUS.includes(status)){
            throw new Error("This status is not allowed")
        }

        const toUser = await User.findOne({
            _id: toUserId
        });
        //could have used findById as well 
        if (!toUser){
            return res.status(404).json({message:"User does not exist"});
        }
        //already exists in database;
        const isExistingConnection = await ConnectionRequest.findOne({
            $or : 
            [
                {fromUserId,toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        })
        // const isExistingConnection = await ConnectionRequest.findOne({
        //     $or : 
        //     [
        //         {fromUserId: new mongoose.Types.ObjectId(fromUserId),toUserId: new mongoose.Types.ObjectId(toUserId)},
        //         {fromUserId: new mongoose.Types.ObjectId(toUserId),toUserId: new mongoose.Types.ObjectId(fromUserId)},
        //     ]
        // })

        console.log(isExistingConnection)
        if (isExistingConnection){
            throw new Error("This connection already exists");
            // return res.status(400).json({message: "This connection already exists"});
        }
        
        const data = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const conn = await data.save();
        console.log(conn);
        res.json({
            message: `${loggedInUser.firstName} is ${status} in ${toUser.firstName}`,
            data
        })
        // res.send(`${user.firstName} sent a request to connect!`);
    }
    catch(err){
        res.status(400).json({message:"Error in request handling : " + err.message});
    }
});

requestRouter.post("/request/respond/:status/:requestId", userAuth, async (req,res)=>{
    try{
        const status = req.params.status;
        const requestId = req.params.requestId;
        const allowedStatuses = ["accepted", "rejected"];

        if (!allowedStatuses.includes(status)){
            throw new Error("Invalid Status")
        }
        const connection = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: req.user._id,
            status: "interested"
        });
        if (!connection){
            throw new Error("No connection Request found");
        }
        connection.status = status;

        // const 
        const data = await connection.save();
        res.status(200).json({message: "Connection "+status,
            data,
            success:true
        });
    }
    catch(err){
        res.status(400).json({message:"Error: "+err.message});
    }
})
module.exports = requestRouter;