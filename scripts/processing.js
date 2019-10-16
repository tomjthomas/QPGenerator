
/*
Question Bank is a JSON string.
Each subject is a property, which has its own sections property.
Sections is an object with marks as its properties(2,5,10..) which hold arrays of questions as their values.
*/

let bank={};
//read JSON string from a file and parse


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

//Subject creation function
function addSubject(){
  let subjectName=prompt("Enter the subject name");
  //add option for the subject to the select input
  let node=document.getElementById('subjectselect');
  let opt=document.createElement('option');
  opt.appendChild(document.createTextNode(subjectName));
  opt.value=subjectName;
  node.appendChild(opt);
  node.value=subjectName;
  //add the subject to the bank object
  let subject=new Subject(subjectName);
  bank[subjectName]=subject;
}

let addSubjectButton=document.getElementById('addSubjectButton');
addSubjectButton.addEventListener("click",() => {
    addSubject();
});

//Question creation function
function addQuestion(event){
  let subject=form.elements.subject.value;
  let content=form.elements.question.value;
  let marks=form.elements.marks.value;
  let question = new Question(content,marks);
  bank[subject].sections[marks].push(question);
  console.log(JSON.parse(JSON.stringify(bank)));
}

let form = document.getElementById('form');
form.addEventListener("submit",event => {
  event.preventDefault();
  if(form.elements.subject.value)
    addQuestion(form);
  else
    alert("NO SUBJECT");
})
