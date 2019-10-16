const express = require('express');
var app=express();
const path=require('path');
app.use(express.static(__dirname+'/scripts'));
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname+'/html/qp.html'))
});

app.listen(process.env.PORT||8000)
const qp=require('./scripts/combine.js');
qp.init();
