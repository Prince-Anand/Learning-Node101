const crypto = require('crypto');
console.log("Hello World");
var a = 1078689;
var b = 678909;

crypto.pbkdf2Sync("password","salt",5000000,50,"sha512");

console.log("First KEy generated");

crypto.pbkdf2("password","salt",5000000,50,"sha512",(err,key)=>{
    console.log("Second Key generated");
});

function Multipy(a,b){
    console.log("Multiplication is: ", a*b);
}

Multipy(a,b)