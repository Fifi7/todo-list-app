import React, { useState } from 'react';
import { useTodoContext } from './TodoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

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
      <h1>Todo-List</h1>
      <div className='mb-4'>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Add a new task..."
        className="border rounded p-2 mr-2"
      />
      <button onClick={handleAddTodo} className='bg-blue-500 text-white rounded p-2'>Add</button>
      </div>
      <div className="bg-pink-100 p-2 rounded max-w-md mx-auto">
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between space-x-2  p-2 border-b border-gray-300">
             <div className="flex items-center space-x-2"></div>
             <div className='w-8 h-8'>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            </div>
             {isEditing === todo.id ? ( 
              <>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <div className="space-x-2">
                <button onClick={() => handleSaveTodo(todo.id)}>
                <i className="fa fa-check text-green-500"></i>
                </button>
                </div>
              </>
            ) : (
              <>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            className='flex-grow'>
              {todo.text}
            </span>
            
            <div className="space-x-2">
            <button onClick={() => handleEditTodo(todo.id)}>
            <FontAwesomeIcon icon={faPencil} className="text-blue-500" />
            </button>
            <button onClick={() => handleDeleteTodo(todo.id)}>
            <FontAwesomeIcon icon={faTrash} className="text-red-500" />
            </button>
            </div>
            </>
            )}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default TodoList;
