const fs = require("fs");

setImmediate(()=>{
    console.log("setImmediate");
});

Promise.resolve("Promise").then(console.log);

fs.readFile("./file.txt","utf-8",()=>{
    console.log("File reading CB");
})
process.nextTick(()=>{
    process.nextTick(()=>console.log("inner nextTick"));
    console.log("NextTick");
})
setTimeout(()=>{
    console.log("Timer-Expired");
},0);

console.log("Last Line of the file");

// Last Line of the file
// NextTick
// inner nextTick
// Promise
// Timer-Expired
// setImmediate
// File reading CB