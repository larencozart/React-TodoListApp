import { useContext } from "react";
import { TodosContext } from "../todosContext";
import { Todo, TodoItemProps } from '../types';
import { deleteTodo, updateTodo } from "../services/todoListService";

const TodoItem = ( { setCurrTodo, todo, openFormModal }: TodoItemProps) => {
  const { todos, setTodos } = useContext(TodosContext);

  let dueDate;
  if (todo.month && todo.year) {
    dueDate = `${todo.month}/${todo.year.slice(2)}`;
  } else {
    dueDate = "No Due Date";
  }

  const openTodoForm = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (e.target instanceof HTMLElement) {
      setCurrTodo(todo); // sets current todo => maybe change name
      openFormModal();
    }
  }

  const toggleCompleted = async () => {
    try {
      const updatedTodo = {...todo, completed: !todo.completed};
      const data = await updateTodo(updatedTodo, updatedTodo.id);
      let updatedTodos = todos.filter((t: Todo)=> t.id !== todo.id);
      updatedTodos.push(data);

      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
      let updatedTodos = todos.filter((t: Todo) => t.id !== todo.id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <tr data-id={todo.id}>
      <td key={todo.id}
          className="list_item"
          onClick={() => toggleCompleted()}>
        <input type="checkbox" 
               name={`item_${todo.id}`}
               checked={todo.completed}
               readOnly/>
        <span className="check"></span>

        <label htmlFor={`item_${todo.id}`}
               onClick={(e) => openTodoForm(e)}>
          {todo.title} - {dueDate}
        </label>
      </td>

      <td className="delete"><img src="images/trash.png" alt="Delete"
          onClick={() => handleDelete()}/></td>
    </tr>
  )
}

export default TodoItem;