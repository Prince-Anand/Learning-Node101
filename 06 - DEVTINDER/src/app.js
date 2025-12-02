const express = require("express");

const app  =  express();

app.use("/test",(req,res)=>{
    res.send("Hello from server");
});
app.use("/hello",(req,res)=>{
    res.send("Hello from hello");
});
app.use("/",(req,res)=>{
    res.send("Hello from dashboard");
});


app.listen(3000,()=>{
    console.log("Listening to port request on Port 3000");
});