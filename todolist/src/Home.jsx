import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";
import { BsCircleFill } from "react-icons/bs";


function Home(){
const [todos, setTodos] = useState([])
useEffect(() => {
    axios.get('https://todo-list-navy-nine.vercel.app/get')
    .then(result => setTodos(result.data))
    .catch(err => console.log(err))
}, [])

const handleEdit = (id) =>{
    axios.put('https://todo-list-navy-nine.vercel.app/update/'+id)
    .then(result => {location.reload()})
    .catch(err => console.log(err))
}

const handleDelete = (id) =>{
    axios.delete('https://todo-list-navy-nine.vercel.app/delete/'+id)
    .then(result => {location.reload()})
    .catch(err => console.log(err))
}
    return(
        <div className="home"> 
            <h2>ToDo List</h2>
            <Create />
            <br />
            {
                todos.length === 0 
                ?
                <div><h2>No Record</h2></div>
                :
                todos.map(todo => (
                    <div className="task">
                        <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                            {todo.done ?
                            <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
                        :<BsCircleFill className="icon"/>}
                            
                      <p className={todo.done ? "line_through" : ""}> {todo.task}</p> 
                        </div>
                        <div>
                            <span><BsFillTrashFill className="icon" onClick={() => handleDelete(todo._id)}/></span>
                    </div>
                    </div>
                ))
            }
        </div>
    )
}
export default Home