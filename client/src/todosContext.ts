import { createContext } from "react";
import { TodosContextType } from './types';

export const TodosContext = createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
});