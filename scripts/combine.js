const fs=require('fs');
let bank = {};
let paper=[];
let pattern ={
  "2":5,
  "5":4,
  "10":2
}

//Required for asynchronous programming
function init(callback){
  fs.readFile("bank.json","utf-8",(err,content)=>{
    if (err) throw err;
    readBank(content);
    console.log(bank);
    getPaper('Eng');
  });
}
/*
Question Bank is a JSON string.
Each subject is a property, which has its own sections property.
Sections is an object with marks as its properties(2,5,10..) which hold arrays of questions as their values.
*/

//called from getPaper. !!Modify
function readBank(text){
    bank=JSON.parse(text);
    //console.log(bank);
    //questions=bank[subject].sections;
}

function writeBank(){
  fs.writeBank('bank.json',bank,err =>{
    throw err;
  });
}

//GENERATE

//gets the questions for the paper
function getPaper(subject){
  questions=bank[subject].sections
  for(let [marks,num] of Object.entries(pattern)){
    paper=paper.concat(selector(questions[marks],num));
  }
  savePaper(paper);
}

//saves the paper to a local file
function savePaper(paper){
  paper=parsePaper(paper);
  fs.writeFile('../paper.txt',paper,(err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

//parses the questions to some form
function parsePaper(paper){
  let parsed="Question \t\t Marks \n";
  paper.forEach((item,index)=>{
      parsed=parsed.concat(`${index +1}.${item.content}\t\t${item.marks}\n`);
    });
  return parsed
}

//selects questions to be put in the paper
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

//ADD

//A Subject object is created everytime a new subject is to be added
class Subject{
    constructor(name){
      this.name=name;
      this.sections={"2":[],"5":[],"10":[]};
    }
}

//A Question object is created everytime a new question is to be added
class Question{
  constructor(content,marks){
    this.content=content;
    this.marks=marks;
  }
}

function addSubject(subjectName){
  // let subjectName=prompt("Enter the subject name");
  // add option for the subject to the select input
  // let node=document.getElementById('subjectselect');
  // let opt=document.createElement('option');
  // opt.appendChild(document.createTextNode(subjectName));
  // opt.value=subjectName;
  // node.appendChild(opt);
  // node.value=subjectName;
  let subject=new Subject(subjectName);
  bank[subjectName]=subject;
  writeBank();
}

//Question creation function
function addQuestion(form){
  let subject=form.elements.subject.value;
  let content=form.elements.question.value;
  let marks=form.elements.marks.value;
  let question = new Question(content,marks);
  bank[subject].sections[marks].push(question);
  writeBank();
  console.log(JSON.stringify(bank));
}
module.exports={init,readBank,getPaper,parsePaper};
