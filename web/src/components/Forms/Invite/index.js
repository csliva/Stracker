/*---------------------------------

INVITE COMPONENT
Used in Invite Container

---------------------------------*/


// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import Input from '../Input';

type Props = {
  onSubmit: () => void,
  handleSubmit: () => void,
  submitting: boolean,
}

class InviteForm extends Component {
  props: Props

  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form
        className="form"
        onSubmit={handleSubmit(this.handleSubmit)}
      >
      <Field name="email" type="text" component={Input} placeholder="Email" />

        <div className="form__#">
          <button
            type="submit"
            disabled={submitting}
            className="form__button"
          >
            {submitting ? 'Inviting...' : 'Invite'}
          </button>
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
  return errors;
};

export default reduxForm({ form: 'invite', validate })(InviteForm);
