const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req,res,next) => {
    try{
    const {token} = req.cookies;
    if (!token){
        throw new Error("Invalid token");
    }
    const decoded = jwt.verify(token,"#Secret@Key1ForDevTinder");

    const {_id} = decoded;
    const user = await User.findById(_id);
    if (!user){
        throw new Error("Please Login Again : Not in DB");
    }
    req.user = user;
    next();
    }
    catch(err){
        res.status(401).send("Authentication Failed : "+ err.message);
    }
}
module.exports = {
    userAuth
};