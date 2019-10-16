const fs=require('fs');
let bank="";
let paper=[];
let pattern ={
  "2":5,
  "5":4,
  "10":2
}

function getPaper(subject){
  fs.readFile("bank.json","utf-8",(error,text)=>{
    let questions=readBank(subject,text);
    for(let [marks,num] of Object.entries(pattern)){
      paper=paper.concat(selector(questions[marks],num));
    }
    savePaper(paper);
    console.log(paper);
  });
}

function readBank(subject,text){
    bank=JSON.parse(text);
    return bank[subject].sections;
}

function savePaper(paper){
  paper=parsePaper(paper);
  fs.writeFile('../paper.txt',paper,(err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

function parsePaper(paper){
  let parsed="Question \t\t Marks \n";
  paper.forEach((item,index)=>{
      parsed=parsed.concat(`${index +1}.${item.content}\t\t${item.marks}\n`);
    });
  return parsed
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
