import TodoItem from "./TodoItem";
import { Todo, TodoListProps } from '../types';

const TodoList = ({ setCurrTodo, todos, openFormModal }: TodoListProps) => {

  return (
    <table cellSpacing="0">
      <tbody>
        {todos.map((todo: Todo) => {
          return (
            <TodoItem 
              key={todo.id} 
              todo={todo}
              openFormModal={openFormModal}
              setCurrTodo={setCurrTodo}/>
          );
        })}
      </tbody>
    </table>
  )
}

export default TodoList;