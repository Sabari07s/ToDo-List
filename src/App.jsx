import React from 'react';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <div className="bg-[url('./assets/bg.jpg')] h-screen bg-contain flex items-center justify-center">
      <TodoList />
    </div>
  );
}

export default App;
