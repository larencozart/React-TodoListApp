import { useState, useContext } from 'react';
import { TodosContext } from '../todosContext';
import { Todo, FormModalProps } from '../types';
import { createTodo } from '../services/todoListService';
import { updateTodo } from '../services/todoListService';

const FormModal = ({ currTodo, isOpen, closeFormModal }: FormModalProps) => {
  if (!isOpen) return null;

  const {todos, setTodos} = useContext(TodosContext);
  const [title, setTitle] = useState<string>(currTodo ? currTodo.title : "");
  const [day, setDay] = useState<string>(currTodo ? currTodo.day : "");
  const [month, setMonth] = useState<string>(currTodo ? currTodo.month : "");
  const [year, setYear] = useState<string>(currTodo ? currTodo.year : "");
  const [description, setDescription] = useState<string>(currTodo ? currTodo.description : "");

  const changeTodo = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const updatedTodo = {
        title,
        day,
        month,
        year,
        description,
      }

      const data = await updateTodo(updatedTodo, currTodo!.id);

      // used in Todo Component => abstract to helper?
      let updatedTodos = todos.filter(t => t.id !== currTodo?.id);
      updatedTodos.push(data);
      setTodos(updatedTodos);
      closeFormModal();

    } catch (error) {
      console.log(error);
    }
  }

  const addTodo = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const newTodo = {
        title,
        day,
        month,
        year,
        description
      }

      const data = await createTodo(newTodo);
      setTodos(todos.concat([data]));
      closeFormModal();

    } catch (error) {
      console.log(error);
    }
  }

  const markComplete = async () => {
    try {
      if (!currTodo) {
        alert("Cannot mark as complete as item has not been created yet!");
        return;
      }

      const updatedTodo = {
        ...currTodo,
        completed: true,
      }

      const data = await updateTodo(updatedTodo, updatedTodo.id)

      // used in Todo Component => abstract to helper?
      let updatedTodos = todos.filter((t: Todo) => t.id !== updatedTodo.id);
      updatedTodos.push(data);
      setTodos(updatedTodos);
      closeFormModal();
    } catch (error) {
      console.error(error);
    }
  }

  const saveTodo = (e: React.FormEvent) => {
    if (currTodo) {
      changeTodo(e);
    } else {
      addTodo(e);
    }
  }

  return (
    <>
      <div 
        className="modal" 
        id="modal_layer"
        onClick={() => closeFormModal()}></div>
      <div className="modal" id="form_modal">
        <form action="" method="post" onSubmit={(e) => saveTodo(e)}>
          <fieldset>
            <ul>
              <li>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" 
                       placeholder="Item 1"
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}/>
              </li>
              <li>
                <label htmlFor="due">Due Date</label>
                <div className="date">
                  <select id="due_day" name="due_day" 
                          value={day}
                          onChange={(e) => setDay(e.target.value)}>
                    <option value="">Day</option>
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
                  <select id="due_month" name="due_month"
                          value={month} 
                          onChange={(e) => setMonth(e.target.value)}>
                    <option value="">Month</option>
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
                  <select id="due_year" name="due_year"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}>
                    <option value="">Year</option>
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
                <textarea cols={50} name="description" rows={7} 
                          placeholder="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}>
                </textarea>
              </li>
              <li>
                <input type="submit" value="Save" />
                <button type="button" name="complete"
                        onClick={() => markComplete()}>
                          Mark As Complete
                </button>
              </li>
            </ul>
          </fieldset>
        </form>
      </div>
    </>
  )
  
}

export default FormModal;