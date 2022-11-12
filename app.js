const { json } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res)=>{
    res.json({
        msg: "Hello there!",
    });
});

app.post("/api/posts", verifyToken ,(req, res)=>{
    jwt.verify(req.token, "secret", (err, authData)=>{
        if(err) res.sendStatus(403);
        else{
            res.json({
                msg: "Post created",
                data: authData,
            });
        }
    });
});

app.post("/api/login", (req, res)=>{
    //Mock user
    const user = {
        id: 1,
        username: 'brad',
        email: 'brad@gmail.com',
    }
    jwt.sign({user}, "secret", {expiresIn: '30s'}, (err, token)=>{
        res.json({token});
    });
});

//TOKEN FORMAT
// Authozation: Bearer <token>

function verifyToken(req, res, next){
    //get auth header value;
    let bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined'){
        //split at space
        let token = bearerHeader.split(" ")[1];
        req.token = token;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(5000, ()=>console.log("Server started on port 5000."));