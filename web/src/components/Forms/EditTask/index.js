
// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../Input';

class EditForm extends Component {

  handleSubmit = data => {
    this.props.onSubmit(data);
  }

  componentWillMount(){
    this.props.change('task_title', this.props.currentTask.task_title);
    this.props.change('description', this.props.currentTask.description);
  }

  render() {

    return (
      <form
        onSubmit={this.props.handleSubmit(this.handleSubmit)}
      >
        <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Edit Task</h3>
        <Field name="task_title" className="input" type="text" component={Input} placeholder="Task Title" />
        <Field name="description" className="input" type="text" component={Input} placeholder="Task Description" />
        <button
          type="submit"
          className="button is-primary"
        >
          Edit
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'editStack',
})(EditForm);
