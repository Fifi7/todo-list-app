import './App.css';
import TodoList from './Todo';
import { TodoProvider } from './TodoContext';





function App() {
  return (
    <div className="App">
      <TodoProvider>
      <TodoList/>
      </TodoProvider>
    </div>
  );
}

export default App;
