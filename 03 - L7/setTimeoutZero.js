var a = 1078689;
var b = 678909;

setTimeout(() => {
    console.log("setTimeout with 0 ms executed !! execute me first");
},0); // Trust issue with setTimeout 0  -> runs after as soon as main code is executed
//only runs when call stack is empty

setTimeout( ()=>{
    console.log("setTimeout with 2 seconds executed");
},2000);

function Multipy(a,b){
    console.log("Multiplication is: ", a*b);
}

Multipy(a,b)