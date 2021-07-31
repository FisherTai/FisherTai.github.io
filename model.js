class TodoBean {
    constructor(content,time,month,day,done){
        this.content = content;
        this.time = time;
        this.month = month;
        this.day = day;
        this.done = done;
    }
}

loadAllLocalData()

function loadAllLocalData(){
    const todoList = localStorage.getItem("list");
    if(todoList !== null){
        let myListArray = JSON.parse(todoList)
        myListArray.forEach(element => {

            let todo = document.createElement("div")
            todo.classList.add("todo")
            todo.appendChild(createTodoText(element.content));
            todo.appendChild(createTodoTime(element.time));
            todo.appendChild(createCompleyeBtn());
            todo.appendChild(createTrashBtn());
            if(element.done){
                todo.classList.add("done");
            }
            todo.style.animation = "scaleUp 0.3s forwards";
            section.appendChild(todo);

        });
    }
}

