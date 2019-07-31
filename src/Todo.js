import React, { Component } from "react";
import "./Todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: this.props.todo,
      isEditing: false,
      isChecked: false
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkTodo = this.checkTodo.bind(this);
  }

  handleEdit() {
    this.setState({
      isEditing: true
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    //take new task data and pass up to parent
    this.props.updateTodo(this.props.id, this.state.todo);
    this.setState({ isEditing: false });
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  checkTodo() {
    this.setState({
      isChecked: !this.state.isChecked
    });
  }
  render() {
    return (
      <div className="Todo">
        {this.state.isEditing === false && (
          <React.Fragment>
            <p
              className={this.state.isChecked ? "Todo-checked" : null}
              key={this.props.id}
              onClick={this.checkTodo}
            >
              {this.state.todo}
            </p>

            <button className="btn" onClick={this.handleEdit}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="btn" onClick={this.props.removeTodo}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </React.Fragment>
        )}
        {this.state.isEditing === true && (
          <>
            <form className="form-inline" onSubmit={this.handleSubmit}>
              <input
                id="todo"
                name="todo"
                className="form-control mx-sm-3"
                placeholder={this.state.todo}
                value={this.state.todo}
                onChange={this.handleChange}
              />
              <button className="btn">Save</button>
            </form>
          </>
        )}
      </div>
    );
  }
}
