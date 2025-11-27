const fs = require('fs');
const http = require('http');

const server = http.createServer((req,res)=>{
    res.write(
        `
        <div>
        <ul>
        <li>item1</li>
        <li>item2</li>
        </ul>
        </div>
        `
    );
    res.end("Server Created")
})

server.listen(3000,()=>{
    console.log("Running on 3000");
});