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
    <header>
      {/* <label>
        <img src="images/hamburger.png" alt="Toggle Sidebar" />
      </label> */}
      <dl>
        <dt><time>All Todos</time></dt>
        <dd>{todosAmount}</dd>
      </dl>
    </header>
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
      {todos.map((todo: Todo) => {
        return <p key={todo.id}>
          {`[ ] ${todo.title} - Due Date Here`}
          </p>
      })}

      <div id="items">
        <Header todosAmount={todos.length}/>
      </div>
    </>
  )
}

export default App
