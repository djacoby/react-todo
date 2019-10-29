import React, { Component } from "react";
import NewTodoForm from "./NewTodoForm";
import "./ToDoList.css";
import Todo from "./Todo";
export default class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: JSON.parse(window.localStorage.getItem("todos") || "[]")
    };
    this.addToDo = this.addToDo.bind(this);
    this.update = this.update.bind(this);
  }

  addToDo(todo) {
    let newTodo = { ...todo };
    this.setState(
      state => ({
        todos: [...state.todos, newTodo]
      }),
      () =>
        window.localStorage.setItem("todos", JSON.stringify(this.state.todos))
    );
  }

  update(id, updatedTodo) {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, todo: updatedTodo };
      }
      return todo;
    });
    this.setState(
      {
        todos: updatedTodos
      },
      () =>
        window.localStorage.setItem("todos", JSON.stringify(this.state.todos))
    );
  }

  remove(id) {
    const updatedTodos = this.state.todos.filter(todo => todo.id !== id);
    this.setState(
      {
        todos: updatedTodos
      },
      window.localStorage.setItem("todos", JSON.stringify(updatedTodos))
    );
  }

  renderToDos() {
    return this.state.todos.map(todo => (
      <Todo
        key={todo.id}
        {...todo}
        removeTodo={() => this.remove(todo.id)}
        addToDo={this.addToDo}
        updateTodo={this.update}
      />
    ));
  }
  render() {
    return (
      <div className="ToDoList">
        <div className="ToDoList-title">
          <h1>Todo List</h1>
          <div className="ToDoList-line" />
          <p>Another React Todo List App</p>
        </div>

        <div className="ToDoList-todos">{this.renderToDos()}</div>
        <NewTodoForm addToDo={this.addToDo} />
      </div>
    );
  }
}
