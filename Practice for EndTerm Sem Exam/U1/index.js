// // 1. Create a node.js application to display the implementation of events.
// // 2. Create a nodejs application to implement listeners using events.
// const EventEmitter = require("events");
// // Ye upr wala class h req pe
// const obj = new EventEmitter();
// // Mistake: Object bnana hota h - instance of EventEmiitter class
// obj.on("order-placed",()=>{
//     console.log("Order is getting ready to be delivered");
// })
// const order = (OrderNo) =>{
//     console.log(`Order Placed - Token : ${OrderNo}`);
//     obj.emit("order-placed");
// }
// console.log("Hello, Place Your Order");

// order(245);
// ----------------------------------------------------------------------------------------------------------
// 3. Create a NodeJS application that should open and read from a filename "demo.txt", if file is empty then it should print on console that "File is empty" otherwise content should be printed on the console.

// const fs  = require("fs");
// fs.readFile("demo.txt","utf-8",(err,data)=>{
//     if (err){
//         console.log("Error",err);
//         return;
//     }
//     if (data.trim().length==0){
//         console.log("File is empty");
//     }
//     else
//     console.log(data);
// })
// ------------------------------------------------------------------------------------
// 4. Create a nodejs application to compress and decompress a file using Zlib and print the contents of file on the console.

// const zlib = require("zlib");
// const fs = require("fs");

// const gzip = zlib.createGzip();

// fs.createReadStream("demo.txt").pipe(gzip).pipe(fs.createWriteStream("demo.txt.gz"));
// console.log("compressed");

// const gunzip = zlib.createGunzip();
// fs.createReadStream("demo.txt.gz").pipe(gunzip).pipe(fs.createWriteStream("demo1.txt"));
// console.log("decompressed");

// Wrong -
// Mistake -
// 1. decompressing while it is being compressed as it is asynchronous task

// const zlib = require("zlib");
// const fs = require("fs");

// const gzip = zlib.createGzip();

// const zipp = fs.createReadStream("demo.txt").pipe(gzip).pipe(fs.createWriteStream("demo.txt.gz"));
// console.log("compressed");

// zipp.on("finish",()=>{
//     const gunzip = zlib.createGunzip();
//     fs.createReadStream("demo.txt.gz").pipe(gunzip).pipe((process.stdout));
//     const gunzip1 = zlib.createGunzip();
//     //same transform stream cant be used twice
//     fs.createReadStream("demo.txt.gz").pipe(gunzip1).pipe(fs.createWriteStream("demo1.txt")).on("finish",()=>{
//         console.log("\nfile decompressed");
//     })
// })
// ------------------------------------------------------------------------------
// 5. Create an application in nodejs for basic unit converter using Events. Basic unit converter (Fahrenheit to Celsius) C=(F-32)*5/9.

// const events = require("events");
// const obj = new events();
// let temp = 92;

// console.log("Fahrenhite: ",temp)
// obj.on("convert",()=>{
//     temp=(temp-32)*5/9;
//     console.log("converted");
// })
// obj.emit("convert")
// console.log("Celcius: ",temp.toFixed(2))

//6. Create a nodejs application which opens a file 'demo .txt'and copies the contet into another file 'copy.txt'. Also delete the old file after copying.

// const fs = require("fs");
// const readFile = fs.readFile("demo.txt", "utf-8", (err, data) => {
//   fs.writeFile("copy.txt", data, (err) => {
//     if (err) console.log("error: ", err.message);
//     else console.log("File copied successfully");
//     fs.unlink("demo.txt", (err) => {
//       if (err) console.log("error");
//     });
//   });
// });

// Learn - Asynchronus function req callback otherwise error


// 7. Implement a Node.js application to create a writable stream with a new sample.txt file and perform the following tasks:
//    a) Find the prime numbers up to 100 and write the values to the sample.txt file with the writable stream
//    b) Display the message "Task Completed" at the end in the console window.

// const fs = require("fs");
// const writestream = fs.createWriteStream("sample.txt")

// const isPrime = (n) => {
//     if (n<2) return false;
//     for (let i=2;i<n;i++){
//         if (n%i==0) return false;
//     }
//     return true;
// }
// for (let i=1;i<=100;i++){
//     if (isPrime(i)){
//         writestream.write(i.toString());
//         writestream.write(" ");
//     }
// }
// writestream.end()
// writestream.on("finish",()=>{
//     console.log("Task Completed")
// // readstream,Gzip ,post in http(req)- end
// // writestream,res - finish
// })

//------------------------------------------------------------------------------
// 8. Implement a Node.js application to create a readable stream with a student.txt file (add basic student details in the file). Read the student details from the above stream and send the data as a response to the client request from the browser.

// const fs = require("fs");
// const http = require("http");
// if (!fs.existsSync("student.txt")){
//     fs.createWriteStream("student.txt").write("Name: John Doe\nRoll No: 12345\nCourse: INT222")
// }

// const server = http.createServer((req,res)=>{
//     res.writeHead(200,{"content-type":"text/plain"});
//     const readstream = fs.createReadStream("student.txt","utf-8");
//     readstream.pipe(res);
// })
// server.listen(3000,()=>{
//     console.log("running")
// })
//-----------------------------------------------------------------------------------------------
// 9. Create a node.js application to parse a JSON file and print the contents of file on console.

// const data = require("./data.json")
// console.log(data)

// const fs = require("fs");

// fs.readFile("data.json","utf-8",(err,data)=>{
//     if (err){ console.log(err);
//         return;
//     }
//     console.log(JSON.parse(data));
// })

//--------------------------------------------------------------------------------------------
// 11. Write a Nodejs program to convert total memory to kb, mb and gb using OS module in Node Js.
// const os=require("os");
// const totalBytes = os.totalmem();
// console.log(`Total Memory (Bytes): ${totalBytes}`);

// const kb = totalBytes/1024;
// const mb = kb/1024;
// const gb = mb/1024;
// console.log("free: ",os.freemem()/1024/1024/1024)
// console.log((os.freemem() / 1024 / 1024 / 1024).toFixed(2), "GB");

// console.log(`KB: ${kb.toFixed(2)}`);
// console.log(`MB: ${mb.toFixed(2)}`);
// console.log(`GB: ${gb.toFixed(2)}`);

//--------------------------------------------------------
// 13. Create a new directory using path module in node js.

const path = require("path");
const fs = require("fs");

//rename
fs.rename("copy.txt","data.txt",(err)=>{
    if (err) console.log("error",err)
})
const dir = path.join(__dirname,"newFolder");
if (!fs.existsSync(dir)){
    fs.mkdir(dir,(err)=>{
        if (err){
            console.log("error",err)
        }
        else{
            console.log("Folder created")
        }
    })
}
else{
    console.log("Folder already exists")
}