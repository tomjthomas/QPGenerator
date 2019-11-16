const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const qp=require('./scripts/combine.js');
let app=express();
const upload = multer();
const path=require('path');

qp.init()

app.use(express.static('scripts'));
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname+'/html/qp.html'))
});
app.get('/papers*',(req,res)=>{
  res.sendFile(path.join(__dirname+req.url))
})

app.get('/getSubjects',(req,res)=>{
  res.send(JSON.stringify(qp.getSubjects()));
})

app.post('/submitQuestion',upload.none(),(req,res)=>{
  qp.addQuestion(req.body);
});
app.post('/genPaper',upload.none(),(req,res)=>{
  qp.getPaper(req.body.subject);
})

app.use(bodyParser.json());
app.post('/submitSubject',(req,res)=>{
  qp.addSubject(req.body.subName[0]);
});
app.listen(process.env.PORT||8000)
//
