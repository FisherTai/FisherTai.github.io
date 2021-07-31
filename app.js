document.write('<script src="model.js"></script>');

let add = document.querySelector("form button");
let section = document.querySelector("section");

add.addEventListener("click", e => {
    //避免被預設提交出去
    e.preventDefault();
    //取得表單內容
    let form = e.target.parentElement;
    let todoText = form.children[0].value;
    let todoMonth = form.children[1].value;
    let todoDate = form.children[2].value;
    let timeText = todoMonth + "/" + todoDate;

    if(todoText === "" || todoDate == "" || todoMonth == ""){
        alert("請勿留白!")
        return;
    }

    //create TODO
    let todo = document.createElement("div")
    todo.classList.add("todo")
    todo.appendChild(createTodoText(todoText))
    todo.appendChild(createTodoTime(timeText))
    // create green check and red trash can
    todo.appendChild(createCompleyeBtn());
    todo.appendChild(createTrashBtn());
    todo.style.animation = "scaleUp 0.3s forwards";
    
    section.appendChild(todo);

    //建立物件
    let myTodo = new TodoBean(todoText,timeText,todoMonth,todoDate,false)

    let myList = localStorage.getItem("list");
    if(myList == null){
         localStorage.setItem("list",JSON.stringify([myTodo])) ;   //用陣列包裝
    }else{
        let myListArray = JSON.parse(myList)
        myListArray.push(myTodo)
        localStorage.setItem("list",JSON.stringify(myListArray))
    }
    form.children[0].value = "";
})


let sortBtn = document.querySelector(".sort button"); 
sortBtn.addEventListener("click",e =>{
    let sortList = mergeSort(JSON.parse(localStorage.getItem("list")));
    localStorage.setItem("list",JSON.stringify(sortList));

    let curList = document.querySelectorAll("section .todo");
    curList.forEach(item => {
        item.remove()
    })
    loadAllLocalData()
})

function createTodoText(todoContent){
    let text = document.createElement("p")
    text.classList.add("todo-text")
    text.innerText = todoContent
    return text
}

function createTodoTime(todoTime){
    let time = document.createElement("p")
    time.classList.add("todo-time")
    time.innerText = todoTime
    return time
}

function createCompleyeBtn(){
    let compleyeBtn = document.createElement("button");
    compleyeBtn.classList.add("complete");
    compleyeBtn.innerHTML='<i class="fas fa-check"></i>';
    compleyeBtn.addEventListener("click",e =>{
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done"); //每次點擊如果有done就刪除，沒有就加入
        
        let myListArray =JSON.parse(localStorage.getItem("list"));
        myListArray.forEach((element) => {
            if(element.content == todoItem.querySelector(".todo-text").innerText 
            && element.time == todoItem.querySelector(".todo-time").innerText){
                element.done = !element.done
                localStorage.setItem("list",JSON.stringify(myListArray))
            }
        });
    })
    return compleyeBtn;
}

function createTrashBtn(){
    let trashBtn = document.createElement("button")
    trashBtn.classList.add("trash")
    trashBtn.innerHTML='<i class="fas fa-trash-alt"></i>'
    trashBtn.addEventListener("click",e =>{
        let todoItem = e.target.parentElement;
        todoItem.addEventListener("animationend",()=>{
            let myListArray =JSON.parse(localStorage.getItem("list"));
            myListArray.forEach((element,index) => {
                if(element.content == todoItem.querySelector(".todo-text").innerText 
                && element.time == todoItem.querySelector(".todo-time").innerText){
                    myListArray.splice(index,1);
                    localStorage.setItem("list",JSON.stringify(myListArray))
                }
            });
            todoItem.remove();
        })
        todoItem.style.animation = "scaleDown 0.3s forwards"
    })
    return trashBtn
}


function mergeTime(arr1, arr2) {
    let result = [];
    let i = 0;
    let j = 0;
  
    while (i < arr1.length && j < arr2.length) {
      if (Number(arr1[i].month) > Number(arr2[j].month)) {
        result.push(arr2[j]);
        j++;
      } else if (Number(arr1[i].month) < Number(arr2[j].month)) {
        result.push(arr1[i]);
        i++;
      } else if (Number(arr1[i].month) == Number(arr2[j].month)) {
        if (Number(arr1[i].day) > Number(arr2[j].day)) {
          result.push(arr2[j]);
          j++;
        } else {
          result.push(arr1[i]);
          i++;
        }
      }
    }
  
    while (i < arr1.length) {
      result.push(arr1[i]);
      i++;
    }
    while (j < arr2.length) {
      result.push(arr2[j]);
      j++;
    }
  
    return result;
  }
  
  function mergeSort(arr) {
    if (arr.length === 1) {
      return arr;
    } else {
      let middle = Math.floor(arr.length / 2);
      let right = arr.slice(0, middle);
      let left = arr.slice(middle, arr.length);
      return mergeTime(mergeSort(right), mergeSort(left));
    }
  }


