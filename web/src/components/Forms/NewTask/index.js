
// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../Input';

type Props = {
  onSubmit: () => void,
  handleSubmit: () => void,
  submitting: boolean,
}


class TaskForm extends Component {

  props: Props

  handleSubmit = data => {
    this.props.onSubmit(data);
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form
        onSubmit={handleSubmit(this.handleSubmit)}
      >
        <h3 className="title" style={{ marginBottom: '2rem', textAlign: 'center' }}>Create a Task</h3>
        <Field name="task_title" type="text" component={Input} placeholder="Task Title" />
        <Field name="description" type="text" component={Input} placeholder="Task Description" />
        <button
          type="submit"
          disabled={submitting}
          className="button is-primary"
        >
          {submitting ? 'Creating...' : 'Create'}
        </button>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'newTask',
  validate,
})(TaskForm);
