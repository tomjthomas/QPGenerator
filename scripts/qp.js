function selectTab(event,tabName){
  let tabs=document.getElementsByClassName('tab');
  for(let tab of tabs){
    tab.style.display="none";
  }
  document.getElementById(tabName).style.display="block"
}
