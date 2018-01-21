import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../Input';

type Props = {
  handleSubmit: () => void,
  onSubmit: () => void,
  submitting: boolean,
}

class NewBoardForm extends Component {
  props: Props

  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="input-group">
          <Field
            name="name"
            type="text"
            placeholder="Name"
            component={Input}
            className="input"
          />
          <Field
            name="description"
            type="text"
            placeholder="Description"
            component={Input}
            className="input"
          />
          <div className="input-group-btn">
            <button type="submit" className="button is-primary" disabled={submitting}>
              {submitting ? 'Saving...' : 'Submit'}
            </button>
          </div>
        </div>
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
  form: 'newBoard',
  validate,
})(NewBoardForm);
