const mongoose = require("mongoose");
require("dotenv").config();
const connectDb = async () =>{
    await mongoose.connect(process.env.URL);
}

module.exports = connectDb;
// connectDb()
// .then(console.log("DB Connection Successfull"))
// .catch(err=>{
//     console.log("Error =>",err);
// })