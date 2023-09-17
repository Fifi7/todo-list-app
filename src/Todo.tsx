import React, { useState } from 'react';
import { useTodoContext } from './TodoContext';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

  const TodoList: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [isEditing, setIsEditing] = useState<number | null>(null); 
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodoContext();

  const handleAddTodo = () => {
    if (inputText.trim() === '') return;
    const newTodo: Todo = {
      id: Date.now(),
      text: inputText,
      completed: false,
    };
    addTodo(newTodo);
    setInputText('');
  };

  const handleToggleTodo = (id: number) => {
    toggleTodo(id);
    
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id);
    
  };

  const handleEditTodo = (id: number) => {
    setIsEditing(id); 
    setInputText(todos.find((todo) => todo.id === id)?.text || ''); 
  };

  const handleSaveTodo = (id: number) => {
    if (inputText.trim() === '') return;
    editTodo(id, inputText); 
    setIsEditing(null); 
    setInputText('');
  };

  return (
    <div>
      <h1>TODO List</h1>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Add a new task..."
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
             {isEditing === todo.id ? ( 
              <>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <button onClick={() => handleSaveTodo(todo.id)}>Save</button>
              </>
            ) : (
              <>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
