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

interface AddTodoLinkProps {
  openFormModal: () => void;
}

const AddTodoLink = ({ openFormModal }: AddTodoLinkProps) => {
  return (
    <>
      <label 
        htmlFor="new_item"
        onClick={(e) => {
          e.preventDefault();
          openFormModal();
        }}
      >
        <img src="images/plus.png" alt="Add Todo Item" />
        <h2>Add new to do</h2>
      </label>
    </>
  )
}

interface TodoProps {
  todo: Todo;
  openFormModal: () => void;
}

const Todo = ( {todo, openFormModal}: TodoProps) => {
  let dueDate;
  if (todo.month && todo.year) {
    dueDate = `${todo.month}/${todo.year.slice(2)}`;
  } else {
    dueDate = "No Due Date";
  }

  return (
    <tr 
    data-id="{{id}}"
    onClick={() => openFormModal()}>
      <td className="list_item">
        {todo.completed 
         ? <input type="checkbox" name="item_{{id}}" id="item_{{id}}" defaultChecked/>
         : <input type="checkbox" name="item_{{id}}" id="item_{{id}}"/>}
        <span className="check"></span>
        <label htmlFor="item_{{id}}">
          {todo.title} - {dueDate}
        </label>
      </td>

      <td className="delete"><img src="images/trash.png" alt="Delete"/></td>
    </tr>
  )
}

interface TodoListProps {
  todos: Todo[];
  openFormModal: () => void;
}

const TodoList = ({ todos, openFormModal }: TodoListProps) => {
  return (
    <table cellSpacing="0">
      <tbody>
        {todos.map((todo: Todo) => {
          return (
            <Todo 
              key={todo.id} 
              todo={todo}
              openFormModal={openFormModal}/>
          );
        })}
      </tbody>
    </table>
  )
}

interface FormModalProps {
  isOpen: boolean;
  closeFormModal: () => void;
}

const FormModal = ({ isOpen, closeFormModal }: FormModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="modal" 
        id="modal_layer"
        onClick={() => closeFormModal()}></div>
      <div className="modal" id="form_modal">
        <form action="" method="post">
          <fieldset>
            <ul>
              <li>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" placeholder="Item 1"/>
              </li>
              <li>
                <label htmlFor="due">Due Date</label>
                <div className="date">
                  <select id="due_day" name="due_day">
                    <option>Day</option>
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                    <option value="05">5</option>
                    <option value="06">6</option>
                    <option value="07">7</option>
                    <option value="08">8</option>
                    <option value="09">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>  /
                  <select id="due_month" name="due_month">
                    <option>Month</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select> /
                  <select id="due_year" name="due_year">
                    <option>Year</option>
                    <option>2014</option>
                    <option>2015</option>
                    <option>2016</option>
                    <option>2017</option>
                    <option>2018</option>
                    <option>2019</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                    <option>2023</option>
                    <option>2024</option>
                    <option>2025</option>
                  </select>
                </div>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea cols={50} name="description" rows={7} placeholder="Description"></textarea>
              </li>
              <li>
                <input type="submit" value="Save" />
                <button name="complete">Mark As Complete</button>
              </li>
            </ul>
          </fieldset>
        </form>
      </div>
    </>
  )
}

interface MainProps {
  todos: Todo[];
}

const Main = ({ todos }: MainProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openFormModal = () => setIsOpen(true);
  const closeFormModal = () => setIsOpen(false);

  return (
    <main>
      <AddTodoLink openFormModal={openFormModal}/>
      <TodoList 
        todos={todos}
        openFormModal={openFormModal}/>
      <FormModal 
        isOpen={isOpen}
        closeFormModal={closeFormModal}/>
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
      const sortedTodos = sortTodos(data);
      setTodos(sortedTodos);
    } catch (error) {
      console.error(error);
    }
  }

  const sortTodos = (todos: Todo[]) => {
    let notDone = todos.filter((t: Todo) => !t.completed);
    let done = todos.filter((t: Todo) => t.completed);
    return notDone.concat(done);
  }
  
  return (
    <>
      <div id="items">
        <Header todosAmount={todos.length}/>
        <Main todos={todos}/>
      </div>
    </>
  )
}

export default App
