const mongoose = require("mongoose");


connectDb()
.then(console.log("hi"))
.catch(err=>{
    console.log(err);
})