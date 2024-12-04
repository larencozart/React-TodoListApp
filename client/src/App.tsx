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
      {/* <label htmlFor="sidebar_toggle">
        <img src="images/hamburger.png" alt="Toggle Sidebar" />
      </label> */}
      <dl>
        <dt><time>All Todos</time></dt>
        <dd>{todosAmount}</dd>
      </dl>
    </header>
  )
}

const AddTodoLink = () => {
  return (
    <>
      <label htmlFor="new_item">
        <img src="images/plus.png" alt="Add Todo Item" />
        <h2>Add new to do</h2>
      </label>
    </>
  )
}

const TodoList = () => {
  return (
    <>
    </>
  )
}

const FormModal = () => {
  return (
    <>
    </>
  )
}


const Main = () => {
  return (
    <main>
      <AddTodoLink />
      <TodoList />
      <FormModal />
    </main>
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
        <Main />
      </div>
    </>
  )
}

export default App
