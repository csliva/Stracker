
// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../Input';

type Props = {
  onSubmit: () => void,
  handleSubmit: () => void,
  submitting: boolean,
}


class StackForm extends Component {

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
        <h3 className="title" style={{ marginBottom: '2rem', textAlign: 'center' }}>New Stack</h3>
        <Field name="stack_title" type="text" component={Input} placeholder="Stack Title" />
        <Field name="description" type="text" component={Input} placeholder="Stack Description" />
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
  if (!values.description) {
    errors.description = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'newStack',
  validate,
})(StackForm);
