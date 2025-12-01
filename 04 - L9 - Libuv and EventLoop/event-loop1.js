const fs = require("fs");

const a = 100;

fs.readFile("./file.txt","utf-8",()=>{
    console.log("File Reading Callback");
});

setTimeout(()=>{
    console.log("Timed Out");
},0);

function printA(){
    console.log("a = ",a);
}
printA();

console.log("Last Line of the file");

// Output - 
// a =  100
// Last Line of the file
// Timed Out
// File Reading Callback