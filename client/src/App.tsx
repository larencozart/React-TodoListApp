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

interface TodoProps {
  todo: Todo;
}

const Todo = ( {todo}: TodoProps) => {
  const dueDate = `${todo.month}/${todo.year.slice(2)}`;

  return (
    <tr  data-id="{{id}}" >
      <td className="list_item">
        {todo.completed 
         ? <input type="checkbox" name="item_{{id}}" id="item_{{id}}" checked/>
         : <input type="checkbox" name="item_{{id}}" id="item_{{id}}"/>}
        <span className="check"></span>
        <label htmlFor="item_{{id}}">
          {todo.title} - {dueDate.trim() ? dueDate : "No Due Date"}
        </label>
      </td>

      <td className="delete"><img src="images/trash.png" alt="Delete"/></td>
    </tr>
  )
}

interface TodoListProps {
  todos: Todo[];
}

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <>
      <table cellSpacing="0">
        <tbody>
          {todos.map((todo: Todo) => {
            return <Todo key={todo.id} todo={todo}/>
          })}
        </tbody>
      </table>
    </>
  )
}

const FormModal = () => {
  return (
    <>
    </>
  )
}

interface MainProps {
  todos: Todo[];
}

const Main = ({ todos }: MainProps) => {
  return (
    <main>
      <AddTodoLink />
      <TodoList todos={todos}/>
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
        <Main todos={todos}/>
      </div>
    </>
  )
}

export default App
