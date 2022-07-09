"use strict";

// Main
const interxpress = require("../index")
const express = require("express")

// Variables
const web = express()
const port = 8080

// Main
web.use(interxpress.send((body, req, res)=>{
    if(body.indexOf("root:x044") !== -1) return res.send("404")
}))

web.get("/etc/passwd", (req, res)=>{
    res.send("root:x044")
})

web.use("", (req, res)=>{
    res.send("Home")
})

web.listen(port, ()=>{
    console.log(`Website is running. Port: ${port}`)
})