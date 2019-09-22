const fs=require('fs');
let bank="";
let questions="";
let paper=[];
let pattern ={
  "2":5,
  "5":4,
  "10":2
}

function getPaper(subject){
  fs.readFile("bank.json","utf-8",(error,text)=>{
    readBank(subject,text);
    for(let [marks,num] of Object.entries(pattern)){
      paper=paper.concat(selector(questions[marks],num));
    }
    console.log(paper);  
  });
}

function readBank(subject,text){
    bank=JSON.parse(text);
    questions=bank[subject].sections;
}



function selector(array,num){
  let selected=[];
  let i=0;
  while(i<num)
  {
    let question=array[Math.floor(Math.random()*array.length)];
    if(!selected.includes(question))
    {
      selected.push(question);
      i++;
    }
  }
  return selected;
}
getPaper("Eng");
