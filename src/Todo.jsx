import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

export const Todo = () => {
  const [todoText,setTodoText]=useState("")
  const [incompleteTodos,setIncompleteTodos]=useState([
    {id:1,text:"TODOです1",status:"未着手"},
    {id:2,text:"TODOです2",status:"未着手"},
  ])


  const onChangeTodoText=(event)=>setTodoText(event.target.value)

  const onClickAdd=()=>{
    if(todoText==="")return
    const newTodo={
    id:incompleteTodos.length+1,
    text:todoText,
    status:"未着手",}

    const newTodos=[...incompleteTodos,newTodo]

    setIncompleteTodos(newTodos)
    setTodoText("")
  }

  const onClickDelete =(index)=>{
    const newTodos=[...incompleteTodos]
    newTodos.splice(index,1)
    setIncompleteTodos(newTodos)
  }

  const onClickSwitch=(index)=>{
    const switchTodoList=[...incompleteTodos];
    const todo =switchTodoList[index]

    if(todo.status==="未着手"){
      todo.status="進行中"
    } else if(todo.status==="進行中"){
      todo.status="完了"
    } else if(todo.status==="完了"){
      todo.status="未着手"
    }
    setIncompleteTodos(switchTodoList);
  }

  const handleEditStatus=(id:number,status:string)=>{
    setIncompleteTodos(
      incompleteTodos.map((todo)=>(todo.id===id?{...todo,status:status}:todo))
    )
  }
  

  return (
    <>
    
    <div className="input-area">
      <input placeholder="TODOを入力" value={todoText} onChange={onChangeTodoText}/>
      <button onClick={onClickAdd}>追加</button>
    </div>
    <div className="incomplete-area">
      <p className="title">TODOリスト</p>
      <ul>
        {(incompleteTodos||[]).map((todo,index)=>(
            <li key={todo.id}>
          <div className="list-row">
          <p className="todo-item">{todo.id}</p>
          <p className="toto-item">{todo.text}</p>
          
          <button onClick={()=>onClickSwitch(index)}>{todo.status}</button>
          <button onClick={()=>onClickDelete(index)}>削除</button>
          <select value={todo.status}
          onChange={(e)=>handleEditStatus(todo.id,e.target.value)}>
        <option value="未着手">未着手</option>
        <option value="進行中">進行中</option>
        <option value="完了">完了</option>
        </select>
          </div>
          
        </li>
          )
        )}
      </ul>
    </div>
    </>
  );
};
