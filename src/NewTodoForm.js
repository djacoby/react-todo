import React, { Component } from "react";
import "./NewTodoForm.css";
import uuid from "uuid/v4";

export default class NewTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    const newTodo = { ...this.state, id: uuid() };
    this.props.addToDo(newTodo);
    this.setState({ todo: "" });
  }

  render() {
    return (
      <div className="NewTodoForm">
        <div className="NewTodoForm-form">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="todo">New Todo</label>
              <input
                id="todo"
                name="todo"
                className="form-control"
                placeholder="Enter Todo"
                value={this.state.todo}
                onChange={this.handleChange}
              />
            </div>
            <button className="btn">Add Todo</button>
          </form>
        </div>
      </div>
    );
  }
}
