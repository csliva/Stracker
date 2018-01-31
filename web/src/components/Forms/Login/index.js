
// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { css, StyleSheet } from 'aphrodite';
import Input from '../Input';


type Props = {
  onSubmit: () => void,
  handleSubmit: () => void,
  submitting: boolean,
}

class LoginForm extends Component {
  props: Props

  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form
        className="form"
        onSubmit={handleSubmit(this.handleSubmit)}
      >
        <h3 className="#">Login</h3>
        <Field name="email" type="text" component={Input} placeholder="Email" />
        <Field name="password" type="password" component={Input} placeholder="Password" />

        <div className="form__#">
          <button
            type="submit"
            disabled={submitting}
            className="form__button"
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <div className="form__#">
          <Link to="/signup" className="form__link">
            Create a new account
          </Link>
        </div>

      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'login',
  validate,
})(LoginForm);
