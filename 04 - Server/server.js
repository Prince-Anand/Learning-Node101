const http = require("node:http");

const server = http.createServer(function(req,res){
    //reply hello
    if (req.url === "/getSecretData"){
        res.end("no secret is here")
    }
    res.end("Hello World!");
    //end of reply to req -> close connection
});
// it creates an instance of server
// create an application server -> this can listen to request

server.listen(7777);