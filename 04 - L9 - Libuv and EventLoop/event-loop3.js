const fs = require("fs");

setImmediate(()=>{
    console.log("setImmediate");
});

Promise.resolve("Promise").then(console.log);

fs.readFile("./file.txt","utf-8",()=>{
    setTimeout(() => {
        console.log("2nd Timed out")
    }, 0);
    process.nextTick(()=>{
        console.log("2nd nextTick")
    });
    setImmediate(()=>{
        console.log("2nd setImmediate");
    });
    console.log("File reading CB");
})
process.nextTick(()=>{
    console.log("NextTick");
})

console.log("Last Line of the file");

// Last Line of the file
// NextTick
// Promise
// setImmediate
// File reading CB
// 2nd nextTick
// 2nd setImmediate
// 2nd Timed out