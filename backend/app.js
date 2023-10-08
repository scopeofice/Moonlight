const express=require("express");
const app=express();
const cors = require("cors");
const bodyparser=require("body-parser");
const route=require("./router/route");

app.use(cors());
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use("/",route);
app.listen(3002,()=>console.log("server @ 3002"));

module.exports=app;