interface Todo {
  id: number;
  title: string;
  day: string;
  month: string;
  year: string;
  completed: boolean;
  description: string;
};

interface PartialTodo {
  title: string;
  day?: string;
  month?: string;
  year?: string;
  completed?: boolean;
  description?: string;
};

interface HeaderProps {
  todosAmount: number;
};

interface MainProps {
  todos: Todo[];
};

interface FormModalProps {
  currTodo: Todo | null;
  isOpen: boolean;
  closeFormModal: () => void;
};

interface TodoListProps {
  todos: Todo[];
  openFormModal: () => void;
  setCurrTodo: (todo: Todo) => void;
};

interface TodoItemProps {
  todo: Todo;
  openFormModal: () => void;
  setCurrTodo: (todo: Todo) => void;
};

interface TodosContextType  {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export type {
  Todo,
  PartialTodo,
  HeaderProps,
  MainProps,
  FormModalProps,
  TodoListProps,
  TodoItemProps,
  TodosContextType,
};