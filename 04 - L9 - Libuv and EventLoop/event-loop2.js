const fs = require("fs");

const a = 100;

setImmediate(()=>{
    console.log("setImmediate");
});

Promise.resolve("Promise").then(console.log);


fs.readFile("./file.txt","utf-8",()=>{
    console.log("File Reading Callback");
});

process.nextTick(()=>{
    console.log("nextTick")
});

setTimeout(()=>{
    console.log("Timed Out");
},0);

function printA(){
    console.log("a = ",a);
}
printA();

console.log("Last Line of the file");

/*
Output - 

a =  100
Last Line of the file
nextTick
Promise
Timed Out
setImmediate
File Reading Callback

*/