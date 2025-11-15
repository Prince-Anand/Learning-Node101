const {calculateSum, calculateMultiplication}  = require("./calculate");
// calculate folder is treated as module here - (index.js is default file)

var a = 10;
var b = 20;

calculateSum(a, b);
calculateMultiplication(a, b);