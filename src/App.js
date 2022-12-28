import React, { useState, useReducer } from "react";
import { ACTIONS } from "./Actions";
import "./App.css";
import Todo from "./Todo";

const reducer = (todos, action) => {
  console.log(todos, action);
  const { todoContent, id } = action.payload;
  switch (action.type) {
    case ACTIONS.ADD:
      return [...todos, newTodo(todoContent)];
    case ACTIONS.TOGGLE:
      return todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case ACTIONS.DELETE:
      return todos.filter((todo) => todo.id !== id);
    default:
      return todos;
  }
};

const newTodo = (todoContent) => {
  return {
    id: Math.floor(Math.random() * 100000),
    todoContent,
    complete: false,
  };
};

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [todoContent, setTodoContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD, payload: { todoContent: todoContent } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todoContent}
          onChange={(e) => setTodoContent(e.target.value)}
          placeholder="Write A To Do List"
        />
      </form>

      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} dispatch={dispatch} />
      ))}
    </div>
  );
}

export default App;