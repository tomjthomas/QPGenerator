window.onload=function(){

  let addForm=document.getElementById('addForm');
  let btnAddSub=document.getElementById('btnAddSub');
  let genForm=document.getElementById('genForm');

  getSubjects();

  //ADD QUESTION
  addForm.addEventListener('submit',(evnt)=>{
    let request = new XMLHttpRequest();
    evnt.preventDefault();
    request.open("POST","/submitQuestion");
    request.send(new FormData(addForm));
  });

  //ADD SUBJECT
  btnAddSub.addEventListener('click',(evnt)=>{
    evnt.preventDefault();
    let subjectName=[];
    let input=prompt("Enter the subject name")
    if(input)
    {
      subjectName.push(input);
      let request = new XMLHttpRequest();
      request.open("POST","/submitSubject");
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.send(JSON.stringify({subName:subjectName}));

      //add option for the subject to the select inputs
      let selectNodes=['iSubNameAdd','iSubNameGen'];
      for(let i of selectNodes){
        addOption(i,subjectName);
      }
    }
  });

  //GENERATE PAPER
  genForm.addEventListener('submit',(evnt)=>{
    let request=new XMLHttpRequest();
    evnt.preventDefault();
    request.open("POST","/genPaper");
    request.send(new FormData(genForm));
    node=document.getElementById('listgroup');
    node.setAttribute("class","list-group")
  });

  //function to add options to "select" inputs. options are added when
  //a new subject is added[addSubject] and from bank.json when page is loaded[getSubjects]
  function addOption(nodeName,subjectNames){
    let node=document.getElementById(nodeName);
    for(let subjectName of subjectNames)
    {
      let opt=document.createElement('option');
      opt.appendChild(document.createTextNode(subjectName));
      opt.value=subjectName;
      node.appendChild(opt);
      node.value=subjectName;
    }
  }

  function getSubjects(){
    let request=new XMLHttpRequest();
    request.responseType="json";
    request.onreadystatechange=()=>{
      if(request.readyState==4)
        {
          let subjectNames=request.response;
          let selectNodes=['iSubNameAdd','iSubNameGen'];
          for(let i of selectNodes)
            addOption(i,subjectNames);
        }
    }
    request.open("GET","/getSubjects");
    request.send();

  }
}
