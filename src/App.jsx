import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { set } from 'mongoose'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")  //input text
  const [todos, setTodos] = useState([])  //holdes all the todos
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id)=>{ 
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }
  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
    
  }
  
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleDelete= (e, id)=>{  
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
   
  }

  const handleAdd = () => {
    setTodos([...todos, {id:uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos);
    saveToLS()

  }


  return (
    <>
      <Navbar />
      <div className=" md:container md:mx-auto mx-auto min-h-[85vh] md:w-[55vw] my-5 rounded-xl p-5 bg-[rgb(24,24,32)] text-white">
      <h1 className='font-bold text-center text-3xl my-2'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5">
        <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input  onChange={handleChange} value={todo} type="text" className='md:w-[85%] w-[60vw] outline-none my-3 text-white shadow-md bg-[rgb(8,8,8)] shadow-[rgb(33,33,43)]  rounded-xl px-4 py-2 text-lg font-light' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='disabled:bg-[rgb(153,53,232)]  p-1 px-2 rounded-md bg-[rgb(153,53,232)] hover:bg-violet-800 mx-6'>Save</button> <br />
          <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
         <label className='font-thin mx-2' htmlFor="show">Show Finished</label> 
         <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'>

         </div>
        </div>
        
          <h2 className='text-lg font-bold'>Your todos</h2>
        <div className="todos">
        {todos.length ===0 && <div className='m-5'>No Todos to display</div> }

          {todos.map(item => {

            return (showFinished || !item.isCompleted) &&  <div key={item.id} className="todo flex justify-between w-[80vw] md:w-3/4 my-3">
              
              <div className='flex gap-10'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={`${item.isCompleted ? "line-through" : ""} text p-3 rounded-lg shadow-md bg-[rgb(27,27,37)] shadow-[rgb(33,33,43)]`}>{item.todo}</div>
              </div>
                
              <div className="buttons flex h-full ">
                <button onClick={(e) => {handleEdit(e,item.id)}} className=' bg-[rgb(153,53,232)] hover:bg-violet-800 p-1 px-2 rounded-md mx-2'><FaEdit /></button>
                <button onClick={(e) => {handleDelete(e,item.id)}} className='  p-1 px-2 rounded-md bg-[rgb(153,53,232)] hover:bg-violet-800 mx-2'><AiFillDelete /></button>
              </div>

            </div>
          })
          }
        </div>
      </div>
    </>
  )
}

export default App
