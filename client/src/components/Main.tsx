import { useState } from "react";
import AddTodoLink from "./AddTodoLink";
import FormModal from "./FormModal";
import TodoList from "./TodoList";
import { Todo, MainProps } from '../types';

const Main = ({ todos }: MainProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currTodo, setCurrTodo] = useState<Todo | null>(null);

  const openFormModal = () => setIsOpen(true);
  const closeFormModal = () => {
    setCurrTodo(null);
    setIsOpen(false);
  };

  return (
    <main>
      <AddTodoLink openFormModal={openFormModal}/>
      <TodoList 
        setCurrTodo={setCurrTodo}
        todos={todos}
        openFormModal={openFormModal}/>
      <FormModal
        currTodo={currTodo} 
        isOpen={isOpen}
        closeFormModal={closeFormModal}/>
    </main>
  )
}

export default Main;