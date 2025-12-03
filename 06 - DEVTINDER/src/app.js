const express = require("express");

const app = express();

// app.use("/",(req,res)=>{
//     res.send("Hello from dashboard");
// });
// order matters here - top ->bottom this will always run (in any route)

// app.get("/user",(req,res)=>{
//     res.send("Data fetched successfully");
// })

// app.post("/user",(req,res)=>{
//     res.send({firstName:"Prince", lastName: "Anand"});
// })
// app.delete("/user",(req,res)=>{
//     console.log("Deleted Successfully");
//     res.send("Deleted");
// })
// app.patch("/user",(req,res)=>{
//     res.send("Updated Successfully");
// })

// Old way - express4
// app.get("/a(bc)?d",(req,res)=>{
//     res.send("Data fetched successfully");
// })

// New Way - regex path
// app.get(/^\/a(bc)?d$/,(req,res)=>{
//     res.send("bc is optional here");
// })
// app.get(/^\/a(bc)+d$/,(req,res)=>{
//     res.send("bc can be any no of time here");
// })
app.get(/^\/.*fly$/,(req,res)=>{
    res.send("end with fly");
})

app.use("/test", (req, res) => {
  res.send("Hello from server");
});
// app.use("/hello",(req,res)=>{
//     res.send("Hello from hello");
// });

// app.use("/",(req,res)=>{
//     res.send("Hello from dashboard");
// });
// works here
// **** order of route is very ipmortant
app.listen(3000, () => {
  console.log("Listening to port request on Port 3000");
});
