import { useEffect, useState, useMemo } from 'react'
import '../public/stylesheets/todo_v2.css';
import Header from './components/Header';
import Main from './components/Main';
import { TodosContext } from './todosContext'
import { Todo } from './types';
import { getTodos } from './services/todoListService';


const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortedTodos, setSortedTodos] = useState<Todo[]>([]);
  const todosValue = useMemo(
    () => ({ todos, setTodos }), [todos]
  )

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    getSortedTodos();
  }, [todos]);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  }

  const getSortedTodos = () => {
    const notDone = todos.filter((t: Todo) => !t.completed);
    const done = todos.filter((t: Todo) => t.completed);
    const sorted = notDone.concat(done);
    setSortedTodos(sorted);
  }
  
  return (
    <>
      <TodosContext.Provider value={todosValue}>
        <div id="items">
          <Header todosAmount={sortedTodos.length}/>
          <Main todos={sortedTodos}/>
        </div>
      </TodosContext.Provider>
    </>
  )
}

export default App
