console.log("This is the sum.js file.");

 x = "Hello Sum Module"; // error in es modules without var/let/const -> strict mode , runs in commonjs

// export var x = "Hello Sum Module";
function calculateSum(a, b){
    const sum = a+b;
    console.log("The sum of", a, "and", b, "is", sum);
}
// export function calculateSum(a, b){
//     const sum = a+b;
//     console.log("The sum of", a, "and", b, "is", sum);
// }
// module.exports = calculateSum ;
// module.exports = {
//     x: x,
//     calculateSum: calculateSum
// } ;
module.exports = {x,calculateSum} ;