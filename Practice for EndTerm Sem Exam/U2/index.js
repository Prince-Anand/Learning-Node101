// 1. Create a nodejs application to make http request to open a feedback form which contains following fields - Name, contact Number as text fields, Feedback as text area and a submit button. On Submission, 'Thankyou for your feedback' message should be displayed in a popup box.

// const http = require('http');

// const server = http.createServer((req,res)=>{
//     if (req.url == "/") {
//         res.writeHead(200,{"content-type":"text/html"});
//         res.write(`
//             <h2>Feedback Form</h2>
//             <form action="/submit" method="POST">
//             <label for="name">Name: </label>
//             <input id="name" type="text"><br>
//             <label for="contact">Number: </label>
//             <input id="contact" type="text"><br>
//             <label for="feedback">Feedback: </label>
//             <textarea id="feedback"></textarea><br>
//             <button type="submit">Submit</button>
//             </form>
//             `)
//         res.end();
//     }
//     else if (req.url === "/submit"){
//         res.writeHead(200,{"content-type":"text/html"});
//         res.write(`
//             <script>
//             alert("Thankyou for your feedback");
//             window.location.href="/"
//             </script>`)
//         res.end();
//     }

// })
// server.listen(3000,()=>{
//     console.log('Server is running on http://localhost:3000');
// });

// 2. Create a nodejs application using Express to post the full name of student to the server.
// const express = require("express");

// const app = express();

// app.use(express.urlencoded({extended: true}));
// app.get("/",(req,res)=>{
//     res.send(`
//         <form method="POST" action="/submit">
//         <input type="text" name="full" placeholder = "Enter Full Name" required>
//         <button type="submit">Send to Server</button>
//         </form>
//         `)
// });
// app.post("/submit",(req,res)=>{
//     res.send("Welcome, " + req.body.full);
// })

// app.listen(3000,()=>{
//     console.log('Server is running on http://localhost:3000');
// });

// 3. Create an express application for the following scenario:
//    a) Create a text file and add student information(Reg. No., Name, Grade) in the server system.
//    b) Accept a file name from the input text field of a user web page and transfer the requested file using sendFile() function from the server as a response to the button click event from the user web page.

// const fs= require("fs");
// const express = require("express");
// const path = require("path");

// if (!fs.existsSync("data.txt")){
//     fs.writeFile("data.txt","Name: Prince\nRegNo. : 123\nGrade: O",(err)=>{
//         if (err) console.log(err);
//     });
// }
// const app = express();
// app.use(express.urlencoded({extended:true}))
// app.get("/",(req,res)=>{
//     res.send(`
//         <form action="/download" method="POST">
//         <input name="filename">
//         <button type="submit">Download</button>
//         </form>
//         `)
// })
// app.post("/download",(req,res)=>{
//     const file = path.join(__dirname,req.body.filename);
//     res.sendFile(file)
// })
// app.listen(3000,()=>{
//     console.log('Server is running on http://localhost:3000');
// });

// 13.
// const http = require("http");

// http.createServer((req, res) => {
//   if (req.method === "POST") {
//     let body = "";
//     req.on("data", d => body += d);
//     req.on("end", () => res.end(body));
//   } else {
//     res.end(`<html><form method="POST"><input name="data"><button>Submit</button></form>`);
//   }
// }).listen(3000);
// console.log('Server is running on http://localhost:3000');