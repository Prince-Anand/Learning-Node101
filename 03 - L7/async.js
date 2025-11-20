const fs = require('fs');
const https = require('https');

var a = 1078689;
var b = 678909;

https.get('https://dummyjson.com/test', (res) => {
    res.on('data', () => {}); // just to consume data otherwise terminal hangs cz of no data consumption
    console.log("Fetched data successfully");
});

setTimeout(() => {
    console.log("setTimeout executed after 5 seconds");
},5000);

fs.readFile("file.txt","utf-8",(err,data)=>{
    console.log("File data: ", data);
});

function Multipy(a,b){
    console.log("Multiplication is: ", a*b);
}

Multipy(a,b);