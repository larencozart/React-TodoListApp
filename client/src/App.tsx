import { useEffect, useState } from 'react'
import axios from 'axios';
import '../public/stylesheets/todo_v2.css'

interface Todo {
  id: number;
  title: string;
  day: string;
  month: string;
  year: string;
  completed: boolean;
  description: string;
}

interface HeaderProps {
  todosAmount: number;
}

const Header = ({ todosAmount }: HeaderProps) => {
  return (
    <h1>All Todos {todosAmount}</h1>
  )
}


const App = () => {
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
      <Header todosAmount={todos.length}/>
      {todos.map((todo: Todo) => {
        return <p key={todo.id}>
          {`[ ] ${todo.title} - Due Date Here`}
          </p>
      })}

      <div id="items">
        
      </div>
    </>
  )
}

export default App
