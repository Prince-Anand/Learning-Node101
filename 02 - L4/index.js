// require('./xyz.js'); // one module into another module
// const calculateSum = require("./sum.js");
// const obj = require("./sum.js");
const {x, calculateSum} = require("./sum.js");


// import { x, calculateSum } from "./sum.js"; // es module syntax

var name = "Prince";
var a=10;
var b=20;

calculateSum(a,b);
console.log(x);
console.log("Hello World! from", name);