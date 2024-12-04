import { useEffect, useState } from 'react'
import axios from 'axios';
import '../public/stylesheets/todo_v2.css'


/*
DOM LAYOUT:
1. Sidebar/ "Nav Area"
2. Todos List/ "Main Area"
  - Header
    - Hamburger image to open sidebar
    - Title + Count

  - Main
    - Add new todo (clickable)
    - Todo List (table of todos)
    - Form modal (hidden)

NECESSARY COMPONENTS for "MAIN AREA":

1. Header
2. Main Section
3. Add new todo line
4. Todo list table
5. Form modal


-- Steps --
1. Test fetching all todos and displaying


- Typing Needed -
1. Incoming todo objects => todo list

- Modularization + Service -
* make all api calls in a todoService.js file
* make components separate - in components folder
* make types in types file

*/
interface Todo {
  id: number;
  title: string;
  day: string;
  month: string;
  year: string;
  completed: boolean;
  description: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = async () => {
    try {
      const response = await axios.get(`/api/todos`);
      const data = response.data;
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <>
      <h1>All Todos {todos.length}</h1>
      {todos.map((todo: Todo) => {
        return <p key={todo.id}>
          {`[ ] ${todo.title} - Due Date Here`}
          </p>
      })}
    </>
  )
}

export default App
