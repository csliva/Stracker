// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import Input from '../Input';


type Props = {
  onSubmit: () => void,
  submitting: boolean,
  handleSubmit: () => void,
}

class SignupForm extends Component {
  props: Props

  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form className="form form--signup" onSubmit={handleSubmit(this.handleSubmit)} >
        <h3 className="#">Create an account</h3>
        <Field name="username" type="text" component={Input} placeholder="Username" />
        <Field name="email" type="email" component={Input} placeholder="Email" />
        <Field name="password" type="password" component={Input} placeholder="Password" />
        <div className="form__submit">
          <button type="submit" disabled={submitting} className="button">
            {submitting ? 'Submitting...' : 'Sign up'}
          </button>
        </div>
        <div className="form__link">
          <Link to="/login" className="link">
            Login to your account
          </Link>
        </div>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Minimum of 6 characters';
  }
  return errors;
};

export default reduxForm({
  form: 'signup',
  validate,
})(SignupForm);
