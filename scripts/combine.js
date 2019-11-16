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
  console.log('writing to bank');
  fs.writeFile('bank.json',JSON.stringify(bank),err =>{
    if(err)
      throw err;
  });
}

function getSubjects(){
    let subs=[];
    for(let i of Object.keys(bank))
      subs.push(bank[i]["name"]);
    return subs;
}
//GENERATE

//gets the questions for the paper
function getPaper(subject){
  questions=bank[subject.substring(0,3)].sections;
  for(i=1;i<=3;i++)
  {
    paper=`${subject}\n`;
    console.log(paper);
    selectedQuestions=[];
    for(let [marks,num] of Object.entries(pattern)){
      selectedQuestions=selectedQuestions.concat(selector(questions[marks],num));
    }
    paper=paper.concat(parsePaper(selectedQuestions));
    savePaper(paper,i);
  }
}

//saves the paper to a local file
function savePaper(paper,i){
  fs.writeFile(`./papers/paper${i}.txt`,paper,(err) => {
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
  return parsed;
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
  let subject=new Subject(subjectName);
  bank[subjectName.substring(0,3)]=subject;
  writeBank();
}

//Question creation function
function addQuestion(form){
  let subject=form.subject.substring(0,3);
  let content=form.question;
  let marks=form.marks;
  let question = new Question(content,marks);
  bank[subject].sections[marks].push(question);
  writeBank();
}
module.exports={init,readBank,getPaper,parsePaper,addQuestion,addSubject,getSubjects};
