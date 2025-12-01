const fs = require("fs");

setImmediate(()=>{
    console.log("setImmediate");
});

Promise.resolve("Promise").then(()=>{
    Promise.resolve("inner of Promise Promise").then(console.log);
    process.nextTick(()=>console.log("inner of Promise nextTick"));
    console.log("Promise");
});

fs.readFile("./file.txt","utf-8",()=>{
    console.log("File reading CB");
})
process.nextTick(()=>{
    process.nextTick(()=>console.log("inner nextTick"));
    Promise.resolve("inner of nextTick Promise").then(console.log);
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
// inner of nextTick Promise
// inner of Promise Promise
// inner of Promise nextTick
// Timer-Expired
// setImmediate
// File reading CB