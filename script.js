  
let taskarr=[];
let colorarr=[];
let idarr=[];
let obj={};
let filterColor = document.querySelectorAll(".filter");
let mainContainer = document.querySelector(".main_container");
let plusBtn=document.querySelector(".plus");
let modalContainer=document.querySelector(".modal_container");
let textBox=document.querySelector(".text-box");
let icolor="black";
let modalcolor=document.querySelectorAll(".modal-colors");
let ticketcolor=document.querySelector(".ticket_color")
let colors=["pink","blue","green","black"];
let filterColorContainer=document.querySelectorAll(".filter_color-container");
let cross=document.querySelector(".cross");
let deleteflag=false;
let lockbtn=document.querySelector(".lock_container");
let lockflag=true;

if(localStorage.getItem("alltask")){
  let strtask=localStorage.getItem("alltask");
  let strcolor=localStorage.getItem("allcolors");
  let strid=localStorage.getItem("allids");
  taskarr=JSON.parse(strtask);
  colorarr=JSON.parse(strcolor);
  idarr=JSON.parse(strid);
  for(let i=0;i<taskarr.length;i++){
      let task=taskarr[i];
       icolor=colorarr[i];
       let id=idarr[i];
    let taskContainer=document.createElement("div");
       taskContainer.setAttribute("class","ticket_container");
       taskContainer.innerHTML=`<div class="ticket_color ${icolor}"></div>
       <div class="ticket_desc_container">
           <div class="ticket_id">${id}</div>
           <div class="ticket_desc" contenteditable="false">${task}</div>
       </div>`;
       mainContainer.appendChild(taskContainer);
       addFunctionallity(taskContainer);
       handleRemove(taskContainer);
       
  }
}
for (let i = 0; i < filterColor.length; i++) {
    filterColor[i].addEventListener("click", function () {
        let classes = filterColor[i].getAttribute("class");
        // console.log(classes);
        let strArr = classes.split(" ");
        let color = strArr[1];
        let mainClasses = mainContainer.getAttribute("class");
        let mainCArr = mainClasses.split(" ");
        mainCArr[1] = color;
         mainClasses = mainCArr.join(" ");
        mainContainer.setAttribute("class",mainClasses);

    })
}
plusBtn.addEventListener("click", function () {
   // let task=prompt("Enter your task");
   // let color=prompt("color");
   /* if(task!=""&& color!=""){
      let   taskContainer=document.createElement("div");
      taskContainer.setAttribute("class","ticket_container");
      taskContainer.innerHTML=`<div class="ticket_color ${color}"></div>
      <div class="ticket_desc_container">
          <div class="ticket_id">#Example</div>
          <div class="ticket_desc" contenteditable="true">${task}</div>
      </div>`;
      mainContainer.appendChild(taskContainer);
    }*/
   modalContainer.style.display="flex";
   for(let j=0;j<modalcolor.length;j++){
    modalcolor[j].classList.remove("border");
 }
 plusBtn.style.background="grey";
})
for(let i=0;i<modalcolor.length;i++){
    modalcolor[i].addEventListener("click",function(){
     
        icolor=modalcolor[i].classList[1];
       // console.log(classes);
      
        modalcolor[i].classList.add("border");
    })
}
textBox.addEventListener("keydown",function(e){
  
    if(e.key=="Enter"&&textBox.value!=""){
        plusBtn.style.background="none";
       let task=textBox.value;
       let id="#"+Math.random().toString(32).slice(2);
      taskarr.push(task);
      colorarr.push(icolor);
      idarr.push(id);
      let strtask=JSON.stringify(taskarr);
      let strcolor=JSON.stringify(colorarr);
      let strid=JSON.stringify(idarr);
      localStorage.setItem("alltask",strtask);
      localStorage.setItem("allcolors",strcolor);
       localStorage.setItem("allids",strid);
       let taskContainer=document.createElement("div");
       taskContainer.setAttribute("class","ticket_container");
       taskContainer.innerHTML=`<div class="ticket_color ${icolor}"></div>
       <div class="ticket_desc_container">
           <div class="ticket_id">${id}</div>
           <div class="ticket_desc" contenteditable="false">${task}</div>
       </div>`;
       mainContainer.appendChild(taskContainer);
       modalContainer.style.display="none";
       textBox.value="";
       icolor="black";
       addFunctionallity(taskContainer);
       handleRemove(taskContainer);
     
   }
})
function addFunctionallity(taskContainer){
  
    let ticketColor = taskContainer.querySelector(".ticket_color");

    ticketColor.addEventListener("click",function(){
    let id=taskContainer.innerText.split("\n")[0];
     
     let i=idarr.indexOf(id);
     
     
    let cColor=ticketColor.classList[1];
    let idx=colors.indexOf(cColor);
    let newIdx=(idx+1)%4;
    let newColor=colors[newIdx];
    ticketColor.classList.remove(cColor);
    ticketColor.classList.add(newColor);
   colorarr[i]=newColor;
    let strcolor=JSON.stringify(colorarr);
    localStorage.setItem("allcolors",strcolor);
    })
}



let prevColor="";
for(let i=0;i<filterColorContainer.length;i++){
    filterColorContainer[i].addEventListener("click",function(){
       let child=filterColorContainer[i].children[0];
       let color=child.classList[1];
       let ticketContainer=document.querySelectorAll(".ticket_container");
       if(prevColor==color){
        for(let j=0;j<filterColorContainer.length;j++){
            filterColorContainer[j].style.background="#f5f6fa";
        }
         for(let i=0;i<ticketContainer.length;i++){
             ticketContainer[i].style.display="block";
         }
         prevColor="";
       }else{
           for(let j=0;j<filterColorContainer.length;j++){
               filterColorContainer[j].style.background="#f5f6fa";
           }
           filterColorContainer[i].style.background="none";
        for(let i=0;i<ticketContainer.length;i++){
            let myColor=ticketContainer[i].children[0].classList[1];
            
            if(myColor==color){
                ticketContainer[i].style.display="block";
            }else{
                ticketContainer[i].style.display="none";
            }
        }
        prevColor=color;
       }
    })
}

cross.addEventListener("click",function(){
    
    deleteflag=!deleteflag;
    console.log(deleteflag);
    if(deleteflag){
        cross.style.background="grey";
    }else{
        cross.style.background="none";
    }
})
function handleRemove(taskContainer){
  //  console.log(taskContainer);
 
       taskContainer.addEventListener("click",function(){
        if(deleteflag==true){
        let idchild=taskContainer.children[1].children[0];
        let id=idchild.innerText;
       // console.log(id);
        taskContainer.remove();
        let i=idarr.indexOf(id);
        idarr.splice(i,1);
        taskarr.splice(i,1);
        colorarr.splice(i,1);
        let strtask=JSON.stringify(taskarr);
        let strcolor=JSON.stringify(colorarr);
        let strid=JSON.stringify(idarr);
        localStorage.setItem("alltask",strtask);
        localStorage.setItem("allcolors",strcolor);
         localStorage.setItem("allids",strid);
        
        }
       })
 
}
lockbtn.addEventListener("click",function(){
    console.log("lock clicked");
    let desc_container=document.querySelectorAll(".ticket_desc");
    if(lockflag==true){
      let lock=lockbtn.children[0];
      lock.classList.remove("fa-lock");
      lock.classList.add("fa-unlock-alt");
      for(let i=0;i<desc_container.length;i++){
          desc_container[i].setAttribute("contenteditable","true");
         
         
      }
    }else{
        let lock=lockbtn.children[0];
        lock.classList.remove("fa-unlock-alt");
        lock.classList.add("fa-lock");
        let newtaskArr=[];
        for(let i=0;i<desc_container.length;i++){
            desc_container[i].setAttribute("contenteditable","false");
            let value=desc_container[i].textContent;
            newtaskArr.push(value);
        }
        taskarr=newtaskArr;
        let strArr=JSON.stringify(taskarr);
        localStorage.setItem("alltask",strArr);
    }
    lockflag=!lockflag;
})
