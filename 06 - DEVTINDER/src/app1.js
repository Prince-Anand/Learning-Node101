const express = require("express");

const connectDB = require("./config/database")
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
// app.get(/^\/.*fly$/,(req,res)=>{
//     res.send("end with fly");
// })

// app.use("/test", (req, res) => {
//   res.send("Hello from server");
// });
// app.use("/hello",(req,res)=>{
//     res.send("Hello from hello");
// });

// app.use("/",(req,res)=>{
//     res.send("Hello from dashboard");
// });
// works here
// **** order of route is very ipmortant


// Next lecture

// app.use("/user",
//   (req,res,next)=>{
//   console.log("1st response Handler")
//   // res.send("Response");
//   next();
//   },
//   (req,res,next)=>{
//   console.log("2nd response Handler")
//   // res.send("2nd Response");
//   next();
// },
// (req,res,next)=>{
//   console.log("3rd response Handler"); // hang here if no send in 3rd from 2nd next
//   res.send("3rd Response");
//   // next(); // error cannot get cz no handler defined
//   }

// );

// app.use("route",[rh1,rh2,rh3]);

// app.use("/",[
//   (req,res,next)=>{
//   console.log("1st response Handler")
//   // res.send("Response");
//   next();
//   },
//   (req,res,next)=>{
//   console.log("2nd response Handler")
//   // res.send("2nd Response");
//   next();
// }],
// (req,res,next)=>{
//   console.log("3rd response Handler"); // hang here if no send in 3rd from 2nd next
//   res.send("3rd Response");
//   // next(); // error cannot get cz no handler defined
//   }
// );

// HW from lect 5 last 30 min
//----

connectDB()
.then(()=>{
  console.log("DB Connection established...")
  app.listen(3000, () => {
    console.log("Listening to port request on Port 3000");
  });
})
.catch((err)=>{
  console.log("Error!!")
})

